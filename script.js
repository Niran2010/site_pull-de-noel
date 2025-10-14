function afficherImageTemporaire(url) {
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Image temporaire";
  img.style.position = "fixed";
  img.style.top = "0";
  img.style.left = "0";
  img.style.width = "100vw";
  img.style.height = "100vh";
  img.style.objectFit = "cover";  // garde les proportions, recadre si besoin
  img.style.zIndex = "9999";      // s’affiche au-dessus de tout
  img.style.pointerEvents = "none"; // évite de bloquer les clics

  document.body.appendChild(img);

  // Retirer l’image après 200 ms
  setTimeout(() => {
    img.remove();
  }, 200);
}



const popup = document.getElementById('age-verification-popup');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const deniedImg = document.getElementById('access-denied-img');

btnYes.addEventListener('click', () => {
  popup.style.display = 'none'; // Laisse accéder au site
  afficherImageTemporaire("image_liberte.jpg")
});

btnNo.addEventListener('click', () => {
  // Cache les boutons et affiche l'image "accès refusé"
  btnYes.style.display = 'none';
  btnNo.style.display = 'none';
  deniedImg.style.display = 'block';
});

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
  }
  
  let box = document.getElementById("box");
  let position = 0;
  let speed = 2;
  let direction = 1;
  
  function animate() {
  // Calculer la largeur maximale (fenêtre - largeur du box)
  const maxPosition = window.innerWidth - box.offsetWidth;
  
  // Mettre à jour la position
  position += speed * direction;
  
  // Inverser la direction si on dépasse les limites
  if (position > maxPosition || position < 0) {
    direction *= -1;
    // Corriger la position si elle dépasse après rebond
    position = Math.max(0, Math.min(position, maxPosition));
  }
  
  // Appliquer la position
  box.style.left = position + "px";
  
  requestAnimationFrame(animate);
  }
  
  // Initialiser le style si nécessaire
  box.style.position = "absolute";
  
  animate();
  
  // Bonus : Si la fenêtre est redimensionnée, ajuster immédiatement si besoin
  window.addEventListener("resize", () => {
  const maxPosition = window.innerWidth - box.offsetWidth;
  if (position > maxPosition) {
    position = maxPosition;
  }
  });

function showCookieBanner() {
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");

    banner.style.display = "block";

    acceptBtn.addEventListener("click", () => {
        // Tu peux stocker l'acceptation si nécessaire, mais ici on ne la vérifie plus
        localStorage.setItem("cookiesAccepted", "true");
        banner.style.display = "none";
    });
}

// Appeler cette fonction au chargement de la page
window.addEventListener("DOMContentLoaded", showCookieBanner);
