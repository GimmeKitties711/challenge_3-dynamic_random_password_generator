// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {
  //let browserText;
  var inputLength = prompt("How many characters would you like your password to be?");
  var validInputNotGiven = true;
  while (validInputNotGiven) {
    if (inputLength == null) {
      alert("Please provide a desired password length");
    } else if (isNaN(inputLength)) {
      alert("Please choose a number");
    } else if (inputLength < 8) {
      alert("Please choose a password that is at least 8 characters long");
    } else if (inputLength > 128) {
      alert("Please choose a password that is no longer than 128 characters");
    } else {
      break;
    }
    var inputLength = prompt("How long would you like your password to be?");
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
