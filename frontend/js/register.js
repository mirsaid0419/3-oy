async function registr(e) {
  try {
    e.preventDefault();
    const data = new FormData();
    data.append("email", emailInput.value);
    data.append("otp", otpInput.value);
    data.append("user_name", usernameInput.value);
    data.append("password", passwordInput.value);
    data.append("file", uploadInput.files[0]);

    const newUser = await axios.post(
      "https://three-oy.onrender.com/api/users/registr",
      data
    );
    if (newUser.data.status == 201) {
      // console.log(newUser)
      alert(newUser.data.message);
      window.localStorage.setItem("accesToken", newUser.data?.accesToken);
      window.localStorage.setItem("avatar", newUser.data?.avatar);
      window.location = "/home";
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
submitButton.onclick = registr;

showButton.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

// Elementlarni tanlab olamiz
const openModalBtn = document.getElementById("openModal");
const emailModal = document.getElementById("emailModal");
const closeModalBtn = document.querySelector(".close");
const sendOtpBtn = document.getElementById("sendOtp");
const otpEmailInput = document.getElementById("otpEmailInput");

// Modalni ochish
openModalBtn.addEventListener("click", () => {
  emailModal.style.display = "flex"; // Modalni ko'rsatish
});

// Modalni yopish (X tugmasi bosilganda)
closeModalBtn.addEventListener("click", () => {
  emailModal.style.display = "none";
});

// Modalni yopish (Oynaning bo'sh joyi bosilganda)
window.addEventListener("click", (event) => {
  if (event.target === emailModal) {
    emailModal.style.display = "none";
  }
});

sendOtpBtn.addEventListener("click", async () => {
  try {
    const email = otpEmailInput.value;
    if (email) {
      const data = await axios.post("https://three-oy.onrender.com/api/users/otp", {email});
      if (!(data.status == 200)) {
        throw new Error("Habar yuborishda hatoliok...");
      }
      alert("OTP yuborildi")
      window.location="/register"
    } else {
      alert("Iltimos, email kiriting!");
    }
  } catch (error) {
    alert(error?.response?.data?.message);
  }
});
