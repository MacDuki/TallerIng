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

function openModal(index) {
  const modal = document.getElementById("modal");
  document.getElementById("modal-img").src = trabajos[index].imagen;
  document.getElementById("modal-title").textContent = trabajos[index].titulo;
  document.getElementById("modal-text").textContent = trabajos[index].texto;
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

window.addEventListener("click", function (e) {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    closeModal();
  }
});
