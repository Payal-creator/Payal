/**
 * PAYAL KUMARI — CINEMATIC SPACE FLEET TERMINAL
 * Palette: Neon Pink, Deep Void Black, Cosmic Purple, and Cyber Blue
 * Fully Optimized for Mobile Phones, Tablets & Touch Devices
 */

document.addEventListener('DOMContentLoaded', () => {
  initPinSystem();
  initAudioSystem();
  initStarfield();
  initTypingEffect();
  initNavbarScrollAndSpy();
  initMobileMenu();
  initProjectFilters();
  initProjectModals();
  initContactForm();
  initBackToTop();
  initYear();
  initStarfighterGame();
});

/* ============================================================
   PIN UNLOCK SYSTEM
   ============================================================ */
function initPinSystem() {
  const CORRECT_PIN = '0000';
  const overlay     = document.getElementById('pinOverlay');
  const modal       = overlay ? overlay.querySelector('.pin-modal') : null;
  const dots        = [0,1,2,3].map(i => document.getElementById('dot' + i));
  const errorEl     = document.getElementById('pinError');
  const cancelBtn   = document.getElementById('pinCancel');

  if (!overlay) return;

  let currentPin    = '';
  let pendingAction = null; // callback to run after correct PIN

  // Expose global function for locked buttons to call
  window.requestPin = function(callback) {
    pendingAction = callback;
    currentPin    = '';
    updateDots();
    errorEl.textContent = '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Handle all .locked-btn clicks via event delegation
  document.addEventListener('click', e => {
    const btn = e.target.closest('.locked-btn');
    if (!btn) return;
    e.preventDefault();

    const type = btn.dataset.unlock;
    window.requestPin(() => {
      if (type === 'phone') {
        // Replace button with real phone link
        const link = document.createElement('a');
        link.href      = 'tel:+918879839307';
        link.className = btn.className.replace('locked-btn','').replace('cursor-pointer','');
        link.innerHTML = btn.innerHTML.replace(/<i class="fa-solid fa-lock[^>]*><\/i>/g,'<i class="fa-solid fa-unlock" style="margin-right:4px"></i>');
        link.title     = 'Call Payal';
        // Show full number
        link.innerHTML = btn.innerHTML
          .replace(/\+91\s*[•·\u2022]+\d+/g, '+91 8879839307')
          .replace(/<i[^>]*fa-lock[^>]*><\/i>/g, '<i class="fa-solid fa-phone"></i>')
          .replace(/<span[^>]*click to reveal[^>]*>.*?<\/span>/gi, '');
        btn.replaceWith(link);

      } else if (type === 'cv-download') {
        // Trigger download
        const a = document.createElement('a');
        a.href     = btn.dataset.href || 'cvpayal.jpeg';
        a.download = btn.dataset.download || 'Payal_Kumari_CV.jpeg';
        a.target   = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // Update button to look unlocked
        const icon  = btn.dataset.icon || 'fa-file-arrow-down';
        const label = btn.dataset.label || 'DOWNLOAD CV';
        btn.innerHTML = `<i class="fa-solid ${icon}"></i> ${label}`;
        btn.classList.remove('locked-btn');
        btn.onclick = () => { const a2 = document.createElement('a'); a2.href = btn.dataset.href || 'cvpayal.jpeg'; a2.download = btn.dataset.download || 'Payal_Kumari_CV.jpeg'; a2.target='_blank'; document.body.appendChild(a2); a2.click(); document.body.removeChild(a2); };
      }
    });
  });

  // Shared PIN check logic
  function checkPin() {
    if (currentPin.length < 4) return;
    if (currentPin === CORRECT_PIN) {
      dots.forEach(d => { d.classList.remove('filled','error'); d.classList.add('filled'); });
      setTimeout(() => {
        const action = pendingAction; // ← save BEFORE closeModal nulls it
        closeModal();
        if (action) action();
      }, 300);
    } else {
      dots.forEach(d => { d.classList.remove('filled'); d.classList.add('error'); });
      errorEl.textContent = '✕ INCORRECT PIN — ACCESS DENIED';
      modal.classList.add('shake');
      modal.addEventListener('animationend', () => modal.classList.remove('shake'), { once: true });
      setTimeout(() => {
        currentPin = '';
        updateDots();
        dots.forEach(d => d.classList.remove('error'));
        errorEl.textContent = '';
      }, 900);
    }
  }

  // Keypad clicks
  overlay.querySelectorAll('.pin-key').forEach(btn => {
    btn.addEventListener('click', () => {
      const val    = btn.dataset.val;
      const action = btn.dataset.action;

      if (action === 'clear') {
        currentPin = '';
      } else if (action === 'del') {
        currentPin = currentPin.slice(0, -1);
      } else if (val !== undefined && currentPin.length < 4) {
        currentPin += val;
      }

      updateDots();
      errorEl.textContent = '';
      checkPin();
    });
  });

  // Cancel
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
  }

  // Click backdrop to cancel
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  // Keyboard support
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('active')) return;
    if (e.key >= '0' && e.key <= '9') {
      if (currentPin.length < 4) {
        currentPin += e.key;
        updateDots();
        checkPin();
      }
    } else if (e.key === 'Backspace') {
      currentPin = currentPin.slice(0, -1);
      updateDots();
    } else if (e.key === 'Escape') {
      closeModal();
    }
  });

  function updateDots() {
    dots.forEach((d, i) => {
      d.classList.remove('filled', 'error');
      if (i < currentPin.length) d.classList.add('filled');
    });
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    currentPin    = '';
    pendingAction = null;
    updateDots();
    errorEl.textContent = '';
  }
}

