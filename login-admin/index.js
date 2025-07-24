document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const usernameInput = document.getElementById("username");
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");

  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.textContent = type === "password" ? "👁" : "🙈";
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Clear previous errors
    usernameError.textContent = "";
    passwordError.textContent = "";

    let hasErrors = false;

    if (!username) {
      usernameError.textContent = "Por favor ingresa un nombre de usuario";
      usernameInput.focus();
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

    const validLogin = username === "admin" && password === "admin";

    if (validLogin) {
      alert("¡Inicio de sesión exitoso!");
    } else {
      usernameError.textContent = "Usuario o contraseña incorrectos";
    }
  });
});
