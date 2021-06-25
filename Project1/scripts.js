// Fetching elements from HTML file

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//All functions
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
function ValidateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Event Listener for submit button
form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!username.value){
        showError(username, 'Username is required');
    }
    else{
        showSuccess(username);
    }
    if (!email.value){
        showError(email, 'Email is required');
    } else if(!ValidateEmail(email.value)){
        showError(email, 'Email is invalid');
    }
    else{
        showSuccess(email);
    }
    if (!password.value){
        showError(password, 'Password is required');
    }
    else{
        showSuccess(password);
    }
    if (!password2.value){
        showError(password2, 'Confirm password is required');
    }
    else{
        showSuccess(password2);
    }
})