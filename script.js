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

  // Rotating short descriptions for each project
  const projectMessages = {
    'project-one': [
      'システム設計を支援',
      '迅速な開発を実現',
      '運用保守もお任せ'
    ],
    'project-two': [
      '革新的な技術を追求',
      '未来を切り開くソリューション',
      '常に新しい挑戦を'
    ],
    'project-three': [
      '学びを止めない',
      '挑戦から成長へ',
      '可能性を広げる'
    ],
    'project-four': [
      '多様性が力になる',
      '共に創り上げる価値',
      '個性を活かしたチームワーク'
    ]
  };

  function setupMessageRotation(el, msgs) {
    let index = 0;
    function show() {
      el.classList.remove('visible');
      setTimeout(() => {
        el.textContent = msgs[index];
        el.classList.add('visible');
        index = (index + 1) % msgs.length;
      }, 500);
    }
    show();
    setInterval(show, 3000);
  }

  Object.entries(projectMessages).forEach(([cls, msgs]) => {
    const el = document.querySelector(`.${cls} .message`);
    if (el) {
      setupMessageRotation(el, msgs);
    }
  });

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

  const indicator = document.getElementById('scroll-indicator');
  const firstSection = document.querySelector('section.parallax');

  if (indicator && firstSection) {
    indicator.addEventListener('click', () => {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    });

    function toggleIndicator() {
      if (window.scrollY < 50) {
        indicator.classList.remove('hidden');
      } else {
        indicator.classList.add('hidden');
      }
    }

    toggleIndicator();
    document.addEventListener('scroll', toggleIndicator);
  }
});
