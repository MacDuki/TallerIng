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
  {
    id: 4,
    nombre: "Mariana López Pérez",
    edad: 31,
    anios_experiencia: 10,
    especialidad: "cortes de tendencia y peinados para eventos",
    breveDescripcion:
      "Mariana aporta un estilo único combinando técnicas modernas con un acabado impecable para ocasiones especiales.",
    fotoUrl: "/assets/mariana.webp",
  },
  {
    id: 5,
    nombre: "Sergio Ramírez Torres",
    edad: 37,
    anios_experiencia: 15,
    especialidad: "fade y barbería urbana",
    breveDescripcion:
      "Experto en degradados perfectos y estilos urbanos, Sergio transforma cada corte en una declaración de estilo.",
    fotoUrl: "/assets/sergio.png",
  },
  {
    id: 6,
    nombre: "Andrea Morales Castillo",
    edad: 29,
    anios_experiencia: 8,
    especialidad: "barbería femenina y cortes creativos",
    breveDescripcion:
      "Andrea rompe estereotipos en el mundo de la barbería con cortes creativos que resaltan la personalidad de cada cliente.",
    fotoUrl: "/assets/andrea.png",
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
    nombre: "Corte de pelo",
    descripcion:
      "Corte de cabello clásico y diseño personalizado para resaltar tu estilo.",
    precio: 450,
  },
  {
    id: 2,
    nombre: "Rasurada de barba",
    descripcion:
      "Afeitado tradicional con navaja y tratamientos para barba, logrando un acabado preciso y suave.",
    precio: 350,
  },
  {
    id: 3,
    nombre: "Colorimetría",
    descripcion:
      "Tintes, mechas y técnicas de color para cabello y barba, utilizando productos de alta calidad para lograr el tono perfecto.",
    precio: 800,
  },
  {
    id: 4,
    nombre: "Lavado y acondicionamiento",
    descripcion:
      "Limpieza profunda y tratamiento hidratante para el cabello, dejándolo suave, manejable y con brillo natural.",
    precio: 300,
  },
  {
    id: 5,
    nombre: "Servicio premium de nutrición del cabello",
    descripcion:
      "Tratamiento intensivo con productos profesionales para restaurar y nutrir el cabello dañado o maltratado.",
    precio: 900,
  },
];
