async function registr(e) {

  try {
    e.preventDefault()
    const data= new FormData()
    data.append("user_name",usernameInput.value);
    data.append("password", passwordInput.value);
    data.append("file",uploadInput.files[0])

    const newUser =await  axios.post("http://localhost:2020/api/users/registr",data);
    if(newUser.data.status==201){
      // console.log(newUser)
      alert(newUser.data.message)
        window.localStorage.setItem("accesToken",newUser.data?.accesToken)
        window.localStorage.setItem("avatar",newUser.data?.avatar)
        window.location="/home"
    }
  } catch (error) {
    alert(error.response.data.message)
  }
}
submitButton.onclick=registr

showButton.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});
