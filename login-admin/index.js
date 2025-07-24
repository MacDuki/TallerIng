document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const usernameInput = document.getElementById("username");

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

    if (!username) {
      alert("Por favor ingresa un nombre de usuario");
      usernameInput.focus();
      return;
    }

    if (!password) {
      alert("Por favor ingresa una contraseña");
      passwordInput.focus();
      return;
    }

    if (password.length < 4) {
      alert("La contraseña debe tener al menos 4 caracteres");
      passwordInput.focus();
      return;
    }

    const validLogin = username === "admin" && password === "admin";

    if (validLogin) {
      alert("¡Inicio de sesión exitoso!");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });
});
