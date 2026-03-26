/* ============================================================
   AKHILESH B S — Portfolio JavaScript
   ============================================================ */

// ── CURSOR (desktop only) ─────────────────────────────────────
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  });
  (function animRing() {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();
  document.querySelectorAll('a, button, .project-card, .marquee-item, .skill-card, .whatido-card, .exp-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.width = '18px'; cur.style.height = '18px';
      cur.style.background = 'var(--orange)';
      ring.style.width = '50px'; ring.style.height = '50px';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width = '10px'; cur.style.height = '10px';
      cur.style.background = 'var(--blue)';
      ring.style.width = '34px'; ring.style.height = '34px';
    });
  });
}

// ── MOBILE NAV HAMBURGER ──────────────────────────────────────
const hamburger = document.getElementById('navHamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

function closeNav() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
}

// Close nav on outside click
document.addEventListener('click', e => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    closeNav();
  }
});


document.addEventListener('DOMContentLoaded', () => {

  // ── PARTICLES ───────────────────────────────────────────────
  const canvas = document.getElementById('particle-canvas');
  const ctx    = canvas.getContext('2d');
  let parts    = [];
  function rsz() { canvas.width = innerWidth; canvas.height = innerHeight; }
  rsz();
  window.addEventListener('resize', rsz);
  function mp() {
    return { x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      vx: (Math.random()-.5)*.4, vy: -Math.random()*.6-.2,
      sz: Math.random()*1.5+.5, a: Math.random()*.5+.2,
      c: Math.random()>.7 ? '#ff6b00' : '#00c3ff' };
  }
  for (let i=0; i<120; i++) parts.push(mp());
  (function ap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach((p,i) => {
      p.x+=p.vx; p.y+=p.vy; p.a-=.001;
      if (p.a<=0||p.y<-10) parts[i]=mp();
      ctx.beginPath(); ctx.arc(p.x,p.y,p.sz,0,Math.PI*2);
      ctx.fillStyle = p.c + Math.floor(p.a*255).toString(16).padStart(2,'0');
      ctx.fill();
    });
    requestAnimationFrame(ap);
  })();


  // ── TYPEWRITER ──────────────────────────────────────────────
  const roles = [
    'XR Simulation Developer',
    'Digital Twin Engineer',
    'Real-time 3D Specialist',
    'Unreal Engine C++ Expert',
    'Flight Simulator Engineer'
  ];
  let ri=0, ci=0, del=false, pause=false;
  const tel = document.getElementById('typed-text');
  function type() {
    if (pause) { setTimeout(type, 1800); pause=false; return; }
    const w = roles[ri];
    if (!del) {
      tel.textContent = w.slice(0, ++ci);
      if (ci===w.length) { del=true; pause=true; }
      setTimeout(type, 80);
    } else {
      tel.textContent = w.slice(0, --ci);
      if (ci===0) { del=false; ri=(ri+1)%roles.length; }
      setTimeout(type, 40);
    }
  }
  type();


  // ── COUNTER ANIMATION ───────────────────────────────────────
  function animCount(el) {
    const t = parseFloat(el.dataset.count);
    const isF = t%1 !== 0;
    let st = null;
    (function step(ts) {
      if (!st) st = ts;
      const p = Math.min((ts-st)/1800, 1), v = p*t;
      el.textContent = isF ? v.toFixed(1) : Math.floor(v);
      if (p<1) requestAnimationFrame(step);
      else el.textContent = isF ? t.toFixed(1) : t;
    })(performance.now());
  }
  const cobs = new IntersectionObserver(en => {
    en.forEach(e => { if (e.isIntersecting) { animCount(e.target); cobs.unobserve(e.target); } });
  }, { threshold: .5 });
  document.querySelectorAll('.hero-stat-num').forEach(e => cobs.observe(e));


  // ── SCROLL REVEAL ───────────────────────────────────────────
  const revs = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    revs.forEach(r => r.classList.add('animate-ready'));
    const obs = new IntersectionObserver(en => {
      en.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: .05, rootMargin: '0px 0px -20px 0px' });
    revs.forEach(r => obs.observe(r));
    setTimeout(() => {
      revs.forEach(r => { if (r.getBoundingClientRect().top < innerHeight+100) r.classList.add('visible'); });
    }, 60);
  } else {
    revs.forEach(r => r.classList.add('visible'));
  }


  // ── SKILL BARS ──────────────────────────────────────────────
  function fireSkillBars(container) {
    container.querySelectorAll('.skill-bar').forEach((b, i) => {
      const w = b.dataset.w; if (!w) return;
      b.style.width = '0%';
      setTimeout(() => { b.style.width = w; }, 80 + i*40);
    });
  }
  const sobs = new IntersectionObserver(en => {
    en.forEach(e => { if (e.isIntersecting) { fireSkillBars(e.target); sobs.unobserve(e.target); } });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.skills-cols').forEach(g => {
    sobs.observe(g);
    setTimeout(() => { if (g.getBoundingClientRect().top < innerHeight) fireSkillBars(g); }, 300);
  });


  // ── PASSION BARS ────────────────────────────────────────────
  const pobs = new IntersectionObserver(en => {
    en.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.passion-fill').forEach(b => {
          const w = b.dataset.width; b.style.width='0%';
          setTimeout(() => { b.style.width = w; }, 150);
        });
        pobs.unobserve(e.target);
      }
    });
  }, { threshold: .2 });
  document.querySelectorAll('.passion-section').forEach(s => pobs.observe(s));


  // ── ACTIVE NAV HIGHLIGHT ────────────────────────────────────
  const secs  = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let c = '';
    secs.forEach(s => { if (scrollY >= s.offsetTop - 100) c = s.id; });
    navAs.forEach(a => {
      a.style.color = a.getAttribute('href') === '#'+c ? 'var(--blue)' : '';
    });
  }, { passive: true });


  // ── GALLERY — hide placeholder when image loads ──────────────
  document.querySelectorAll('.marquee-item img').forEach(img => {
    const ph = img.nextElementSibling; if (!ph) return;
    if (img.complete && img.naturalWidth > 0) { ph.style.display='none'; }
    else {
      img.addEventListener('load',  () => { ph.style.display='none'; });
      img.addEventListener('error', () => { img.style.display='none'; });
    }
  });

}); // end DOMContentLoaded


