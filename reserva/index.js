// Import data from parent directory
import { BARBEROS, SERVICIOS } from "../data.js";

// Populate barber dropdown
function populateBarberos() {
  const barberoSelect = document.getElementById("barbero");

  BARBEROS.forEach((barbero) => {
    const option = document.createElement("option");
    option.value = barbero.id;
    option.textContent = barbero.nombre;
    barberoSelect.appendChild(option);
  });
}

// Populate service dropdown
function populateServicios() {
  const servicioSelect = document.getElementById("servicio");

  SERVICIOS.forEach((servicio) => {
    const option = document.createElement("option");
    option.value = servicio.id;
    option.textContent = `${servicio.nombre} - $${servicio.precio}`;
    servicioSelect.appendChild(option);
  });
}

// Populate time slots
function populateHorarios() {
  const horaSelect = document.getElementById("hora");
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ];

  timeSlots.forEach((time) => {
    const option = document.createElement("option");
    option.value = time;
    option.textContent = time;
    horaSelect.appendChild(option);
  });
}

// Initialize dropdowns when page loads
document.addEventListener("DOMContentLoaded", function () {
  populateBarberos();
  populateServicios();
  populateHorarios();
});

// Basic form validation and submission
document
  .getElementById("reservationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous errors
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.style.display = "none"));

    let isValid = true;

    // Basic validation
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const barbero = document.getElementById("barbero").value;
    const servicio = document.getElementById("servicio").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    if (!nombre) {
      document.getElementById("nombreError").textContent =
        "El nombre es requerido";
      document.getElementById("nombreError").style.display = "block";
      isValid = false;
    }

    if (!apellido) {
      document.getElementById("apellidoError").textContent =
        "El apellido es requerido";
      document.getElementById("apellidoError").style.display = "block";
      isValid = false;
    }

    if (!celular) {
      document.getElementById("celularError").textContent =
        "El celular es requerido";
      document.getElementById("celularError").style.display = "block";
      isValid = false;
    }

    if (!correo || !correo.includes("@")) {
      document.getElementById("correoError").textContent =
        "Ingresa un correo válido";
      document.getElementById("correoError").style.display = "block";
      isValid = false;
    }

    if (!barbero) {
      document.getElementById("barberoError").textContent =
        "Selecciona un barbero";
      document.getElementById("barberoError").style.display = "block";
      isValid = false;
    }

    if (!servicio) {
      document.getElementById("servicioError").textContent =
        "Selecciona un servicio";
      document.getElementById("servicioError").style.display = "block";
      isValid = false;
    }

    if (!fecha) {
      document.getElementById("fechaError").textContent =
        "Selecciona una fecha";
      document.getElementById("fechaError").style.display = "block";
      isValid = false;
    }

    if (!hora) {
      document.getElementById("horaError").textContent = "Selecciona una hora";
      document.getElementById("horaError").style.display = "block";
      isValid = false;
    }

    if (isValid) {
      // Show success message
      document.getElementById("successMessage").style.display = "block";
      // Reset form
      this.reset();
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

// Set minimum date to today
document.getElementById("fecha").min = new Date().toISOString().split("T")[0];
