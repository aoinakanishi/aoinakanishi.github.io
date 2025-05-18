document.addEventListener('DOMContentLoaded', () => {
  function updateViewportHeight() {
    document.documentElement.style.setProperty(
      '--vh', `${window.innerHeight * 0.01}px`
    );
  }
  updateViewportHeight();
  window.addEventListener('resize', updateViewportHeight);
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
      '小さな行動の積み重ねで、沈黙の組織を発信力のある組織へ。',
      '愚直に伝え続けることが、動かない壁を動かす唯一の方法だ。',
      '壮大なビジョンを掲げ、一歩ずつ確実に前へ。'
    ],
    'project-two': [
      '新しい技術を恐れず挑む者が、次の時代を切り拓く。',
      '知識だけでは世界は変わらない。行動が未来を動かす。',
      '走り続ける者だけが、過去を振り切り未来を掴む。'
    ],
    'project-three': [
      '学び続けるからこそ、私の価値が高まる。',
      '人生は、劇的な成長を求めるほど価値が増す。',
      '限界は常に自分の中にある。超えるべき相手は自分自身だ。'
    ],
    'project-four': [
      'まだ気づかれていない魅力を、静かに引き出す。',
      'メンバーの才能を解き放つことが、真のリーダーシップ。',
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
