document.querySelectorAll('.teaser-card').forEach((card) => {
  const front = card.querySelector('.teaser-card-front');
  const back = card.querySelector('.teaser-card-back');

  function setFlipped(flipped) {
    card.classList.toggle('is-flipped', flipped);
    card.setAttribute('aria-pressed', String(flipped));
    card.setAttribute('aria-label', `Show ${flipped ? 'teaser' : 'highlights'} for ${card.dataset.title}`);
    front.setAttribute('aria-hidden', String(flipped));
    back.setAttribute('aria-hidden', String(!flipped));
    if (flipped) card.setAttribute('aria-describedby', back.id);
    else card.removeAttribute('aria-describedby');
  }

  card.addEventListener('click', () => setFlipped(!card.classList.contains('is-flipped')));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setFlipped(false);
  });
});
