async function login(e) {
  e.preventDefault();
  try {
    const data={user_name:usernameInput.value,password:passwordInput.value}
    const newUser = await axios.post(
      "http://localhost:2020/api/users/login",
      data
    );
    if (newUser.data.status == 200) {
      window.localStorage.setItem("accesToken", newUser.data?.accesToken);
      window.localStorage.setItem("avatar", newUser.data?.avatar);
      usernameInput.value="";
      passwordInput.value=""
      window.location = "/home";
    }
  } catch (error) {
    usernameInput.value="";
    passwordInput.value=""
    alert(error.response.data.message);
  }
}
submitButton.onclick = login;

showButton.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});
