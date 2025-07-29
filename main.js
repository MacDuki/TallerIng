// Import barberos data
import { BARBEROS } from "./data.js";

const trabajos = [
  {
    titulo: "Corte de Pelo Profesional",
    imagen: "./assets/worksImages/P01-min.png",
    texto:
      "Corte personalizado con estilo moderno y técnicas de precisión para cada tipo de rostro.",
  },
  {
    titulo: "Corte de Pelo Profesional",
    imagen: "./assets/worksImages/P01v2-min.png",
    texto:
      "Corte personalizado con estilo a la moda y técnicas de precisión para cada tipo de rostro.",
  },
  {
    titulo: "Rasurada de Barba",
    imagen: "./assets/worksImages/P02-min.png",
    texto:
      "Rasurado con navaja caliente, espuma especial y tratamiento hidratante post-afeitado.",
  },
  {
    titulo: "Colorimetría: Cambio de Look",
    imagen: "./assets/worksImages/P03-min.png",
    texto:
      "Aplicación de color según diagnóstico capilar y tono de piel. Resultado uniforme y vibrante.",
  },
  {
    titulo: "Colorimetría Creativa",
    imagen: "./assets/worksImages/P03v2-min.png",
    texto:
      "Tintes fantasía, degradados o balayage con técnicas avanzadas y productos de alta calidad.",
  },
  {
    titulo: "Lavado + Acondicionamiento",
    imagen: "./assets/worksImages/P04-min.png",
    texto:
      "Lavado con shampoo neutro y acondicionamiento profundo para dar brillo y suavidad.",
  },
  {
    titulo: "Lavado Detox",
    imagen: "./assets/worksImages/P04v2-min.png",
    texto:
      "Limpieza profunda del cuero cabelludo y sellado con hidratantes naturales.",
  },
  {
    titulo: "Servicio Premium",
    imagen: "./assets/worksImages/P05-min.png",
    texto:
      "Pack completo: corte, lavado, nutrición, afeitado y bebidas. Experiencia de barbería de lujo.",
  },
];

// Function to open modal
function openModal(index) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");

  const trabajo = trabajos[index];

  modalImg.src = trabajo.imagen;
  modalTitle.textContent = trabajo.titulo;
  modalText.textContent = trabajo.texto;

  modal.classList.add("show");
}

// Function to close modal
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("show");
}

// Close modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal();
  }
};

// Close modal with ESC key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// ===========================================
// NAVIGATION FUNCTIONALITY
// ===========================================

// Mobile menu toggle function
function toggleMobileMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  mobileMenu.classList.toggle("show");
  menuBtn.classList.toggle("active");
}

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleMobileMenu = toggleMobileMenu;

// ===========================================
// BARBEROS FUNCTIONALITY
// ===========================================

// Function to render barberos
function renderBarberos() {
  const barberosGrid = document.getElementById("barberos-grid");

  if (!barberosGrid) return;

  barberosGrid.innerHTML = BARBEROS.map(
    (barbero) => `
    <div class="barbero-card">
      <img 
        src="${barbero.fotoUrl}" 
        alt="${barbero.nombre}" 
        class="barbero-image"
        loading="lazy"
      />
      <div class="barbero-content">
        <h3 class="barbero-name">${barbero.nombre}</h3>
        <p class="barbero-especialidad">${barbero.especialidad}</p>
        <p class="barbero-description">${barbero.breveDescripcion}</p>
        <div class="barbero-stats">
          <div class="stat-item">
            <span class="stat-number">${barbero.edad}</span>
            <span class="stat-label">Años</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${barbero.anios_experiencia}</span>
            <span class="stat-label">Experiencia</span>
          </div>
        </div>
      </div>
    </div>
  `
  ).join("");
}

// ===========================================
// END BARBEROS FUNCTIONALITY
// ===========================================

// Close mobile menu when clicking on a link
document.addEventListener("DOMContentLoaded", function () {
  // Render barberos when page loads
  renderBarberos();

  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const mobileMenu = document.querySelector(".mobile-menu");
      const menuBtn = document.querySelector(".mobile-menu-btn");

      mobileMenu.classList.remove("show");
      menuBtn.classList.remove("active");
    });
  });

  // Add scroll effect to navbar
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Only handle anchor links (starting with #)
      if (href && href.startsWith("#")) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const navbarHeight = navbar.offsetHeight;
          const elementPosition = targetElement.offsetTop;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
});
