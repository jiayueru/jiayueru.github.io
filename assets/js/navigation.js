const navigation = document.querySelector('.topnav');
const menuButton = navigation.querySelector('.icon');

function closeNavigation() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation.querySelectorAll('#myLinks a').forEach(link => {
  link.addEventListener('click', closeNavigation);
});

navigation.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeNavigation();
    menuButton.focus();
  }
});

window.matchMedia('(max-width: 640px)').addEventListener('change', closeNavigation);
