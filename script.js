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
  const projectImages = Array.from({ length: 3 }, (_, i) =>
    `https://picsum.photos/1600/900?random=${Date.now()}-${i}`
  );
  document
    .querySelectorAll('.project-one .backgrounds .bg')
    .forEach((el, idx) => {
      if (projectImages[idx]) {
        el.style.backgroundImage = `url('${projectImages[idx]}')`;
      }
    });

  // Randomize images for other project sections
  document.querySelectorAll('.parallax.random-image').forEach(section => {
    section.style.backgroundImage = `url('https://picsum.photos/1200/800?random=${Math.random()}')`;
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

  // Smooth scroll between projects using arrow keys
  const scrollTargets = [
    document.querySelector('header.hero'),
    ...document.querySelectorAll('section.parallax')
  ];
  let isScrolling = false;

  function getCurrentSectionIndex() {
    let closest = 0;
    let minDist = Infinity;
    scrollTargets.forEach((sec, i) => {
      const dist = Math.abs(sec.getBoundingClientRect().top);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    return closest;
  }

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
      return;
    }
    e.preventDefault();
    if (isScrolling) return;

    const idx = getCurrentSectionIndex();
    if (e.key === 'ArrowDown' && idx < scrollTargets.length - 1) {
      isScrolling = true;
      scrollTargets[idx + 1].scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => (isScrolling = false), 800);
    } else if (e.key === 'ArrowUp' && idx > 0) {
      isScrolling = true;
      scrollTargets[idx - 1].scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => (isScrolling = false), 800);
    }
  });
});
