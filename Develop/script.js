// Assignment Code
var generateBtn = document.querySelector("#generate");

var lowercaseChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var uppercaseChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var specialChars = [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`',  '{', '|', '}', '~'];
// source for using two backslashes for backslash character in array ('\\'): https://stackoverflow.com/questions/51247148/how-to-add-a-single-backslash-in-array

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {
  //let browserText;
  var inputLength = prompt("How many characters would you like your password to be?");
  var charLengthNotGiven = true;
  while (charLengthNotGiven) {
    if (inputLength === null) {
      break;
      // how to exit when user clicks cancel button when prompted, source: https://stackoverflow.com/questions/12864582/javascript-prompt-cancel-button-to-terminate-the-function
    } else if (inputLength === "") {
      alert("Please provide a desired password length");
    } else if (isNaN(inputLength)) {
      alert("Please choose a number");
    } else if (inputLength < 8) {
      alert("Please choose a password that is at least 8 characters long");
    } else if (inputLength > 128) {
      alert("Please choose a password that is no longer than 128 characters"); 
    } else {
      var passwordLength = inputLength;
      //console.log(passwordLength);
      break;
    }
    var inputLength = prompt("How many characters would you like your password to be?");
  }
  // source for while loop code - prompting user until valid input is given: https://stackoverflow.com/questions/35044961/loop-that-prompts-user-until-valid-input
  
  var acceptedCharTypes = [];
  var lowercaseChoice = confirm("Would you like to use lowercase characters in your password? (OK = Yes, Cancel = No)");
  if (lowercaseChoice) {
    acceptedCharTypes.push[0];
  }
  var uppercaseChoice = confirm("Would you like to use uppercase characters in your password? (OK = Yes, Cancel = No)");
  if (uppercaseChoice) {
    acceptedCharTypes.push[1];
  }
  var numbersChoice = confirm("Would you like to use numbers in your password? (OK = Yes, Cancel = No)");
  if (numbersChoice) {
    acceptedCharTypes.push[2];
  }
  var specialChoice = confirm("Would you like to use special characters in your password? (OK = Yes, Cancel = No)");
  if (specialChoice) {
    acceptedCharTypes.push[3];
  }
  if (!lowercaseChoice && !uppercaseChoice && !numbersChoice && !specialChoice) {
    alert("Please select at least one type of character to include in your password");
  }

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
