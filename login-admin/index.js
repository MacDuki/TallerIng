/**
 * @typedef {Object} AdminSession
 * @property {string} email - The administrator's email address
 * @property {string} loginTime - ISO string timestamp of when the session was created
 * @property {boolean} isAuthenticated - Flag indicating if the user is authenticated
 */

// Import auth functions
import {
  validateCredentials,
  createSession,
  isAuthenticated,
  clearSession,
} from "../auth.js";

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Redirect to admin panel if already logged in
  if (isAuthenticated()) {
    window.location.href = "../dashboard-admin/index.html";
    return;
  }

  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.textContent = type === "password" ? "👁" : "🙈";
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Clear previous errors
    emailError.textContent = "";
    passwordError.textContent = "";

    let hasErrors = false;

    // Email validation
    if (!email) {
      emailError.textContent = "El email es requerido";
      hasErrors = true;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = "Formato de email inválido";
      hasErrors = true;
    }

    // Password validation
    if (!password) {
      passwordError.textContent = "La contraseña es requerida";
      hasErrors = true;
    } else if (password.length < 6) {
      passwordError.textContent =
        "La contraseña debe tener al menos 6 caracteres";
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    // Authenticate credentials using auth helper
    if (validateCredentials(email, password)) {
      // Successful login
      handleSuccessfulLogin(email, password);
    } else {
      // Failed login
      handleFailedLogin();
    }
  });

  function handleSuccessfulLogin(email, password) {
    // Create session using auth helper
    createSession(email, password);

    // Redirect to admin dashboard after successful login
    window.location.href = "../dashboard-admin/index.html";
  }

  function handleFailedLogin() {
    clearSession();

    // Mostrar y animar mensaje de error
    passwordError.textContent = "Credenciales incorrectas";
    passwordError.classList.add("active");

    // Reiniciar animación si ya estaba activa
    setTimeout(() => {
      passwordError.classList.remove("active");
    }, 500);

    passwordInput.value = "";
  }
});
