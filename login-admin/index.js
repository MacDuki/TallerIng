/**
 * @typedef {Object} AdminSession
 * @property {string} email - The administrator's email address
 * @property {string} loginTime - ISO string timestamp of when the session was created
 * @property {boolean} isAuthenticated - Flag indicating if the user is authenticated
 */

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  // Hardcoded credentials
  const ADMIN_EMAIL = "admin@barberia.com";
  const ADMIN_PASSWORD = "pass123";

  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // TODO: Implement route protection - redirect to admin panel if already logged in
  checkAuthStatus();

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

    // Authenticate credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Successful login
      handleSuccessfulLogin();
    } else {
      // Failed login
      handleFailedLogin();
    }
  });

  function handleSuccessfulLogin() {
    // Save session to localStorage
    /** @type {AdminSession} */
    const sessionData = {
      email: ADMIN_EMAIL,
      loginTime: new Date().toISOString(),
      isAuthenticated: true,
    };

    localStorage.setItem("adminSession", JSON.stringify(sessionData));

    // TODO: Implement redirect to admin panel after login success
    alert("¡Inicio de sesión exitoso!");
  }

  function handleFailedLogin() {
    // Clear any existing session
    localStorage.removeItem("adminSession");

    // Show error message
    passwordError.textContent = "Credenciales incorrectas";

    // Clear password field
    passwordInput.value = "";
  }

  function checkAuthStatus() {
    const sessionData = localStorage.getItem("adminSession");

    if (sessionData) {
      try {
        /** @type {AdminSession} */
        const session = JSON.parse(sessionData);
        if (session.isAuthenticated) {
          // TODO: Implement redirect to admin panel for already logged in users
          console.log("User is already authenticated");
        }
      } catch (error) {
        // Invalid session data, remove it
        localStorage.removeItem("adminSession");
      }
    }
  }

  /**
   * Logs out the current user by removing session data
   * TODO: Implement redirect to login page after logout
   */
  function logout() {
    // Remove session from localStorage
    localStorage.removeItem("adminSession");

    // TODO: Implement redirect to login page
    console.log("User logged out");
  }

  // Make logout function available globally for use in other pages
  window.adminLogout = logout;
});