/* --------------------------------------------------------------------------
   1. WEB AUDIO API SCI-FI SOUND SYNTHESIZER
   -------------------------------------------------------------------------- */
let audioCtx = null;
let soundEnabled = true;

function initAudioSystem() {
  const toggleBtn = document.getElementById('audioToggleBtn');
  const audioIcon = document.getElementById('audioIcon');
  const audioText = document.getElementById('audioText');

  function ensureAudioCtx() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  toggleBtn?.addEventListener('click', () => {
    ensureAudioCtx();
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      audioIcon.className = 'fa-solid fa-volume-high';
      audioText.textContent = 'SFX: ON';
      playBeepSound(800, 0.05);
    } else {
      audioIcon.className = 'fa-solid fa-volume-xmark';
      audioText.textContent = 'SFX: OFF';
    }
  });

  window.addEventListener('click', ensureAudioCtx, { once: true });
  window.addEventListener('touchstart', ensureAudioCtx, { once: true, passive: true });
  window.addEventListener('keydown', ensureAudioCtx, { once: true });
}

function playBeepSound(freq = 600, duration = 0.08) {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

function playLaserSound() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(920, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  } catch (e) {}
}

function playExplosionSound() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const bufferSize = audioCtx.sampleRate * 0.25;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, audioCtx.currentTime);
    filter.frequency.linearRampToValueAtTime(40, audioCtx.currentTime + 0.25);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    whiteNoise.start();
  } catch (e) {}
}

function playWarpSound() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(130, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1500, audioCtx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.16, audioCtx.currentTime + 0.15);
    gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
  } catch (e) {}
}

/* --------------------------------------------------------------------------
   2. 3D INTERACTIVE CANVAS STARFIELD
   -------------------------------------------------------------------------- */
let isWarpSpeed = false;

