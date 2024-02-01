var btn = document.querySelector(".btn");
var inputs = document.querySelectorAll(".input");

btn.onclick = function () {
  var isValid = validateForm(); // Check form validation

  if (isValid) {
    btn.classList.toggle("active");
    setTimeout(() => {
      btn.classList.toggle("active");
      inputs[1].classList.toggle("active");
    }, 1500);
    setTimeout(() => {
      inputs[1].classList.toggle("active");
    }, 3000);
  }
};

function validateForm() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (email == "" || password == "") {
    alert("Email and password fields cannot be empty");
    return false;
  }

  // Add more validation rules as needed

  return true;
}