// ── VIEW MORE / LESS PROJECTS ─────────────────────────────────
let expanded = false;
function toggleProjects() {
  const extra = document.querySelectorAll('.extra-project');
  const btn   = document.getElementById('toggleBtn');
  expanded = !expanded;
  extra.forEach(el => { el.style.display = expanded ? 'flex' : 'none'; });
  btn.textContent = expanded ? 'View Less ↑' : 'View More ↓';
}


// ── UNIFIED LIGHTBOX ─────────────────────────────────────────
// Handles: local video (.mp4), YouTube embed, local image, certificate image

function openMedia(src, type) {
  const box     = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');

  if (type === 'youtube') {
    content.innerHTML = `<iframe src="${src}" frameborder="0"
      allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  } else if (type === 'video') {
    content.innerHTML = `<video src="${src}" controls autoplay></video>`;
  } else {
    // plain image
    content.innerHTML = `<img src="${src}" alt=""/>`;
  }

  box.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openCert(imgSrc) {
  // same as openMedia but always shows image
  const box = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');

content.innerHTML = `
  <div class="cert-wrapper">
    <img src="${imgSrc}" class="cert-image" />
  </div>
`;

  box.classList.add('active');
}

function closeMedia() {
  const box     = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');
  content.innerHTML = '';   // stops video/iframe playback
  box.classList.remove('active');
  document.body.style.overflow = '';
}

// Click backdrop to close (but not the content itself)
function handleLightboxClick(e) {
  if (e.target === document.getElementById('lightbox')) closeMedia();
}

// ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMedia();
});
