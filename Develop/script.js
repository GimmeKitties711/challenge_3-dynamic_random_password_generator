// Assignment Code
var generateBtn = document.querySelector("#generate");

// create an array containing all of each type of character
var lowercaseChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var uppercaseChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var specialChars = ['\u0020', '\u0021', '\u0022', '\u0023', '\u0024', '\u0025', '\u0026', '\u0027', '\u0028', '\u0029', '\u002A', '\u002B', '\u002C', '\u002D', '\u002E', '\u002F', '\u003A', '\u003B', '\u003C', '\u003D', '\u003E', '\u003F', '\u0040', '\u005B', '\u005C', '\u005D', '\u005E', '\u005F', '\u0060', '\u007B', '\u007C', '\u007D', '\u007E'];
// source for special character unicode: https://owasp.org/www-community/password-special-characters
// source for using unicode to represent special characters: https://stackoverflow.com/questions/13093126/insert-unicode-character-into-javascript
var allChars = [lowercaseChars, uppercaseChars, numbers, specialChars]; // make an array of arrays, where each entry is one of the previous arrays, this is going to be used later

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {
  var inputLength = prompt("How many characters would you like your password to be?");
  var charLengthNotGiven = true;
  while (charLengthNotGiven) { // until a proper input has been given
    if (inputLength === null) { // user clicks Cancel
      return;
      // how to exit when user clicks cancel button when prompted, source: https://stackoverflow.com/questions/12864582/javascript-prompt-cancel-button-to-terminate-the-function
    } else if (inputLength === "") { // user presses OK without typing anything
      alert("Please provide a desired password length");
    } else if (isNaN(inputLength)) { // user enters letters or special characters
      alert("Please choose a number");
    } else if (inputLength < 8) { // password is too short      
      alert("Please choose a password that is at least 8 characters long");
    } else if (inputLength > 128) { // password is too long
      alert("Please choose a password that is no longer than 128 characters"); 
    } else { // if input is acceptable, store it in the variable passwordLength and move on
      var passwordLength = inputLength;
      break;
    }
    inputLength = prompt("How many characters would you like your password to be?"); // if input is not acceptable, ask for it again
  }
  // source for while loop code - prompting user until valid input is given: https://stackoverflow.com/questions/35044961/loop-that-prompts-user-until-valid-input
  
  var charTypesNotDecided = true;
  var acceptedCharTypes = new Array(4).fill(0); // this array will be used to record which character types the user wants in their password
  // source for creating an array of zeros: https://bobbyhadz.com/blog/javascript-create-array-of-zeros

  while (charTypesNotDecided) { // until at least one character type is selected
    var lowercaseChoice = confirm("Would you like to use lowercase characters in your password? (OK = Yes, Cancel = No)");
    if (lowercaseChoice) {
      acceptedCharTypes[0] = 1; // record that lowercase characters were selected
    }

    var uppercaseChoice = confirm("Would you like to use uppercase characters in your password? (OK = Yes, Cancel = No)");
    if (uppercaseChoice) {
      acceptedCharTypes[1] = 1; // record that uppercase characters were selected
    }

    var numbersChoice = confirm("Would you like to use numbers in your password? (OK = Yes, Cancel = No)");
    if (numbersChoice) {
      acceptedCharTypes[2] = 1; // record that numbers were selected
    }

    var specialChoice = confirm("Would you like to use special characters in your password? (OK = Yes, Cancel = No)");
    if (specialChoice) {
      acceptedCharTypes[3] = 1; // record that special characters were selected
    }

    if (!lowercaseChoice && !uppercaseChoice && !numbersChoice && !specialChoice) { // if none of the character types were selected
      alert("Please select at least one type of character to include in your password");
    } else { // if at least one character type was selected
      break;
    }
  }
  
  includedChars = new Array(0); // starting length is 0
  for (i = 0; i < acceptedCharTypes.length; i++) {
    if (acceptedCharTypes[i] === 1) { // if the char type was selected
      includedChars.push(allChars[i]); // add the corresponding entry from the array of all characters. each entry is an array that contains all of the characters for that character type. acceptedCharTypes and allChars have the same length so the index i can be used for both of them.
    }
  }

  passwordArray = new Array(0); // this array will store a password character at each index. the first character will be stored at index 0, the second at index 1, and so on. the array will be joined after it is fully formed.
  for (i = 0; i < passwordLength; i++) { // perform this action passwordLength amount of times
    chosenCharType = Math.floor(Math.random()*includedChars.length); // choose a char type by index. at least 0, at most 3 (if includedChars.length = 4). the type of char depends on the contents of includedChars.
    passwordArray.push(includedChars[chosenCharType][Math.floor(Math.random()*includedChars[chosenCharType].length)]); // add a character to the array containing the password characters. first index chooses a random entry from includedChars, second index chooses a random character from that array.
  }
  
  var passwordOutput = passwordArray.join(''); // source for joining array of characters with no spaces between them: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
  return passwordOutput; // output final password
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
