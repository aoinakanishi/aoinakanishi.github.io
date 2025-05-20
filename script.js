document.addEventListener('DOMContentLoaded', () => {
  function updateViewportHeight() {
    document.documentElement.style.setProperty(
      '--vh', `${window.innerHeight * 0.01}px`
    );
  }
  updateViewportHeight();
  window.addEventListener('resize', updateViewportHeight);
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  const images = document.querySelectorAll("section img");
  images.forEach(img => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => img.classList.add("loaded"));
    }
  });

  let lastScrollY = null;

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

  const worksPanorama = document.querySelector('.works-section');

  function updatePanorama() {
    if (!worksPanorama) return;
    const rect = worksPanorama.getBoundingClientRect();
    const distance = rect.height - window.innerHeight;
    if (distance <= 0) {
      worksPanorama.style.backgroundPositionX = '100%';
      return;
    }
    const progress = Math.min(
      Math.max((0 - rect.top) / distance, 0),
      1
    );
    // Move panorama left as user scrolls down
    worksPanorama.style.backgroundPositionX = `${progress * 100}%`;
  }

  updatePanorama();
  window.addEventListener('resize', updatePanorama);
  document.addEventListener('scroll', updatePanorama);

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
      '小さな行動の積み重ねで、沈黙の組織を発信力のある組織へ。',
      '愚直に伝え続けることが、動かない壁を動かす唯一の方法だ。',
      '壮大なビジョンを掲げ、一歩ずつ確実に前へ進むのだ。'
    ],
    'project-two': [
      '新しい技術を恐れず挑む者が、次の時代を切り拓く。',
      '知識だけでは世界は変わらない。行動が未来を動かす',
      '走り続ける者だけが、過去を振り切り未来を掴む。'
    ],
    'project-three': [
      '学び続けるからこそ、私たちの価値が高まる。',
      '人生は、劇的な成長を求めるほど価値が増す。',
      '限界は自分の中にある。超えるのは自分自身だ。'
    ],
    'project-four': [
      'まだ気づかれていない魅力を、静かに引き出す。',
      'メンバーの才能を解き放つことが真のリーダーシップ',
      '個性を掛け合わせ、唯一無二のチームをつくる。'
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
    ...document.querySelectorAll('section'),
    document.querySelector('footer')
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

  // Book section interactions
  const booksSection = document.querySelector('.books-section');
  const books = document.querySelectorAll('.books-section .book');
  books.forEach(book => {
    const close = book.querySelector('.close');
    book.addEventListener('click', e => {
      // Prevent nested event from triggering close immediately
      e.stopPropagation();
      books.forEach(b => b.classList.remove('active'));
      book.classList.add('active');
      booksSection.classList.add('open');
      lastScrollY = window.scrollY;
      booksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    if (close) {
      close.addEventListener('click', e => {
        e.stopPropagation();
        booksSection.classList.remove('open');
        book.classList.remove('active');
        if (lastScrollY !== null) {
          window.scrollTo({ top: lastScrollY, behavior: 'auto' });
        }
      });
    }
  });

  // Clicking outside no longer needed for closing books

  // Works section interactions
  const works = document.querySelectorAll('.works-section .work-card');

  function getHeroOverlay() {
    let overlay = document.getElementById('hero-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'hero-overlay';
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  function heroExpand(work) {
    const overlay = getHeroOverlay();
    const start = work.getBoundingClientRect();
    const clone = work.cloneNode(true);
    clone.classList.add('hero-clone');
    clone.style.top = `${start.top}px`;
    clone.style.left = `${start.left}px`;
    clone.style.width = `${start.width}px`;
    clone.style.height = `${start.height}px`;
    overlay.innerHTML = '';
    overlay.appendChild(clone);
    overlay.classList.add('active');
    overlay.currentWork = work;

    work.style.visibility = 'hidden';

    requestAnimationFrame(() => {
      clone.classList.add('active');
      clone.style.top = `${window.innerHeight * 0.1}px`;
      clone.style.left = `${window.innerWidth * 0.1}px`;
      clone.style.width = `${window.innerWidth * 0.8}px`;
      clone.style.height = `${window.innerHeight * 0.8}px`;
    });

    const close = clone.querySelector('.close');
    if (close) {
      close.addEventListener('click', e => {
        e.stopPropagation();
        heroCollapse();
      }, { once: true });
    }
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        heroCollapse();
      }
    }, { once: true });
  }

  function heroCollapse() {
    const overlay = getHeroOverlay();
    const work = overlay.currentWork;
    if (!work) return;
    const clone = overlay.querySelector('.hero-clone');
    const end = work.getBoundingClientRect();

    clone.classList.remove('active');
    clone.style.top = `${end.top}px`;
    clone.style.left = `${end.left}px`;
    clone.style.width = `${end.width}px`;
    clone.style.height = `${end.height}px`;

    clone.addEventListener('transitionend', () => {
      overlay.classList.remove('active');
      overlay.innerHTML = '';
      work.style.visibility = '';
      overlay.currentWork = null;
    }, { once: true });
  }

  works.forEach(work => {
    const close = work.querySelector('.close');
    work.addEventListener('click', e => {
      e.stopPropagation();
      heroExpand(work);
    });
    if (close) {
      close.addEventListener('click', e => {
        e.stopPropagation();
        heroCollapse();
      });
    }
  });


  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (booksSection && booksSection.classList.contains('open')) {
        booksSection.classList.remove('open');
        books.forEach(b => b.classList.remove('active'));
        if (lastScrollY !== null) {
          window.scrollTo({ top: lastScrollY, behavior: 'auto' });
        }
      }
      const overlay = document.getElementById('hero-overlay');
      if (overlay && overlay.classList.contains('active')) {
        heroCollapse();
      }
    }
  });
});
