/**
 * @typedef {Object} Barbero
 * @property {number} id - Unique identifier for the barber
 * @property {string} nombre - Full name of the barber
 * @property {number} edad - Age of the barber
 * @property {number} anios_experiencia - Years of experience
 * @property {string} especialidad - Barber's specialty/expertise
 * @property {string} breveDescripcion - Brief description of the barber
 * @property {string} fotoUrl - URL path to the barber's photo
 */

/**
 * Array of barbers with their information
 * @type {Barbero[]}
 */
export const BARBEROS = [
  {
    id: 1,
    nombre: "Javier Martín Gómez",
    edad: 34,
    anios_experiencia: 12,
    especialidad: "barbería clásica y recortes de barba",
    breveDescripcion:
      "Apasionado de las técnicas tradicionales, Javier domina el corte a navaja y los degradados clásicos.",
    fotoUrl: "/assets/javier.png",
  },
  {
    id: 2,
    nombre: "Lucía Fernández Ruiz",
    edad: 28,
    anios_experiencia: 7,
    especialidad: "colorimetría avanzada y cortes modernos",
    breveDescripcion:
      "Especialista en balayage y colores de fantasía, Lucía combina creatividad con el cuidado capilar profesional.",
    fotoUrl: "/assets/lucia.png",
  },
  {
    id: 3,
    nombre: "Carlos Sánchez Ortega",
    edad: 42,
    anios_experiencia: 20,
    especialidad: "afeitado clásico y arreglo de barba",
    breveDescripcion:
      "Con dos décadas detrás de la navaja, Carlos ofrece experiencias de afeitado tradicional con toallas calientes.",
    fotoUrl: "/assets/carlos.png",
  },
];

/**
 * @typedef {Object} Servicio
 * @property {number} id - Unique identifier for the service
 * @property {string} nombre - Name of the service
 * @property {string} descripcion - Description of the service
 * @property {number} precio - Price of the service in currency units
 */

/**
 * Array of available services
 * @type {Servicio[]}
 */
export const SERVICIOS = [
  {
    id: 1,
    nombre: "Barbería",
    descripcion:
      "Corte de cabello, arreglo de barba y bigote, afeitado clásico y diseño personalizado para resaltar tu estilo.",
    precio: 450,
  },
  {
    id: 2,
    nombre: "Colorimetría",
    descripcion:
      "Tintes, mechas y técnicas de color para cabello y barba, utilizando productos de alta calidad para lograr el tono perfecto.",
    precio: 800,
  },
  {
    id: 3,
    nombre: "Tratamientos Capilares",
    descripcion:
      "Servicios de hidratación, reparación y fortalecimiento del cabello, ideales para mantenerlo sano y con brillo.",
    precio: 700,
  },
];
