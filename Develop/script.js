// Assignment Code
var generateBtn = document.querySelector("#generate");

var lowercaseChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var uppercaseChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var specialChars = ['\u0020', '\u0021', '\u0022', '\u0023', '\u0024', '\u0025', '\u0026', '\u0027', '\u0028', '\u0029', '\u002A', '\u002B', '\u002C', '\u002D', '\u002E', '\u002F', '\u003A', '\u003B', '\u003C', '\u003D', '\u003E', '\u003F', '\u0040', '\u005B', '\u005C', '\u005D', '\u005E', '\u005F', '\u0060', '\u007B', '\u007C', '\u007D', '\u007E'];
// source for special character unicode: https://owasp.org/www-community/password-special-characters
// source for using unicode to represent special characters: https://stackoverflow.com/questions/13093126/insert-unicode-character-into-javascript
var allChars = [lowercaseChars, uppercaseChars, numbers, specialChars];

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {
  var inputLength = prompt("How many characters would you like your password to be?");
  var charLengthNotGiven = true;
  while (charLengthNotGiven) {
    if (inputLength === null) {
      return;
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
      break;
    }
    inputLength = prompt("How many characters would you like your password to be?");
  }
  // source for while loop code - prompting user until valid input is given: https://stackoverflow.com/questions/35044961/loop-that-prompts-user-until-valid-input
  
  var charTypesNotDecided = true;
  var acceptedCharTypes = new Array(4).fill(0);
  // source for creating an array of zeros: https://bobbyhadz.com/blog/javascript-create-array-of-zeros

  while (charTypesNotDecided) {
    var lowercaseChoice = confirm("Would you like to use lowercase characters in your password? (OK = Yes, Cancel = No)");
    if (lowercaseChoice) {
      acceptedCharTypes[0] = 1;
    }

    var uppercaseChoice = confirm("Would you like to use uppercase characters in your password? (OK = Yes, Cancel = No)");
    if (uppercaseChoice) {
      acceptedCharTypes[1] = 1;
    }

    var numbersChoice = confirm("Would you like to use numbers in your password? (OK = Yes, Cancel = No)");
    if (numbersChoice) {
      acceptedCharTypes[2] = 1;
    }

    var specialChoice = confirm("Would you like to use special characters in your password? (OK = Yes, Cancel = No)");
    if (specialChoice) {
      acceptedCharTypes[3] = 1;
    }

    if (!lowercaseChoice && !uppercaseChoice && !numbersChoice && !specialChoice) {
      alert("Please select at least one type of character to include in your password");
    } else {
      break;
    }
  }
  
  includedChars = new Array(0);
  for (i = 0; i < acceptedCharTypes.length; i++) {
    if (acceptedCharTypes[i] === 1) {
      includedChars.push(allChars[i]);
    }
  }

  passwordArray = new Array(0);
  for (i = 0; i < passwordLength; i++) {
    chosenCharType = Math.floor(Math.random()*includedChars.length);
    passwordArray.push(includedChars[chosenCharType][Math.floor(Math.random()*includedChars[chosenCharType].length)]);
  }
  
  var passwordOutput = passwordArray.join('');
  return passwordOutput;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