function initStarfield() {
  const canvas = document.getElementById('starfieldCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const isMobile = window.innerWidth < 768;
  const numStars = isMobile ? 220 : 400;
  const stars = [];

  for (let i = 0; i < numStars; i++) {
    const rand = Math.random();
    const color = rand > 0.75 ? '#ff2a85' : rand > 0.5 ? '#00d2ff' : rand > 0.25 ? '#9d4edd' : '#ffffff';
    stars.push({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
      pz: 0,
      color: color
    });
    stars[i].pz = stars[i].z;
  }

  let baseSpeed = 1.1;

  function render() {
    ctx.fillStyle = '#040208';
    ctx.fillRect(0, 0, width, height);

    const speed = isWarpSpeed ? 26 : baseSpeed;
    const cx = width / 2;
    const cy = height / 2;

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.z -= speed;

      if (star.z <= 0) {
        star.z = width;
        star.pz = width;
        star.x = (Math.random() - 0.5) * width * 2;
        star.y = (Math.random() - 0.5) * height * 2;
      }

      const k = 250 / star.z;
      const px = star.x * k + cx;
      const py = star.y * k + cy;

      const pk = 250 / star.pz;
      const prevX = star.x * pk + cx;
      const prevY = star.y * pk + cy;

      star.pz = star.z;

      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        const size = Math.max(0.8, (1 - star.z / width) * (isWarpSpeed ? 2 : 2.5));

        ctx.strokeStyle = star.color;
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

function triggerWarp() {
  isWarpSpeed = true;
  playWarpSound();
  setTimeout(() => {
    isWarpSpeed = false;
  }, 450);
}

/* --------------------------------------------------------------------------
   3. HERO TYPING EFFECT
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    'Full-Stack & MERN Developer',
    'Python & FastAPI Architect',
    'Automation & Webhook Specialist',
    'B.Tech Computer Science (LPU)'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 90;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      typingElement.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      speed = 40;
    } else {
      typingElement.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      speed = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 450;
    }

    setTimeout(type, speed);
  }

  type();
}

/* --------------------------------------------------------------------------
   4. NAVBAR SCROLL, ACTIVE SPY & WARP ON CLICK
   -------------------------------------------------------------------------- */
function initNavbarScrollAndSpy() {
  const allNavLinks = document.querySelectorAll('.nav-link, .ribbon-link');
  const sections = document.querySelectorAll('section[id]');

  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      triggerWarp();
      playBeepSound(700, 0.06);
    });
  });

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 180;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        allNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   5. MOBILE COCKPIT MENU DRAWER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navMenu) return;

  function toggleMenu() {
    const isOpen = navToggle.classList.contains('open');
    if (!isOpen) {
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      playBeepSound(650, 0.05);
    } else {
      closeMenu();
    }
  }

  function closeMenu() {
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  drawerCloseBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
    playBeepSound(500, 0.05);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close when clicking outside of menu
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   6. EXPEDITIONS FILTERING
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.hud-filter-btn');
  const cards = document.querySelectorAll('.expedition-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playBeepSound(650, 0.06);
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. PROJECT INTEL MODAL DATA & VIEWER
   -------------------------------------------------------------------------- */
const missionDatabase = {
  messbee: {
    sector: 'SECTOR: PYTHON & FASTAPI AUTOMATION',
    title: 'MessBee SaaS — Automation & Webhook Engine',
    overview: 'Engineered as part of Payal Kumari\'s Software Engineering internship at AAS Tech Solutions. Solves critical webhook dispatching delays, non-blocking asynchronous payload processing, and administrative security controls.',
    highlights: [
      'Resolved end-to-end API and webhook defects per sprint across MessBee automation workflows using Python & FastAPI.',
      'Constructed responsive administrative dashboards and client-side interfaces in React.js to streamline navigation and runtime page performance.',
      'Implemented token-based authentication and role-based access control (RBAC) to protect customer data and sensitive application routes.',
      'Designed manual functional test cases across endpoints and user journeys to eliminate regressions prior to production release.'
    ],
    tech: ['Python', 'FastAPI', 'Webhooks', 'React.js', 'SQL', 'RBAC', 'RESTful APIs'],
    codeSnippet: 'async def dispatch_webhook(event: WebhookEvent):\n    await verify_jwt_token(event.token)\n    return await queue_worker.enqueue(event.payload)'
  },
  novastore: {
    sector: 'SECTOR: MERN FULL-STACK ARCHITECTURE',
    title: 'NovaStore — MERN E-Commerce Platform',
    overview: 'Full-stack online shopping architecture engineered with React frontend, Node/Express RESTful APIs, and MongoDB database storage with token-secured access controls.',
    highlights: [
      'Implemented full authentication lifecycle with JWT tokens, refresh rotation, and protected administrator routes.',
      'Engineered dynamic product filtering with price range sliders, category tags, and real-time inventory count.',
      'Structured MongoDB schemas with Mongoose ODM for optimized relational querying between users, carts, and order items.',
      'Developed responsive client checkout interface with client-side form validation.'
    ],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'REST API', 'Tailwind'],
    codeSnippet: 'const Order = mongoose.model("Order", new Schema({\n  buyerId: { type: ObjectId, ref: "User" },\n  items: [OrderItemSchema],\n  status: { type: String, default: "CONFIRMED" }\n}));'
  },
  pulsemetrics: {
    sector: 'SECTOR: REACT & DATA VISUALIZATION',
    title: 'PulseMetrics — Realtime Telemetry Command',
    overview: 'High-velocity administrative dashboard delivering live data telemetry, customizable KPI cards, chart drilldowns, and automated PDF export reports.',
    highlights: [
      'Engineered interactive data charts using Chart.js with custom glowing neon gradient fills and responsive resize observers.',
      'Optimized client-side memory footprint by pooling incoming telemetry data streams and preventing redundant re-renders.',
      'Created granular timeframe filters (24H, 7D, 30D, Year-to-Date) with smooth animated data transitions.',
      'Built fully responsive layouts tailored for desktop cockpits and mobile viewports.'
    ],
    tech: ['React.js', 'JavaScript (ES6+)', 'Chart.js', 'CSS Custom Properties', 'REST APIs'],
    codeSnippet: 'const TelemetryStream = ({ dataPoints }) => {\n  return <Chart options={neonThemeOptions} data={dataPoints} />;\n};'
  },
  ledgerguard: {
    sector: 'SECTOR: BANKING OPERATIONS & SQL AUDIT',
    title: 'LedgerGuard — SQL Audit & Balance Reconciler',
    overview: 'Inspired by Payal Kumari\'s Technical Operations experience at ICICI Bank. Automatically audits daily transaction records, isolates balance exceptions, and produces compliance reports.',
    highlights: [
      'Executed structured SQL queries to extract multi-branch transaction data and verify balance parity.',
      'Designed exception logging mechanisms to catch mismatching entries and escalate to banking resolution workflows.',
      'Built standard operating procedures and documentation for consistent reconciliation reporting steps.',
      'Utilized Python and Pandas for data cleaning and balance variance reporting.'
    ],
    tech: ['Structured SQL', 'Python', 'Pandas', 'Data Validation', 'Exception Handling', 'QA Testing'],
    codeSnippet: 'SELECT branch_id, SUM(credit) - SUM(debit) AS variance\nFROM transaction_ledger\nGROUP BY branch_id\nHAVING variance <> 0;'
  }
};

function initProjectModals() {
  const overlay = document.getElementById('projectModal');
  const content = document.getElementById('modalContent');
  const closeBtn = document.getElementById('modalCloseBtn');
  const buttons = document.querySelectorAll('.open-project-modal');

  if (!overlay || !content) return;

  function open(id) {
    const data = missionDatabase[id];
    if (!data) return;
    playBeepSound(900, 0.07);

    content.innerHTML = `
      <span class="modal-badge">${data.sector}</span>
      <h3 class="modal-title">${data.title}</h3>
      <p class="modal-overview">${data.overview}</p>

      <h4 class="modal-section-title">MISSION HIGHLIGHTS</h4>
      <ul class="modal-highlights">
        ${data.highlights.map(h => `<li><i class="fa-solid fa-angle-right"></i> <span>${h}</span></li>`).join('')}
      </ul>

      <h4 class="modal-section-title">VERIFIED ARSENAL</h4>
      <div class="modal-tech">
        ${data.tech.map(t => `<span class="plasma-tag">${t}</span>`).join('')}
      </div>

      <h4 class="modal-section-title">CODE SCHEMATIC</h4>
      <pre class="terminal-code"><code>${data.codeSnippet}</code></pre>

      <div class="modal-actions" style="margin-top: 20px;">
        <a href="https://github.com/Payal-creator" target="_blank" rel="noopener noreferrer" class="btn btn-hud-primary btn-sm">
          <i class="fa-brands fa-github"></i> GITHUB FLEET
        </a>
        <a href="#contact" class="btn btn-hud-outline btn-sm" onclick="document.getElementById('projectModal').classList.remove('active'); document.body.style.overflow = '';">
          <i class="fa-solid fa-envelope"></i> TRANSMIT INQUIRY
        </a>
      </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    playBeepSound(400, 0.05);
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project-id');
      open(id);
    });
  });

  closeBtn?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) close();
  });
}

/* --------------------------------------------------------------------------
   8. CONTACT TRANSMISSION PROTOCOL
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const subjectInput = document.getElementById('userSubject');
  const messageInput = document.getElementById('userMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');
  const submitBtn = document.getElementById('submitBtn');

  [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
    inp?.addEventListener('input', () => {
      const err = document.getElementById(`${inp.name}Error`);
      if (err) err.textContent = '';
      inp.style.borderColor = '';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameError.textContent = 'CALLSIGN REQUIRED: Enter at least 2 characters.';
      nameInput.style.borderColor = '#ff2a85';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = 'INVALID FREQUENCY: Enter a valid return email address.';
      emailInput.style.borderColor = '#ff2a85';
      isValid = false;
    }

    if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
      subjectError.textContent = 'DIRECTIVE REQUIRED: Enter at least 3 characters.';
      subjectInput.style.borderColor = '#ff2a85';
      isValid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 8) {
      messageError.textContent = 'PAYLOAD TOO SHORT: Enter at least 8 characters.';
      messageInput.style.borderColor = '#ff2a85';
      isValid = false;
    }

    if (!isValid) {
      playBeepSound(250, 0.15);
      return;
    }

    playLaserSound();
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-satellite-dish fa-spin"></i> TRANSMITTING...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      playExplosionSound();
      showToast('TRANSMISSION SUCCESSFUL! Directive received by Payal Kumari. Expect acknowledgment shortly.');
    }, 1200);
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-satellite-dish toast-icon"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(16px)';
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

/* --------------------------------------------------------------------------
   9. BACK TO TOP
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  btn?.addEventListener('click', () => {
    triggerWarp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initYear() {
  const yearElem = document.getElementById('currentYear');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   10. STARSHIP FLIGHT ARCADE MINI-GAME (TOUCH & MOBILE SUPPORT)
   -------------------------------------------------------------------------- */
function initStarfighterGame() {
  const overlay = document.getElementById('gameOverlay');
  const launchBtn = document.getElementById('launchGameBtn');
  const heroPlayBtn = document.getElementById('heroPlayBtn');
  const exitBtn = document.getElementById('exitGameBtn');
  const mobileFireBtn = document.getElementById('mobileFireBtn');
  const canvas = document.getElementById('gameCanvas');
  const scoreElem = document.getElementById('gameScore');
  const destroyedElem = document.getElementById('gameDestroyed');
  const healthElem = document.getElementById('gameHealth');

  if (!overlay || !canvas) return;
  const ctx = canvas.getContext('2d');

  let animationFrameId = null;
  let isGameRunning = false;
  let score = 0;
  let destroyed = 0;
  let hullHealth = 100;

  // Ship position
  let ship = {
    x: window.innerWidth / 2,
    y: window.innerHeight - 150,
    width: 36,
    height: 42,
    speed: 7
  };

  const lasers = [];
  const asteroids = [];
  const particles = [];
  const keys = {};

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function startGame() {
    isGameRunning = true;
    score = 0;
    destroyed = 0;
    hullHealth = 100;
    scoreElem.textContent = '0';
    destroyedElem.textContent = '0';
    healthElem.textContent = '100%';

    resizeCanvas();
    ship.x = canvas.width / 2;
    ship.y = canvas.height - (window.innerWidth < 768 ? 160 : 130);

    lasers.length = 0;
    asteroids.length = 0;
    particles.length = 0;

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    playWarpSound();
    loop();
  }

  function stopGame() {
    isGameRunning = false;
    cancelAnimationFrame(animationFrameId);
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    playBeepSound(400, 0.08);
  }

  launchBtn?.addEventListener('click', startGame);
  heroPlayBtn?.addEventListener('click', startGame);
  exitBtn?.addEventListener('click', stopGame);

  // Keyboard controls
  window.addEventListener('keydown', (e) => {
    if ((e.key === 'g' || e.key === 'G') && !isGameRunning && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      startGame();
    } else if (e.key === 'Escape' && isGameRunning) {
      stopGame();
    }
    keys[e.key.toLowerCase()] = true;

    if (isGameRunning && (e.key === ' ' || e.key === 'Spacebar')) {
      e.preventDefault();
      fireLaser();
    }
  });

  window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
  });

  // Desktop Mouse move
  window.addEventListener('mousemove', (e) => {
    if (isGameRunning) {
      ship.x = e.clientX;
      ship.y = Math.max(80, Math.min(canvas.height - 40, e.clientY));
    }
  });

  canvas.addEventListener('click', () => {
    if (isGameRunning) {
      fireLaser();
    }
  });

  // --- MOBILE & TABLET TOUCH SUPPORT ---
  function handleTouchMove(e) {
    if (!isGameRunning || !e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    ship.x = touch.clientX;
    ship.y = Math.max(80, Math.min(canvas.height - 80, touch.clientY));
  }

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleTouchMove(e);
  }, { passive: false });

  canvas.addEventListener('touchstart', (e) => {
    if (isGameRunning) {
      handleTouchMove(e);
      fireLaser();
    }
  }, { passive: true });

  mobileFireBtn?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isGameRunning) {
      fireLaser();
    }
  }, { passive: false });

  mobileFireBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isGameRunning) {
      fireLaser();
    }
  });

  function fireLaser() {
    playLaserSound();
    lasers.push({
      x: ship.x - 14,
      y: ship.y - 18,
      speed: 16,
      color: '#ff2a85'
    });
    lasers.push({
      x: ship.x + 14,
      y: ship.y - 18,
      speed: 16,
      color: '#00d2ff'
    });
  }

  function spawnAsteroid() {
    if (Math.random() < 0.04) {
      const radius = Math.random() * 18 + 12;
      const numVerts = Math.floor(Math.random() * 5) + 7; // 7-11 vertices
      const verts = [];
      for (let i = 0; i < numVerts; i++) {
        const angle = (i / numVerts) * Math.PI * 2;
        // Jagged radius — between 55% and 100% of radius
        const r = radius * (0.55 + Math.random() * 0.45);
        verts.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
      }
      // Random crater positions
      const craters = [];
      const numCraters = Math.floor(Math.random() * 3) + 1;
      for (let c = 0; c < numCraters; c++) {
        const cr = radius * (0.12 + Math.random() * 0.2);
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * (radius * 0.45);
        craters.push({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, r: cr });
      }
      asteroids.push({
        x: Math.random() * (canvas.width - 60) + 30,
        y: -40,
        radius,
        verts,
        craters,
        speed: Math.random() * 2.5 + 1.5,
        vx: (Math.random() - 0.5) * 1.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025,
        color: Math.random() > 0.5 ? '#9d4edd' : '#ff2a85'
      });
    }
  }

  function createExplosion(x, y) {
    playExplosionSound();
    const colors = ['#ff2a85', '#9d4edd', '#00d2ff', '#ffffff'];
    for (let i = 0; i < 18; i++) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 9,
        vy: (Math.random() - 0.5) * 9,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function loop() {
    if (!isGameRunning) return;

    if (keys['arrowleft'] || keys['a']) ship.x -= ship.speed;
    if (keys['arrowright'] || keys['d']) ship.x += ship.speed;
    if (keys['arrowup'] || keys['w']) ship.y -= ship.speed;
    if (keys['arrowdown'] || keys['s']) ship.y += ship.speed;

    ship.x = Math.max(22, Math.min(canvas.width - 22, ship.x));
    ship.y = Math.max(60, Math.min(canvas.height - 40, ship.y));

    // Deep black trail
    ctx.fillStyle = 'rgba(4, 2, 8, 0.35)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    spawnAsteroid();

    // Draw dual lasers
    for (let i = lasers.length - 1; i >= 0; i--) {
      const l = lasers[i];
      l.y -= l.speed;
      ctx.fillStyle = l.color;
      ctx.shadowColor = l.color;
      ctx.shadowBlur = 10;
      ctx.fillRect(l.x - 2, l.y, 4, 15);

      if (l.y < -20) {
        lasers.splice(i, 1);
      }
    }
    ctx.shadowBlur = 0;

    // Draw Asteroids
    for (let i = asteroids.length - 1; i >= 0; i--) {
      const a = asteroids[i];
      a.y += a.speed;
      a.x += a.vx;
      a.rotation += a.rotSpeed;

      ctx.save();
      ctx.translate(a.x, a.y);
      ctx.rotate(a.rotation);

      // Rocky fill gradient
      const grad = ctx.createRadialGradient(-a.radius * 0.3, -a.radius * 0.3, 0, 0, 0, a.radius);
      grad.addColorStop(0, '#2a1a3a');
      grad.addColorStop(0.5, '#150d20');
      grad.addColorStop(1, '#08040e');

      // Draw jagged polygon body
      ctx.beginPath();
      ctx.moveTo(a.verts[0].x, a.verts[0].y);
      for (let v = 1; v < a.verts.length; v++) {
        ctx.lineTo(a.verts[v].x, a.verts[v].y);
      }
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Glowing neon border
      ctx.strokeStyle = a.color;
      ctx.lineWidth = 1.8;
      ctx.shadowColor = a.color;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner highlight line (rock surface)
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(a.verts[0].x * 0.6, a.verts[0].y * 0.6);
      for (let v = 1; v < a.verts.length; v++) {
        ctx.lineTo(a.verts[v].x * 0.6, a.verts[v].y * 0.6);
      }
      ctx.closePath();
      ctx.stroke();

      // Draw craters
      for (const c of a.craters) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(157,78,221,0.35)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.fill();
      }

      ctx.restore();

      // Check laser collision
      for (let j = lasers.length - 1; j >= 0; j--) {
        const l = lasers[j];
        const dist = Math.hypot(l.x - a.x, l.y - a.y);
        if (dist < a.radius + 8) {
          createExplosion(a.x, a.y);
          asteroids.splice(i, 1);
          lasers.splice(j, 1);
          score += 150;
          destroyed += 1;
          scoreElem.textContent = score;
          destroyedElem.textContent = destroyed;
          break;
        }
      }

      // Check collision with ship
      const shipDist = Math.hypot(ship.x - a.x, ship.y - a.y);
      if (shipDist < a.radius + 18) {
        createExplosion(ship.x, ship.y);
        asteroids.splice(i, 1);
        hullHealth -= 20;
        healthElem.textContent = `${Math.max(0, hullHealth)}%`;
        if (hullHealth <= 0) {
          healthElem.textContent = 'HULL BREACH!';
          showToast('SHIP DAMAGED: Re-routing emergency power to shields!');
          hullHealth = 100;
        }
      }

      if (a.y > canvas.height + 50) {
        asteroids.splice(i, 1);
      }
    }

    // Draw Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.038;

      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }

    // Draw Starship
    drawStarship(ctx, ship.x, ship.y);

    animationFrameId = requestAnimationFrame(loop);
  }

  function drawStarship(ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);

    // Engine thruster flame
    const flameHeight = Math.random() * 14 + 14;
    ctx.fillStyle = 'rgba(255, 42, 133, 0.85)';
    ctx.shadowColor = '#ff2a85';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.moveTo(-7, 14);
    ctx.lineTo(0, 14 + flameHeight);
    ctx.lineTo(7, 14);
    ctx.closePath();
    ctx.fill();

    // Hot Blue core
    ctx.fillStyle = '#00d2ff';
    ctx.shadowColor = '#00d2ff';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(-3, 14);
    ctx.lineTo(0, 14 + flameHeight * 0.65);
    ctx.lineTo(3, 14);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // Ship Hull
    ctx.fillStyle = '#090514';
    ctx.strokeStyle = '#00d2ff';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, -24); // Nose
    ctx.lineTo(17, 12);  // Right wing tip
    ctx.lineTo(7, 10);
    ctx.lineTo(0, 14);   // Tail
    ctx.lineTo(-7, 10);
    ctx.lineTo(-17, 12); // Left wing tip
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Wing highlights
    ctx.strokeStyle = '#ff2a85';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-17, 12);
    ctx.lineTo(-5, -4);
    ctx.moveTo(17, 12);
    ctx.lineTo(5, -4);
    ctx.stroke();

    // Cockpit Canopy Glass
    ctx.fillStyle = '#ff2a85';
    ctx.shadowColor = '#ff2a85';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.ellipse(0, -5, 4, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();
  }
}
