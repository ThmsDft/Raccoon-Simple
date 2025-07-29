const nuancier = document.getElementById("nuancier");
const flapsColors = [
  // Argentés, blancs et gris clairs
  "#F5F5F5",
  "#E8E8E8",
  "#DCDCDC",
  "#C9C9C9",
  "#BDBDBD",
  // Gris moyens et foncés (aspect carbone)
  "#A4A4A4",
  "#8C8C8C",
  "#616161",
  "#424242",
  // Noirs
  "#212121",
  "#000000",
  // Rose / Magenta
  "#D81B60",
  // Bleus (du foncé au plus clair)
  "#1A237E",
  "#283593",
  "#0D47A1",
  "#1565C0",
  "#0277BD",
  "#00838F",
  // Verts
  "#00695C",
  "#2E7D32",
  "#558B2F",
  "#9E9D24",
  // Jaunes
  "#FDD835",
  "#FFB300",
  // Oranges
  "#FB8C00",
  "#F4511E",
  // Rouges
  "#D84315",
  "#C62828",
  "#A61B29",
  "#880E4F",
  // Bleus et couleurs du bas de l'éventail
  "#455A64",
  "#37474F",
  "#263238",
  "#3949AB",
  "#5E35B1",
];
const flaps = [];
const initialAngle = 110; // L'angle de départ (état fermé)

// --- Création des volets (Flaps) ---
for (let i = 0; i < flapsColors.length; i++) {
  const flap = document.createElement("div");
  flap.className = "flap";

  // Calcule et stocke l'angle final pour ce volet
  flap.finalAngle = i * 8 + initialAngle;

  if (i === flapsColors.length - 1) {
    flap.style.backgroundColor = "black";
    flap.innerHTML = `
        <img src="./img/Raccoon-Head-Logo.svg" alt="Raccoon">
        <p>RACCOON</p>
    `;
  } else {
    const color = flapsColors[i];
    flap.style.backgroundColor = color;
  }

  // On n'applique plus la rotation ici, le CSS s'en charge pour l'état initial.
  nuancier.appendChild(flap);
  flaps.push(flap);
}

// --- Logique d'animation au scroll ---
function animateNuancier() {
  const rect = nuancier.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // Le point où l'animation commence (quand le nuancier apparaît en bas)
  const animationStartPoint = viewportHeight;

  // Le point où l'animation se termine (quand le nuancier est au milieu de l'écran)
  const animationEndPoint = viewportHeight / 1.8;

  // Calculer la progression de l'animation (une valeur de 0 à 1)
  const totalDistance = animationStartPoint - animationEndPoint;
  const distanceScrolled = animationStartPoint - rect.top;

  // On s'assure que le progrès reste entre 0 et 1
  let progress = Math.max(0, Math.min(1, distanceScrolled / totalDistance));

  // Appliquer la rotation à chaque volet en fonction du progrès
  flaps.forEach((flap) => {
    // On calcule l'angle actuel en interpolant entre l'angle initial et final
    const currentAngle =
      initialAngle + (flap.finalAngle - initialAngle) * progress;
    flap.style.transform = `rotate(${currentAngle}deg)`;
  });
}

// Écoute l'événement de scroll sur la page
window.addEventListener("scroll", () => {
  // requestAnimationFrame est utilisé pour optimiser les performances
  // et éviter que l'animation ne soit saccadée.
  window.requestAnimationFrame(animateNuancier);
});

// Appelle la fonction une première fois au chargement pour s'assurer que
// tout est bien positionné si le nuancier est déjà visible.
animateNuancier();



const container = document.querySelector('.services-slider');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

// Trouve une card pour connaître sa largeur
const card = container.querySelector('.service');
const cardWidth = card.offsetWidth + parseFloat(getComputedStyle(card).marginRight) * 2;

nextBtn.addEventListener('click', () => {
  container.scrollBy({ left: cardWidth, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
  container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
});
