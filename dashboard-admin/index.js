document.addEventListener("DOMContentLoaded", () => {
  if (!isAuthenticated()) {
    window.location.href = "../login-admin/index.html";
    return;
  }

  const LOCAL_STORAGE_KEY = "reservas";

  const exampleData = {
    reservas: [
      {
        id: 1,
        nombreCliente: "Juan",
        apellidoCliente: "Pérez",
        celularCliente: "+59891234567",
        correoCliente: "juan@example.com",
        barberoSeleccionado: 1,
        servicio: 101,
        fecha: "2025-08-01",
        hora: "14:30",
      },
      {
        id: 2,
        nombreCliente: "Lucía",
        apellidoCliente: "Gómez",
        celularCliente: "+59898765432",
        correoCliente: "lucia@example.com",
        barberoSeleccionado: 2,
        servicio: 102,
        fecha: "2025-08-01",
        hora: "16:00",
      },
      {
        id: 3,
        nombreCliente: "Ejemplo",
        apellidoCliente: "Cliente",
        celularCliente: "Contacto Ejemplo",
        correoCliente: "ejemplo@correo.com",
        barberoSeleccionado: 999,
        servicio: 999,
        fecha: "YYYY-MM-DD",
        hora: "HH:MM",
      },
    ],
  };

  function obtainBookings() {
    let data = null;

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      data = stored ? JSON.parse(stored) : null;

      if (
        !data ||
        !Array.isArray(data.reservas) ||
        data.reservas.length === 0
      ) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(exampleData));
        data = exampleData;
      }
    } catch (err) {
      console.warn("Error leyendo reservas. Precargando datos de ejemplo.");
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(exampleData));
      data = exampleData;
    }

    return data.reservas;
  }

  function renderizeBookings(bookings) {
    const tableBody = document.getElementById("bookingsTableBody");
    const countText = document.getElementById("bookingsCount");

    bookings.sort((a, b) => {
      const dateA = new Date(`${a.fecha}T${a.hora}`);
      const dateB = new Date(`${b.fecha}T${b.hora}`);
      return dateA - dateB;
    });

    tableBody.innerHTML = "";

    bookings.forEach((b) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td data-label="Cliente" class="td-name">${b.nombreCliente} ${b.apellidoCliente}</td>
          <td data-label="Barbero">ID ${b.barberoSeleccionado}</td>
          <td data-label="Servicio">ID ${b.servicio}</td>
          <td data-label="Fecha">${b.fecha}</td>
          <td data-label="Hora">${b.hora}</td>
          <td data-label="Contacto">${b.celularCliente}</td>
        `;
      tableBody.appendChild(row);
    });

    countText.textContent = `Mostrando ${bookings.length} reservas`;
  }

  const bookings = obtainBookings();
  renderizeBookings(bookings);

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
    const filtered = dateInput
      ? allBookings.filter((booking) => booking.fecha === dateInput)
      : allBookings;
    renderizeBookings(filtered);
  }

  function clearFilter() {
    document.getElementById("filterDate").value = "";
    renderizeBookings(obtainBookings());
  }
});
