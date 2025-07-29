/**
 * @typedef {Object} Reserva
 * @property {string} id - Unique identifier for the reservation
 * @property {string} nombre - Customer's first name
 * @property {string} apellido - Customer's last name
 * @property {string} celular - Customer's phone number
 * @property {string} correo - Customer's email
 * @property {number} barberoId - ID of the selected barber
 * @property {number} servicioId - ID of the selected service
 * @property {string} fecha - Appointment date (YYYY-MM-DD)
 * @property {string} hora - Appointment time (HH:MM)
 * @property {string} fechaCreacion - Date when reservation was created
 * @property {string} estado - Status of the reservation (pendiente, confirmada, cancelada)
 */

const STORAGE_KEY = "barberia_reservas";

/**
 * Generates a unique ID for a new reservation
 * @returns {string} Unique identifier
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Gets all reservations from localStorage
 * @returns {Reserva[]} Array of reservations
 */
export function getReservas() {
  try {
    const reservas = localStorage.getItem(STORAGE_KEY);
    return reservas ? JSON.parse(reservas) : [];
  } catch (error) {
    console.error("Error reading reservations from localStorage:", error);
    return [];
  }
}

/**
 * Saves a new reservation to localStorage
 * @param {Object} reservaData - Reservation data without id and metadata
 * @returns {Reserva} The saved reservation with generated id and metadata
 */
export function saveReserva(reservaData) {
  try {
    const reservas = getReservas();

    const nuevaReserva = {
      id: generateId(),
      ...reservaData,
      fechaCreacion: new Date().toISOString(),
      estado: "pendiente",
    };

    reservas.push(nuevaReserva);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservas));

    return nuevaReserva;
  } catch (error) {
    console.error("Error saving reservation to localStorage:", error);
    throw new Error("No se pudo guardar la reserva");
  }
}

/**
 * Updates an existing reservation
 * @param {string} id - Reservation ID
 * @param {Object} updatedData - Updated reservation data
 * @returns {Reserva|null} Updated reservation or null if not found
 */
export function updateReserva(id, updatedData) {
  try {
    const reservas = getReservas();
    const index = reservas.findIndex((reserva) => reserva.id === id);

    if (index === -1) {
      return null;
    }

    reservas[index] = { ...reservas[index], ...updatedData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservas));

    return reservas[index];
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw new Error("No se pudo actualizar la reserva");
  }
}

/**
 * Deletes a reservation by ID
 * @param {string} id - Reservation ID
 * @returns {boolean} True if deleted, false if not found
 */
export function deleteReserva(id) {
  try {
    const reservas = getReservas();
    const filteredReservas = reservas.filter((reserva) => reserva.id !== id);

    if (filteredReservas.length === reservas.length) {
      return false; // No reservation found with that ID
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredReservas));
    return true;
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw new Error("No se pudo eliminar la reserva");
  }
}

/**
 * Gets reservations for a specific date
 * @param {string} fecha - Date in YYYY-MM-DD format
 * @returns {Reserva[]} Array of reservations for the specified date
 */
export function getReservasByDate(fecha) {
  const reservas = getReservas();
  return reservas.filter((reserva) => reserva.fecha === fecha);
}

/**
 * Gets reservations for a specific barber
 * @param {number} barberoId - Barber ID
 * @returns {Reserva[]} Array of reservations for the specified barber
 */
export function getReservasByBarbero(barberoId) {
  const reservas = getReservas();
  return reservas.filter((reserva) => reserva.barberoId === barberoId);
}

/**
 * Checks if a time slot is available for a specific barber on a specific date
 * @param {number} barberoId - Barber ID
 * @param {string} fecha - Date in YYYY-MM-DD format
 * @param {string} hora - Time in HH:MM format
 * @returns {boolean} True if available, false if occupied
 */
export function isTimeSlotAvailable(barberoId, fecha, hora) {
  const reservas = getReservas();
  return !reservas.some(
    (reserva) =>
      reserva.barberoId === barberoId &&
      reserva.fecha === fecha &&
      reserva.hora === hora &&
      reserva.estado !== "cancelada"
  );
}

/**
 * Clears all reservations from localStorage (for testing/admin purposes)
 * @returns {boolean} True if successful
 */
export function clearAllReservas() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing reservations:", error);
    return false;
  }
}
