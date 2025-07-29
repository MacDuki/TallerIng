// Import data and reservation functions
import { BARBEROS, SERVICIOS } from "../data.js";
import { getReservas } from "../reservas.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!isAuthenticated()) {
    window.location.href = "../login-admin/index.html";
    return;
  }

  // Helper function to get barber name by ID
  function getBarberoName(barberoId) {
    const barbero = BARBEROS.find((b) => b.id === barberoId);
    return barbero ? barbero.nombre : `ID ${barberoId}`;
  }

  // Helper function to get service name by ID
  function getServicioName(servicioId) {
    const servicio = SERVICIOS.find((s) => s.id === servicioId);
    return servicio ? servicio.nombre : `ID ${servicioId}`;
  }

  // Helper function to format date for display
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function obtainBookings() {
    try {
      const reservas = getReservas();
      console.log("Reservas obtenidas:", reservas);
      return reservas;
    } catch (error) {
      console.error("Error obteniendo reservas:", error);
      return [];
    }
  }

  function renderizeBookings(bookings) {
    const tableBody = document.getElementById("bookingsTableBody");
    const countText = document.getElementById("bookingsCount");

    // Sort bookings by date and time
    bookings.sort((a, b) => {
      const dateA = new Date(`${a.fecha}T${a.hora}`);
      const dateB = new Date(`${b.fecha}T${b.hora}`);
      return dateA - dateB;
    });

    tableBody.innerHTML = "";

    if (bookings.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td colspan="6" class="empty-state">
          No hay reservas para mostrar
        </td>
      `;
      tableBody.appendChild(row);
      countText.textContent = "No hay reservas";
      return;
    }

    bookings.forEach((reserva) => {
      const row = document.createElement("tr");

      // Get the status badge HTML
      const statusBadge = getStatusBadge(reserva.estado);

      row.innerHTML = `
        <td data-label="Cliente" class="td-name">
          <div>${reserva.nombre} ${reserva.apellido}</div>
          <div class="email">${reserva.correo}</div>
        </td>
        <td data-label="Barbero">${getBarberoName(reserva.barberoId)}</td>
        <td data-label="Servicio">${getServicioName(reserva.servicioId)}</td>
        <td data-label="Fecha">${formatDate(reserva.fecha)}</td>
        <td data-label="Hora">${reserva.hora}</td>
        <td data-label="Contacto">
          <div>${reserva.celular}</div>
          <div style="margin-top: 0.5rem;">${statusBadge}</div>
        </td>
      `;
      tableBody.appendChild(row);
    });

    countText.textContent = `Mostrando ${bookings.length} reserva${
      bookings.length !== 1 ? "s" : ""
    }`;
  }

  // Helper function to create status badge
  function getStatusBadge(estado) {
    const statusConfig = {
      pendiente: { text: "Pendiente", color: "#f59e0b", bgColor: "#fef3c7" },
      confirmada: { text: "Confirmada", color: "#10b981", bgColor: "#d1fae5" },
      cancelada: { text: "Cancelada", color: "#ef4444", bgColor: "#fee2e2" },
    };

    const config = statusConfig[estado] || statusConfig["pendiente"];

    return `<span style="
      background-color: ${config.bgColor}; 
      color: ${config.color}; 
      padding: 0.25rem 0.5rem; 
      border-radius: 0.375rem; 
      font-size: 0.75rem; 
      font-weight: 500;
    ">${config.text}</span>`;
  }

  // Load and display bookings
  const bookings = obtainBookings();
  renderizeBookings(bookings);

  // Event listeners for filtering
  document
    .getElementById("filterDate")
    .addEventListener("change", filterBookings);
  document
    .querySelector(".filter-button")
    .addEventListener("click", filterBookings);
  document
    .querySelector(".clear-button")
    .addEventListener("click", clearFilter);

  function filterBookings() {
    const dateInput = document.getElementById("filterDate").value;
    const allBookings = obtainBookings();

    if (!dateInput) {
      renderizeBookings(allBookings);
      return;
    }

    const filtered = allBookings.filter(
      (booking) => booking.fecha === dateInput
    );
    renderizeBookings(filtered);
  }

  function clearFilter() {
    document.getElementById("filterDate").value = "";
    const allBookings = obtainBookings();
    renderizeBookings(allBookings);
  }

  // Add a refresh button functionality (optional)
  const refreshButton = document.createElement("button");
  refreshButton.textContent = "Actualizar";
  refreshButton.className = "filter-button";
  refreshButton.style.marginLeft = "0.5rem";
  refreshButton.addEventListener("click", () => {
    const allBookings = obtainBookings();
    renderizeBookings(allBookings);
  });

  // Add refresh button next to clear button
  const filterSection = document.querySelector(".filter-section");
  filterSection.appendChild(refreshButton);
});
