const form = document.querySelector(".form");

const email = document.getElementById("email");
const password = document.getElementById("password");

const errors = document.querySelectorAll(".error");
const popup = document.getElementById("popup");
const toggles = document.querySelectorAll(".toggle-password");

form.addEventListener("submit", handleLogin);

function handleLogin(e) {
    e.preventDefault();

    clearError();

    let hasError = false;

    const emailValue = email.value.trim().toLowerCase();
    const passwordValue = password.value.trim();

    if (emailValue === "") {
        showError(0, "Email không được để trống");
        hasError = true;
    }
     if(!isValidEmail(emailValue)){
        showError(0, "Email không hợp lệ");
        hasError = true;
    }

    if (passwordValue === "") {
        showError(1, "Mật khẩu không được để trống");
        hasError = true;
    }

    if (hasError) return;
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u =>
        u.email.toLowerCase() === emailValue &&
        u.password === passwordValue
    );

    if (!user) {
        showError(1, "Email hoặc mật khẩu không đúng");
        return;
    }

    const role = user.role || "user";

    const currentUser = {
        name: user.name,
        email: user.email,
        role: role
    };

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    showPopup();

    setTimeout(() => {
        if (role === "admin") {
            window.location.href = "category-manager.html";
        } else {
            window.location.href = "dashboard.html";
        }
    }, 1000);
}

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function showError(index, message) {
    errors[index].textContent = message;
}

function clearError() {
    errors.forEach(err => err.textContent = "");
}

function showPopup() {
    popup.style.display = "flex";
}

toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {

        const targetId = toggle.getAttribute("data-target");
        const input = document.getElementById(targetId);
        const icon = toggle.querySelector("i");

        if (input.type === "password") {
            input.type = "text";
            icon.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            input.type = "password";
            icon.classList.replace("fa-eye-slash", "fa-eye");
        }

    });
});