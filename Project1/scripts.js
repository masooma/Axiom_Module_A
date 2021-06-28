// Fetching elements from HTML file

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//All functions

// Function to check required field
function checkIfRequired(inputArray){
    inputArray.forEach( function(input) {
        if(!input.value){
            showError(input, "This field is required");
            return 0;
        }
        else {
            showSuccess(input);
        }
    });
}

//Function to check the length of input
function checkInputLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${input.id} needs to be atleast ${min} characters`);
    }
    else if(input.value.length > max){
        showError(input, `${input.id} needs to be less than ${max} characters`);
    }
    else{
        showSuccess(input);
    }
}
// Function to show Error
function showError(input, message){

    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}
// Function to show Success

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
// Function to Validate Email
function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    }
    else{
        showError(input, 'Enter a valid email');
    }
}

//Function to check if password and confirm password are same

function checkPass(pass, pass2){

    comp = pass.value.localeCompare(pass2.value);
    if(comp == 0){
        showSuccess(pass2);
    }
    else{
        showError(pass2, 'Passwords are not identical');
    }
}

// Event Listener for submit button
form.addEventListener('submit', function(e) {
    e.preventDefault();

    check = checkIfRequired([username,email,password,password2]);
    if(check === 0){
        break;
    }
    checkInputLength(username,3,10);
    checkInputLength(password,6,30);
    checkEmail(email);
    checkPass(password, password2);

})
