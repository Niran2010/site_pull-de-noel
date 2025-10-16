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

document.addEventListener('DOMContentLoaded', () => {

    const snowContainer = document.getElementById('snow-container');
    const flakeCounterDisplay = document.getElementById('flake-counter-display');
    
    // --- VARIABLES DE CONTRÔLE ---

    /**
     * Le nombre maximum de flocons accumulés en bas avant de commencer
     * à supprimer les plus anciens. Augmentez pour un tas plus grand.
     */
    const MAX_ACCUMULATED_FLAKES = 3000; 
    
    /**
     * L'intervalle de création des flocons en millisecondes.
     * Diminuez la valeur pour avoir plus de neige.
     */
    const FLAKE_CREATION_INTERVAL = 50;

    /**
     * La hauteur en pixels de la zone où les flocons s'accumulent.
     */
    const ACCUMULATION_ZONE_HEIGHT = 40;


    // --- VARIABLES DE SUIVI ---

    /** * La variable que vous vouliez ! Compte les flocons actuellement posés en bas.
     * @type {number}
     */
    let nombreFloconsEnBas = 0;
    
    /**
     * Un tableau qui stocke les éléments des flocons accumulés.
     * Utilisé comme une file d'attente (FIFO) pour savoir quel flocon supprimer.
     * @type {HTMLElement[]}
     */
    const settledFlakes = [];


    /**
     * Met à jour le texte du compteur affiché sur la page.
     */
    function updateCounterDisplay() {
        flakeCounterDisplay.textContent = `Flocons accumulés : ${nombreFloconsEnBas}`;
    }


    /**
     * Crée un nouveau flocon avec des propriétés aléatoires et l'ajoute à la page.
     */
    function createSnowflake() {
        const snowflake = document.createElement('img');
        snowflake.src = 'image_flocon-modified.png'; // Assurez-vous que le chemin est correct
        snowflake.className = 'snowflake';

        // --- Randomisation pour un effet naturel ---

        const size = Math.random() * 20 + 10; // Taille entre 10px et 30px
        const fallDuration = Math.random() * 5 + 8; // Durée de chute entre 8s et 13s
        const swayDuration = Math.random() * 4 + 2; // Durée du balancement entre 2s et 6s

        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * 100}%`; // Position horizontale aléatoire
        snowflake.style.opacity = Math.random() * 0.7 + 0.3; // Opacité entre 0.3 et 1.0
        
        // Applique les durées d'animation
        snowflake.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;

        // Ajoute le flocon au conteneur
        snowContainer.appendChild(snowflake);


        // --- Gestion de la fin de la chute ---

        // On écoute l'événement 'animationend' qui se déclenche quand l'animation 'fall' est terminée.
        snowflake.addEventListener('animationend', () => {
            handleSettledFlake(snowflake);
        });
    }

    /**
     * Gère un flocon qui a terminé sa chute.
     * @param {HTMLElement} flake L'élément du flocon.
     */
    function handleSettledFlake(flake) {
        // On arrête toutes ses animations
        flake.style.animation = 'none';

        // On le positionne dans la zone d'accumulation en bas
        const finalBottomPosition = Math.random() * ACCUMULATION_ZONE_HEIGHT;
        flake.style.bottom = `${finalBottomPosition}px`;
        // On supprime la propriété 'top' pour que 'bottom' prenne effet
        flake.style.top = 'auto';

        // On incrémente notre compteur et on l'ajoute au tableau de suivi
        nombreFloconsEnBas++;
        settledFlakes.push(flake);
        
        // --- Mécanisme de nettoyage ---
        // Si on dépasse le nombre maximum de flocons autorisés en bas...
        if (settledFlakes.length > MAX_ACCUMULATED_FLAKES) {
            // ...on récupère le flocon le plus ancien (le premier du tableau)...
            const oldestFlake = settledFlakes.shift(); // .shift() retire le 1er élément
            // ...et on le supprime de la page.
            if (oldestFlake) {
                oldestFlake.remove();
                nombreFloconsEnBas--; // On décrémente le compteur
            }
        }
        
        // On met à jour l'affichage
        updateCounterDisplay();
    }


    // Lance la création de flocons à intervalle régulier
    setInterval(createSnowflake, FLAKE_CREATION_INTERVAL);
});
