let Name = document.getElementById("name");
let Email = document.getElementById("email");
let Password = document.getElementById("pass");
let logInEmail = document.getElementById("log-in-email");
let logInPassword = document.getElementById("log-in-pass");
let signUpButton = document.getElementById("sign-up-btn");
let signInButton = document.getElementById("sign-In-btn");
let logUpMessages = document.getElementById("log-up-success");
let logInMessages = document.getElementById("log-in-success");
let logOutButton = document.getElementById("log-out");
let data = [];
let log_in_data = [];
let cartona = "";
signUpButton.addEventListener("click", function (e) {
    if (Name.value != "" && Email.value != "" && Password.value != "") {
        isRegistered = false;
        checkRegistration();
        Push();
    }
    else {
        cartona = "All inputs are required";
        logUpMessages.innerHTML = cartona;
    }
})
let isRegistered = false;
function checkRegistration() {
    log_in_data = JSON.parse(localStorage.getItem("regester")) || [];
    for (let i = 0; i < log_in_data.length; i++) {
        if (log_in_data[i].email === Email.value) {
            isRegistered = true;
            break;
        }
    }
}
function Push() {
    if (isRegistered) {
        cartona = "Email has already signed";
        logUpMessages.innerHTML = cartona;
        logUpMessages.style.color = "red";
    }
    else {
        data = log_in_data;
        data.push({ name: Name.value, email: Email.value, password: Password.value });
        AddToStorage();
        cartona = "success";
        logUpMessages.innerHTML = cartona;
        logUpMessages.style.color = "green";
    }
}
document.getElementById("sign-up-link").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".log-up").classList.remove("d-none");
    document.querySelector(".log-in").classList.add("d-none");
    localStorage.setItem("activePage", "signup");
})
document.getElementById("sign-in-link").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".log-up").classList.add("d-none");
    document.querySelector(".log-in").classList.remove("d-none");
    localStorage.setItem("activePage", "login");
});

window.addEventListener("load", function () {
    const activePage = localStorage.getItem("activePage") || "login";
    if (activePage === "signup") {
        document.querySelector(".log-up").classList.remove("d-none");
        document.querySelector(".log-in").classList.add("d-none");
    } else {
        document.querySelector(".log-up").classList.add("d-none");
        document.querySelector(".log-in").classList.remove("d-none");
    }
});
function AddToStorage() {
    localStorage.setItem("regester", JSON.stringify(data));
}
let found = false;
let userName;
signInButton.addEventListener("click", function (e) {
    e.preventDefault();
    log_in_data = JSON.parse(localStorage.getItem("regester")) || [];
    if (logInEmail.value != "" && logInPassword.value != "") {
        for (let i = 0; i < log_in_data.length; i++) {
            if (log_in_data[i].email === logInEmail.value && log_in_data[i].password === logInPassword.value) {
                found = true;
                userName=log_in_data[i].name;
                
                
            }
        }
        if (found) {
            localStorage.setItem("currentUserName", userName);
            window.location.href = "home.html";
        }
        else {
            cartona = "You do not have an account";
            logInMessages.innerHTML = cartona;
            logInMessages.style.color = "red";
        }
    }
    else {
        cartona = "All inputs are required";
        logInMessages.innerHTML = cartona;
    }
})



console.log(userName);