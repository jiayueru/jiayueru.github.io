(() => {
  const portrait = document.querySelector('.profile-portrait');
  if (!portrait) return;

  const layer = document.createElement('div');
  layer.className = 'profile-hearts';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const colors = ['#ea79a6', '#f4a6c5', '#ce6d9b', '#ef93bd'];

  function releaseHearts(event) {
    const box = portrait.getBoundingClientRect();
    const keyboard = event.detail === 0;
    const x = keyboard ? box.left + box.width / 2 : event.clientX;
    const y = keyboard ? box.top : event.clientY;

    for (let i = 0; i < 7; i += 1) {
      // Bound the particle count even when someone clicks repeatedly.
      while (layer.childElementCount >= 56) layer.firstElementChild.remove();
      const heart = document.createElement('span');
      heart.className = 'profile-heart';
      heart.textContent = '\u2665';
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.color = colors[i % colors.length];
      heart.style.fontSize = `${14 + Math.random() * 12}px`;
      layer.appendChild(heart);

      const dx = (i - 3) * 17 + (Math.random() - 0.5) * 12;
      const dy = -55 - Math.random() * 65;
      const tilt = (Math.random() - 0.5) * 50;
      const frames = reducedMotion.matches
        ? [
            { transform: `translate(calc(-50% + ${dx}px), -100%)`, opacity: 1 },
            { transform: `translate(calc(-50% + ${dx}px), -100%)`, opacity: 0 }
          ]
        : [
            { transform: 'translate(-50%, -50%) scale(0.4)', opacity: 0 },
            { offset: 0.18, opacity: 1 },
            { transform: `translate(calc(-50% + ${dx}px), ${dy}px) rotate(${tilt}deg) scale(1.15)`, opacity: 0 }
          ];
      const animation = heart.animate(frames, {
        duration: reducedMotion.matches ? 650 : 1000 + Math.random() * 350,
        easing: 'ease-out',
        fill: 'forwards'
      });
      animation.finished.then(() => heart.remove(), () => heart.remove());
    }
  }

  portrait.addEventListener('click', releaseHearts);
})();
