document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    if (!email) {
      emailError.textContent = "Por favor ingresa un email";
      emailInput.focus();
      hasErrors = true;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = "Por favor ingresa un email válido";
      emailInput.focus();
      hasErrors = true;
    }

    if (!password) {
      passwordError.textContent = "Por favor ingresa una contraseña";
      if (!hasErrors) passwordInput.focus();
      hasErrors = true;
    } else if (password.length < 4) {
      passwordError.textContent =
        "La contraseña debe tener al menos 4 caracteres";
      if (!hasErrors) passwordInput.focus();
      hasErrors = true;
    }

    if (hasErrors) return;

    const validLogin =
      email === "admin@estiloclasico.com" && password === "admin";

    if (validLogin) {
      alert("¡Inicio de sesión exitoso!");
    } else {
      emailError.textContent = "Email o contraseña incorrectos";
    }
  });
});
