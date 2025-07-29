// Import data from parent directory
import { BARBEROS, SERVICIOS } from "../data.js";
import { saveReserva, isTimeSlotAvailable } from "../reservas.js";

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

// Populate time slots based on availability
function populateHorarios(barberoId = null, fecha = null) {
  const horaSelect = document.getElementById("hora");
  const allTimeSlots = [
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

  // Clear existing options except the first one
  horaSelect.innerHTML = '<option value="">Selecciona una hora</option>';

  // If no barber or date selected, show all times
  if (!barberoId || !fecha) {
    allTimeSlots.forEach((time) => {
      const option = document.createElement("option");
      option.value = time;
      option.textContent = time;
      horaSelect.appendChild(option);
    });
    return;
  }

  // Filter available times
  const availableSlots = allTimeSlots.filter((time) =>
    isTimeSlotAvailable(parseInt(barberoId), fecha, time)
  );

  availableSlots.forEach((time) => {
    const option = document.createElement("option");
    option.value = time;
    option.textContent = time;
    horaSelect.appendChild(option);
  });

  // Show message if no slots available
  if (availableSlots.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No hay horarios disponibles";
    option.disabled = true;
    horaSelect.appendChild(option);
  }
}

// Update available time slots when barber or date changes
function updateAvailableHours() {
  const barberoId = document.getElementById("barbero").value;
  const fecha = document.getElementById("fecha").value;
  populateHorarios(barberoId, fecha);
}

// Initialize dropdowns when page loads
document.addEventListener("DOMContentLoaded", function () {
  populateBarberos();
  populateServicios();
  populateHorarios();

  // Add event listeners for dynamic time slot updates
  document
    .getElementById("barbero")
    .addEventListener("change", updateAvailableHours);
  document
    .getElementById("fecha")
    .addEventListener("change", updateAvailableHours);
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
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(celular)) {
      document.getElementById("celularError").textContent =
        "Ingresa un número de celular válido";
      document.getElementById("celularError").style.display = "block";
      isValid = false;
    }

    if (!correo) {
      document.getElementById("correoError").textContent =
        "El correo es requerido";
      document.getElementById("correoError").style.display = "block";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
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
    } else {
      const selectedDate = new Date(fecha);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        document.getElementById("fechaError").textContent =
          "No puedes reservar en fechas pasadas";
        document.getElementById("fechaError").style.display = "block";
        isValid = false;
      }
    }

    if (!hora) {
      document.getElementById("horaError").textContent = "Selecciona una hora";
      document.getElementById("horaError").style.display = "block";
      isValid = false;
    }

    if (isValid) {
      try {
        // Save reservation to localStorage
        const reservaData = {
          nombre,
          apellido,
          celular,
          correo,
          barberoId: parseInt(barbero),
          servicioId: parseInt(servicio),
          fecha,
          hora,
        };

        const nuevaReserva = saveReserva(reservaData);
        console.log("Reserva guardada:", nuevaReserva);

        // Show success message
        document.getElementById("successMessage").style.display = "block";

        // Reset form
        this.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          document.getElementById("successMessage").style.display = "none";
        }, 5000);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error saving reservation:", error);
        alert("Error al guardar la reserva. Por favor, inténtalo de nuevo.");
      }
    }
  });

// Set minimum date to today
document.getElementById("fecha").min = new Date().toISOString().split("T")[0];
