function validatePassword(){
  let password = document.getElementById("password");
  let confirm_password = document.getElementById("confirm_password");


  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
    console.log("password doesnt match");
  } else {
    confirm_password.setCustomValidity('');
    console.log("password matches");
  }
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;