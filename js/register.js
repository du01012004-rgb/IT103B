if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([
        {
            name: "Admin Boss",
            email: "admin@gmail.com",
            password: "Admin@123",
            role: "admin"
        },
        {
            name: "Super Admin",
            email: "boss@gmail.com",
            password: "Boss@123",
            role: "admin"
        },
        {
            name: "Nguyễn Văn A",
            email: "user1@gmail.com",
            password: "NguyenA@123",
            role: "user"
        }
    ]));
}

const form = document.querySelector(".form");

const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm-password");

const errors = document.querySelectorAll(".error");
const popup = document.getElementById("popup");
const toggles = document.querySelectorAll(".toggle-password");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();

    clearError();

    let hasError = false;

    const nameValue = fullName.value.trim();
    const emailValue = email.value.trim().toLowerCase();
    const passwordValue = password.value.trim();
    const confirmValue = confirm.value.trim();

    if (!nameValue) {
        showError(0, "Họ tên không được để trống");
        hasError = true;
    }

    if (!emailValue) {
        showError(1, "Email không được để trống");
        hasError = true;
    }
    else if (!isValidGmail(emailValue)) {
        showError(1, "Email phải đúng định dạng Gmail");
        hasError = true;
    }
    else if (isEmailExist(emailValue)) {
        showError(1, "Email này đã được đăng ký");
        hasError = true;
    }

    if (passwordValue.length < 8) {
        showError(2, "Mật khẩu phải ít nhất 8 ký tự");
        hasError = true;
    }
    else if (!isStrongPassword(passwordValue)) {
        showError(2, "Mật khẩu phải mạnh hơn");
        hasError = true;
    }

    if(confirmValue === ""){
        showError(3, "Xác nhận mật khẩu không được để trống");
        hasError = true;
    }else if (confirmValue !== passwordValue) {
        showError(3, "Mật khẩu không khớp");
        hasError = true;
    }

    if (hasError) return;

    saveUser(nameValue, emailValue, passwordValue);

    success();
}

function isValidGmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.(com|vn)$/;
    return regex.test(email);
}

function isEmailExist(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

function isStrongPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    return regex.test(password);
}

function showError(index, message) {
    errors[index].textContent = message;
}

function clearError() {
    errors.forEach(err => err.textContent = "");
}

function saveUser(name, email, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
        name,
        email: email.toLowerCase(),
        password,
        role: "user"
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
}

function showPopup() {
    popup.style.display = "flex";
}

function success() {
    showPopup();

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1000);
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

