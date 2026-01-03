/* BACKGROUND ROTATION */
const scenes = document.querySelectorAll(".scene");
let bgIndex = 0;
setInterval(() => {
    scenes[bgIndex].classList.remove("active");
    bgIndex = (bgIndex + 1) % scenes.length;
    scenes[bgIndex].classList.add("active");
}, 6000);

/* AUTH SWITCH */
const authTabs = document.querySelectorAll(".auth-tab");
const authSlider = document.querySelector(".auth-slider");
const signupFields = document.querySelectorAll(".signup-only");

let authType = "login";

authTabs.forEach((tab, i) => {
    tab.onclick = () => {
        authTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        authSlider.style.left = i * 50 + "%";
        authType = tab.dataset.type;

        signupFields.forEach(f => {
            f.style.display = authType === "signup" ? "block" : "none";
        });
    };
});

/* ROLE SWITCH */
const roles = document.querySelectorAll(".role");
const roleSlider = document.querySelector(".role-slider");
const btn = document.getElementById("submitBtn");

roles.forEach((r, i) => {
    r.onclick = () => {
        roles.forEach(x => x.classList.remove("active"));
        r.classList.add("active");
        roleSlider.style.left = i * 50 + "%";
        btn.innerText = `${authType === "signup" ? "Sign up" : "Login"} as ${r.dataset.role}`;
    };
});

/* PASSWORD EYE */
const eye = document.getElementById("eye");
const password = document.getElementById("password");
eye.onclick = () => {
    password.type = password.type === "password" ? "text" : "password";
    eye.classList.toggle("fa-eye-slash");
};

/* VALIDATION */
const form = document.getElementById("form");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");

form.addEventListener("submit", e => {
    e.preventDefault();
    clearErrors();

    let valid = true;

    // FULL NAME
    if (authType === "signup") {
        const nameRegex = /^[A-Za-z.\s]+$/;
        if (!fullname.value || !nameRegex.test(fullname.value)) {
            showError(fullname, "Only letters and dot allowed");
            valid = false;
        }
    }

    // EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError(email, "Invalid email address");
        valid = false;
    }

    // PASSWORD
    if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters");
        valid = false;
    }

    if (valid) {
        alert(`${authType.toUpperCase()} SUCCESS (Frontend Demo)`);
        form.reset();
    }
});

function showError(input, message) {
    const field = input.closest(".field");
    field.classList.add("invalid");
    field.querySelector(".error").innerText = message;
}

function clearErrors() {
    document.querySelectorAll(".field").forEach(f => {
        f.classList.remove("invalid");
        const err = f.querySelector(".error");
        if (err) err.innerText = "";
    });
}
