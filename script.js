document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.parallax .content');
  const options = { threshold: 0.5 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, options);

  sections.forEach(section => observer.observe(section));

  // Project One background images
  const projectImages = [
    'https://source.unsplash.com/1600x900?nature,water',
    'https://source.unsplash.com/1600x900?nature,forest',
    'https://source.unsplash.com/1600x900?nature,sky'
  ];
  document.querySelectorAll('.project-one .backgrounds .bg').forEach((el, idx) => {
    if (projectImages[idx]) {
      el.style.backgroundImage = `url('${projectImages[idx]}')`;
    }
  });

  // Rotating short descriptions
  const messages = [
    'システム設計を支援',
    '迅速な開発を実現',
    '運用保守もお任せ'
  ];
  const messageEl = document.querySelector('.project-one .message');
  let msgIndex = 0;

  function showMessage() {
    messageEl.classList.remove('visible');
    setTimeout(() => {
      messageEl.textContent = messages[msgIndex];
      messageEl.classList.add('visible');
      msgIndex = (msgIndex + 1) % messages.length;
    }, 500);
  }

  showMessage();
  setInterval(showMessage, 3000);
});
