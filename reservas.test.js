// reservas.test.js
import {
  getReservas,
  saveReserva,
  updateReserva,
  deleteReserva,
  getReservasByDate,
  getReservasByBarbero,
  isTimeSlotAvailable,
  clearAllReservas,
} from "./reservas";

// Mock localStorage para las pruebas
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

beforeAll(() => {
  // Reemplazar el localStorage global con nuestro mock
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
});

beforeEach(() => {
  // Limpiar el localStorage antes de cada prueba
  localStorage.clear();
  jest.clearAllMocks();
});

describe("Reservas Module", () => {
  const sampleReserva = {
    nombre: "Juan",
    apellido: "Pérez",
    celular: "1234567890",
    correo: "juan@example.com",
    barberoId: 1,
    servicioId: 1,
    fecha: "2023-12-31",
    hora: "10:00",
  };

  describe("getReservas", () => {
    // Test01
    test("should return empty array when no reservations exist", () => {
      const result = getReservas();
      expect(result).toEqual([]);
    });
    // Test02
    test("should return existing reservations", () => {
      localStorage.setItem(
        "barberia_reservas",
        JSON.stringify([sampleReserva])
      );
      const result = getReservas();
      expect(result).toEqual([sampleReserva]);
    });
  });

  describe("saveReserva", () => {
    // Test03
    test("should save a new reservation with generated id and metadata", () => {
      const result = saveReserva(sampleReserva);

      expect(result).toHaveProperty("id");
      expect(result.id).toBeTruthy();
      expect(result).toHaveProperty("fechaCreacion");
      expect(result.fechaCreacion).toBeTruthy();
      expect(result.estado).toBe("pendiente");
      expect(result.nombre).toBe(sampleReserva.nombre);

      const stored = getReservas();
      expect(stored.length).toBe(1);
      expect(stored[0].id).toBe(result.id);
    });
  });

  describe("updateReserva", () => {
    // Test04
    test("should update an existing reservation", () => {
      const original = saveReserva(sampleReserva);
      const updates = { nombre: "Pedro", estado: "confirmada" };

      const result = updateReserva(original.id, updates);

      expect(result).toBeDefined();
      expect(result?.nombre).toBe("Pedro");
      expect(result?.estado).toBe("confirmada");
      expect(result?.apellido).toBe(original.apellido); // Campos no modificados deben permanecer igual

      const stored = getReservas();
      expect(stored[0].nombre).toBe("Pedro");
    });
    // Test05
    test("should return null for non-existent reservation", () => {
      const result = updateReserva("nonexistent-id", { nombre: "Pedro" });
      expect(result).toBeNull();
    });
  });

  describe("deleteReserva", () => {
    // Test06
    test("should delete an existing reservation", () => {
      const original = saveReserva(sampleReserva);
      const initialCount = getReservas().length;

      const result = deleteReserva(original.id);
      expect(result).toBe(true);

      const finalCount = getReservas().length;
      expect(finalCount).toBe(initialCount - 1);
    });
    // Test07
    test("should return false for non-existent reservation", () => {
      const result = deleteReserva("nonexistent-id");
      expect(result).toBe(false);
    });
  });

  describe("getReservasByDate", () => {
    // Test08
    test("should filter reservations by date", () => {
      const res1 = saveReserva({ ...sampleReserva, fecha: "2023-01-01" });
      const res2 = saveReserva({ ...sampleReserva, fecha: "2023-01-02" });
      saveReserva({ ...sampleReserva, fecha: "2023-01-03" });

      const result = getReservasByDate("2023-01-02");
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(res2.id);
    });
    // Test09
    test("should return empty array when no reservations for date", () => {
      saveReserva({ ...sampleReserva, fecha: "2023-01-01" });
      const result = getReservasByDate("2023-01-02");
      expect(result).toEqual([]);
    });
  });

  describe("getReservasByBarbero", () => {
    // Test10
    test("should filter reservations by barber", () => {
      const res1 = saveReserva({ ...sampleReserva, barberoId: 1 });
      const res2 = saveReserva({ ...sampleReserva, barberoId: 1 });
      saveReserva({ ...sampleReserva, barberoId: 2 });

      const result = getReservasByBarbero(1);
      expect(result.length).toBe(2);
      expect(result.map((r) => r.id)).toContain(res1.id);
      expect(result.map((r) => r.id)).toContain(res2.id);
    });
    // Test11
    test("should return empty array when no reservations for barber", () => {
      saveReserva({ ...sampleReserva, barberoId: 1 });
      const result = getReservasByBarbero(2);
      expect(result).toEqual([]);
    });
  });

  describe("isTimeSlotAvailable", () => {
    // Test12
    test("should return true for available time slot", () => {
      const result = isTimeSlotAvailable(1, "2023-01-01", "10:00");
      expect(result).toBe(true);
    });
    // Test13
    test("should return false for occupied time slot", () => {
      saveReserva({
        ...sampleReserva,
        barberoId: 1,
        fecha: "2023-01-01",
        hora: "10:00",
      });
      const result = isTimeSlotAvailable(1, "2023-01-01", "10:00");
      expect(result).toBe(false);
    });
  });

  describe("clearAllReservas", () => {
    // Test14
    test("should clear all reservations", () => {
      saveReserva(sampleReserva);
      saveReserva({ ...sampleReserva, id: "2" });

      const result = clearAllReservas();
      expect(result).toBe(true);
      expect(getReservas()).toEqual([]);
    });
  });
});
