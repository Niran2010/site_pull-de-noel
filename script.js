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
