document.addEventListener("DOMContentLoaded", () => {
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;

  /* 0. Starfield Canvas — Stars, Shooting Stars & Constellations */
  const canvas = document.getElementById("starfield");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let stars = [];
    let shootingStars = [];
    let constellations = [];
    let animFrame;

    // ── Resize ──────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // ── Star colours ─────────────────────────────────────────────────────
    const starColor = () =>
      Math.random() > 0.85 ? [180, 160, 255] :   // nebula purple
      Math.random() > 0.6  ? [140, 210, 255] :    // ice blue
                              [220, 235, 255];      // white starlight

    // ── Parallax mouse offset ─────────────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    let targetMX = 0, targetMY = 0;
    window.addEventListener("mousemove", (e) => {
      targetMX = (e.clientX / window.innerWidth  - 0.5) * 2; // -1 to 1
      targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // ── Init background stars — 3 depth layers ───────────────────────────
    const initStars = () => {
      stars = [];
      // Kurangi density: /3200 → /5500, max cap 280 bintang
      const count = Math.min(280, Math.floor((canvas.width * canvas.height) / 5500));
      for (let i = 0; i < count; i++) {
        const [r, g, b] = starColor();
        const depth = Math.random() > 0.7 ? 2 : Math.random() > 0.4 ? 1 : 0;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: depth === 2 ? Math.random() * 1.3 + 0.8
           : depth === 1 ? Math.random() * 0.9 + 0.4
           :               Math.random() * 0.5 + 0.15,
          alpha: Math.random() * 0.6 + 0.25,
          twinkleSpeed: Math.random() * 0.010 + 0.002,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          cr: r, cg: g, cb: b,
          depth,
          // Pre-cache glow threshold: only top ~30% get glow
          hasGlow: Math.random() > 0.7,
        });
      }
    };

    // ── Draw background stars (with parallax) ────────────────────────────
    const drawStars = () => {
      // Lerp hanya jika ada pergerakan berarti, skip jika sudah dekat
      const dx = targetMX - mouseX, dy = targetMY - mouseY;
      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        mouseX += dx * 0.04;
        mouseY += dy * 0.04;
      }

      const PARALLAX = [10, 22, 40];

      stars.forEach((s) => {
        s.alpha += s.twinkleSpeed * s.twinkleDir;
        if (s.alpha > 0.95 || s.alpha < 0.07) s.twinkleDir *= -1;

        const px = s.x + mouseX * PARALLAX[s.depth];
        const py = s.y + mouseY * PARALLAX[s.depth];

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.cr},${s.cg},${s.cb},${s.alpha.toFixed(2)})`;
        ctx.fill();

        // Glow hanya untuk bintang yang sudah dipilih saat init, skip createRadialGradient tiap frame
        if (s.hasGlow && s.r > 0.85) {
          ctx.beginPath();
          ctx.arc(px, py, s.r * 3.5, 0, Math.PI * 2);
          // Pakai fillStyle sederhana alih-alih radialGradient
          ctx.fillStyle = `rgba(${s.cr},${s.cg},${s.cb},${(s.alpha * 0.12).toFixed(2)})`;
          ctx.fill();
        }
      });
    };

    // ── Shooting Stars ────────────────────────────────────────────────────
    const spawnShootingStar = () => {
      // start from random point along top / right edge
      const fromTop = Math.random() > 0.35;
      const x = fromTop ? Math.random() * canvas.width : canvas.width + 20;
      const y = fromTop ? -20 : Math.random() * canvas.height * 0.5;
      const angle = (Math.PI / 180) * (Math.random() * 30 + 25); // 25–55°
      const speed = Math.random() * 14 + 10;
      const length = Math.random() * 180 + 80;
      const life   = length / speed;   // frames to cross its own tail

      shootingStars.push({
        x, y,
        vx:  Math.cos(angle) * speed,
        vy:  Math.sin(angle) * speed,
        length,
        alpha: 1,
        decay: 1 / (life * 1.4),
        width: Math.random() * 1.4 + 0.6,
      });
    };

    // spawn a shooting star every 2.5–5.5 s
    let shootTimer = 0;
    let nextShoot  = 180;

    const drawShootingStars = () => {
      shootTimer++;
      if (shootTimer >= nextShoot) {
        spawnShootingStar();
        shootTimer  = 0;
        nextShoot   = Math.random() * 180 + 150; // ~2.5–5.5 s at 60fps
      }

      shootingStars = shootingStars.filter((s) => s.alpha > 0.01);
      shootingStars.forEach((s) => {
        const tailX = s.x - Math.cos(Math.atan2(s.vy, s.vx)) * s.length;
        const tailY = s.y - Math.sin(Math.atan2(s.vy, s.vx)) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(200,235,255,0)`);
        grad.addColorStop(0.6, `rgba(180,220,255,${(s.alpha * 0.4).toFixed(2)})`);
        grad.addColorStop(1, `rgba(220,240,255,${s.alpha.toFixed(2)})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = s.width;
        ctx.lineCap     = "round";
        ctx.stroke();

        // tiny bright head
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,248,255,${s.alpha.toFixed(2)})`;
        ctx.fill();

        s.x     += s.vx;
        s.y     += s.vy;
        s.alpha -= s.decay;
      });
    };

    // ── Constellations ────────────────────────────────────────────────────
    // Each constellation is a set of named star positions (normalised 0–1)
    // plus the edges that connect them.
    const CONSTELLATION_DEFS = [
      {
        name: "Orion",
        nodes: [
          [0.12, 0.10], [0.20, 0.18], [0.16, 0.28],  // belt
          [0.08, 0.36], [0.24, 0.36],                 // legs
          [0.10, 0.06], [0.22, 0.04],                 // shoulders
          [0.16, 0.00],                               // head
        ],
        edges: [[0,1],[1,2],[2,3],[2,4],[0,5],[1,6],[5,7],[6,7]],
      },
      {
        name: "Big Dipper",
        nodes: [
          [0.00, 0.22],[0.06, 0.14],[0.14, 0.08],[0.22, 0.14],  // bowl
          [0.30, 0.20],[0.40, 0.14],[0.50, 0.06],               // handle
        ],
        edges: [[0,1],[1,2],[2,3],[3,0],[3,4],[4,5],[5,6]],
      },
      {
        name: "Cassiopeia",
        nodes: [
          [0.00,0.12],[0.10,0.00],[0.20,0.10],[0.30,0.00],[0.40,0.10],
        ],
        edges: [[0,1],[1,2],[2,3],[3,4]],
      },
      {
        name: "Scorpius",
        nodes: [
          [0.05,0.00],[0.14,0.06],[0.20,0.14],[0.18,0.24],
          [0.12,0.32],[0.10,0.42],[0.16,0.50],[0.24,0.46],
        ],
        edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]],
      },
      {
        name: "Leo",
        nodes: [
          [0.00,0.18],[0.08,0.08],[0.18,0.04],[0.26,0.10],
          [0.28,0.20],[0.20,0.26],[0.08,0.26],
        ],
        edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],[3,5]],
      },
    ];

    const placeConstellations = () => {
      constellations = [];
      const margin = 60;
      const W = canvas.width  - margin * 2;
      const H = canvas.height - margin * 2;
      const scale = Math.min(canvas.width, canvas.height) * 0.28;

      // Hanya ambil 3 dari 5 rasi — lebih ringan, tetap berasa
      const activeDefs = CONSTELLATION_DEFS.slice(0, 3);

      activeDefs.forEach((def) => {
        const ox = margin + Math.random() * (W - scale * 0.55);
        const oy = margin + Math.random() * (H - scale * 0.55);

        const resolvedNodes = def.nodes.map(([nx, ny]) => ({
          x: ox + nx * scale,
          y: oy + ny * scale,
          alpha: 0,
          twinkleSpeed: Math.random() * 0.008 + 0.002,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          r: Math.random() * 1.0 + 0.8,
        }));

        constellations.push({
          ...def,
          nodes: resolvedNodes,
          lineAlpha: 0,
          fadeDir: 1,
          fadeSpeed: 0.0008 + Math.random() * 0.0006,
          maxAlpha: 0.25 + Math.random() * 0.2,
          maxNodeAlpha: 0.7 + Math.random() * 0.25,
          delay: Math.floor(Math.random() * 300),
          age: 0,
          lifetime: 1800 + Math.floor(Math.random() * 1200),
        });
      });
    };

    const drawConstellations = () => {
      constellations.forEach((c, ci) => {
        c.age++;
        if (c.age < c.delay) return;

        const lifeAge = c.age - c.delay;

        // fade in → hold → fade out → reposition
        if (lifeAge < 300) {
          c.lineAlpha = Math.min(c.maxAlpha, c.lineAlpha + c.fadeSpeed * 1.5);
          c.nodes.forEach((n) => {
            n.alpha = Math.min(c.maxNodeAlpha, n.alpha + c.fadeSpeed * 3);
          });
        } else if (lifeAge > c.lifetime - 300) {
          c.lineAlpha = Math.max(0, c.lineAlpha - c.fadeSpeed * 1.5);
          c.nodes.forEach((n) => {
            n.alpha = Math.max(0, n.alpha - c.fadeSpeed * 3);
          });
          if (c.lineAlpha <= 0) {
            // reposition this constellation
            const margin  = 60;
            const W = canvas.width  - margin * 2;
            const H = canvas.height - margin * 2;
            const scale   = Math.min(canvas.width, canvas.height) * 0.28;
            const def     = CONSTELLATION_DEFS[ci % CONSTELLATION_DEFS.length];
            const ox = margin + Math.random() * (W - scale * 0.55);
            const oy = margin + Math.random() * (H - scale * 0.55);
            c.nodes = def.nodes.map(([nx, ny]) => ({
              x: ox + nx * scale, y: oy + ny * scale,
              alpha: 0, twinkleSpeed: Math.random() * 0.008 + 0.002,
              twinkleDir: Math.random() > 0.5 ? 1 : -1, r: Math.random() * 1 + 0.8,
            }));
            c.lineAlpha = 0;
            c.age = 0;
            c.delay = Math.floor(Math.random() * 300);
            c.lifetime = 1800 + Math.floor(Math.random() * 1200);
          }
        }

        // draw edges
        if (c.lineAlpha > 0.005) {
          c.edges.forEach(([a, b]) => {
            const na = c.nodes[a], nb = c.nodes[b];
            const grad = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
            grad.addColorStop(0, `rgba(140,210,255,${c.lineAlpha.toFixed(3)})`);
            grad.addColorStop(1, `rgba(180,160,255,${c.lineAlpha.toFixed(3)})`);
            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth   = 0.7;
            ctx.stroke();
          });
        }

        // draw nodes (constellation stars — slightly brighter)
        c.nodes.forEach((n, ni) => {
          n.alpha += n.twinkleSpeed * n.twinkleDir;
          // Pakai ni===0 alih-alih indexOf (O(1) vs O(n))
          const maxA = ni === 0 ? c.maxNodeAlpha : c.maxNodeAlpha * 0.85;
          if (n.alpha > maxA || n.alpha < 0.05) n.twinkleDir *= -1;

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,230,255,${n.alpha.toFixed(3)})`;
          ctx.fill();

          // Glow: simple flat circle, skip createRadialGradient
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160,200,255,${(n.alpha * 0.1).toFixed(3)})`;
          ctx.fill();
        });
      });
    };

    // ── Main loop ─────────────────────────────────────────────────────────
    // Gunakan visibility API untuk pause saat tab hidden
    let isVisible = !document.hidden;
    document.addEventListener("visibilitychange", () => {
      isVisible = !document.hidden;
      if (isVisible && !animFrame) loop();
    });

    const loop = () => {
      if (!isVisible) { animFrame = null; return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStars();
      drawConstellations();
      drawShootingStars();

      // ── Meteor burst (click) ──────────────────────────────────────────
      if (window._meteorBurst && window._meteorBurst.length) {
        window._meteorBurst = window._meteorBurst.filter((s) => s.alpha > 0.01);
        window._meteorBurst.forEach((s) => {
          const tailX = s.x - Math.cos(Math.atan2(s.vy, s.vx)) * s.length * s.alpha;
          const tailY = s.y - Math.sin(Math.atan2(s.vy, s.vx)) * s.length * s.alpha;
          const grad  = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          grad.addColorStop(0, `rgba(180,220,255,0)`);
          grad.addColorStop(1, `rgba(220,240,255,${s.alpha.toFixed(2)})`);
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = s.width;
          ctx.lineCap = "round";
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.width * 1.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240,250,255,${s.alpha.toFixed(2)})`;
          ctx.fill();
          s.x += s.vx; s.y += s.vy; s.alpha -= s.decay;
        });
      }

      animFrame = requestAnimationFrame(loop);
    };

    resize();
    initStars();
    placeConstellations();
    loop();

    // Throttle resize — jangan reinit tiap pixel resize
    let resizeTimer;
    window.addEventListener("resize", () => {
      cancelAnimationFrame(animFrame);
      animFrame = null;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        initStars();
        placeConstellations();
        loop();
      }, 200);
    });
  }

  /* 1. Preloader */
  const preloader = document.getElementById("preloader");
  const hidePreloader = () => {
    if (!preloader) return;
    preloader.classList.add("done");
    document.body.style.overflow = "";
  };
  document.body.style.overflow = "hidden";
  window.addEventListener("load", () => setTimeout(hidePreloader, 600));
  setTimeout(hidePreloader, 2600); // fallback

  /* 2. Scroll progress bar */
  const progressBar = document.getElementById("scroll-progress");
  const updateProgress = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? (window.scrollY / h) * 100 : 0;
    if (progressBar) progressBar.style.width = `${p}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* 3. Custom cursor */
  const dot = document.querySelector(".cursor-dot");
  const outline = document.querySelector(".cursor-outline");
  if (isFinePointer && dot && outline) {
    window.addEventListener("mousemove", (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      outline.animate(
        { left: `${e.clientX}px`, top: `${e.clientY}px` },
        { duration: 500, fill: "forwards" },
      );
    });
    const interactive = document.querySelectorAll(
      "a, button, .project-card, .skill-card, .btn, .nav-link",
    );
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("hovering"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("hovering"));
    });
  }

  /* 3b. Mouse trail — glowing particles that follow cursor */
  if (isFinePointer) {
    const trailCanvas = document.getElementById("mouse-trail");
    if (trailCanvas) {
      const tctx = trailCanvas.getContext("2d");
      let trailParticles = [];
      let lastTrailTime = 0;

      const resizeTrail = () => {
        trailCanvas.width  = window.innerWidth;
        trailCanvas.height = window.innerHeight;
      };
      resizeTrail();
      window.addEventListener("resize", resizeTrail);

      window.addEventListener("mousemove", (e) => {
        // Throttle: max 1 partikel per 40ms (~25fps spawn rate)
        const now = Date.now();
        if (now - lastTrailTime < 40) return;
        lastTrailTime = now;

        const colors = [
          [0,   212, 255],
          [123,  97, 255],
          [180, 160, 255],
        ];
        const [cr, cg, cb] = colors[Math.floor(Math.random() * colors.length)];
        trailParticles.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          r: Math.random() * 2.5 + 0.8,
          alpha: 0.55,
          decay: Math.random() * 0.035 + 0.02,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -0.4 - Math.random() * 0.4,
          cr, cg, cb,
        });
        // Cap array size
        if (trailParticles.length > 40) trailParticles.splice(0, 10);
      });

      const animateTrail = () => {
        tctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        trailParticles = trailParticles.filter((p) => p.alpha > 0.02);
        trailParticles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;
          p.r    *= 0.97;

          // Simple flat circle — no radialGradient
          tctx.beginPath();
          tctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
          tctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${(p.alpha * 0.25).toFixed(2)})`;
          tctx.fill();

          tctx.beginPath();
          tctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          tctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${p.alpha.toFixed(2)})`;
          tctx.fill();
        });
        requestAnimationFrame(animateTrail);
      };
      animateTrail();
    }
  }

  /* 3c. Scroll indicator — hide when user scrolls */
  const scrollIndicator = document.getElementById("scroll-indicator");
  if (scrollIndicator) {
    const hideScrollIndicator = () => {
      if (window.scrollY > 80) {
        scrollIndicator.classList.add("hidden");
        window.removeEventListener("scroll", hideScrollIndicator);
      }
    };
    window.addEventListener("scroll", hideScrollIndicator, { passive: true });
  }

  /* 4. Navbar scroll + scrollspy */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = ["about", "services", "skills", "projects", "testimonials", "contact"].map((id) =>
    document.getElementById(id),
  );

  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");

    let current = "home";
    sections.forEach((sec) => {
      if (sec && window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach((link) =>
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`),
    );
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* 5. Mobile menu */
  const hamburger = document.getElementById("hamburger");
  const navLinksEl = document.getElementById("navLinks");
  const closeMenu = () => {
    if (hamburger) hamburger.classList.remove("open");
    if (navLinksEl) navLinksEl.classList.remove("open");
  };
  if (hamburger && navLinksEl) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinksEl.classList.toggle("open");
    });
    navLinksEl.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  /* 6. Smooth scroll (with offset for fixed nav) */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || !targetId) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* 7. Scroll reveal + skill bar trigger */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          const skillBar = entry.target.querySelector(".skill-bar span");
          if (skillBar) entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // Activate skill bars when skill cards enter view
  const skillCards = document.querySelectorAll(".skill-card");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 },
  );
  skillCards.forEach((card) => skillObserver.observe(card));

  /* 8. Animated counters (data-count) */
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10) || 0;
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((c) => counterObserver.observe(c));

  /* 9. Magnetic effect */
  const magneticEls = document.querySelectorAll(".magnetic, .magnetic-btn");
  magneticEls.forEach((el) => {
    const strength = el.classList.contains("btn") ? 0.3 : 0.2;
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0,0)";
    });
  });

  /* 10. Skill card cursor glow (radial highlight) */
  document.querySelectorAll(".skill-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });

  /* 11. Glitch text — logo & hero h1 sesekali glitch */
  const glitchEls = document.querySelectorAll(".glitch");
  const triggerGlitch = (el) => {
    if (el.classList.contains("glitching")) return;
    el.classList.add("glitching");
    setTimeout(() => el.classList.remove("glitching"), 600);
  };
  glitchEls.forEach((el) => {
    // random interval 3–8s
    const scheduleGlitch = () => {
      setTimeout(() => {
        triggerGlitch(el);
        scheduleGlitch();
      }, Math.random() * 5000 + 3000);
    };
    scheduleGlitch();
  });

  /* 12. Typewriter subtitle */
  const twEl = document.getElementById("typewriter-text");
  if (twEl) {
    const fullText = twEl.dataset.text || twEl.textContent;
    twEl.textContent = "";
    twEl.setAttribute("aria-label", fullText);
    let i = 0;
    const type = () => {
      if (i < fullText.length) {
        twEl.textContent += fullText[i++];
        setTimeout(type, Math.random() * 28 + 18);
      } else {
        // blinking cursor stops after done
        twEl.classList.add("tw-done");
      }
    };
    // start after preloader (~2.8s)
    setTimeout(type, 2800);
  }

  /* 13. Meteor shower on click */
  const clickCanvas = document.getElementById("starfield");
  if (clickCanvas) {
    // reuse the shootingStars array already declared in starfield scope
    // We attach a separate handler using a custom event approach
    document.addEventListener("click", (e) => {
      // don't trigger on interactive elements
      if (e.target.closest("a, button, input, textarea")) return;
      // dispatch to starfield via a global array
      if (!window._meteorBurst) window._meteorBurst = [];
      const count = Math.floor(Math.random() * 4) + 4; // 4–7 meteors
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI / 180) * (Math.random() * 60 + 10);
        const speed = Math.random() * 12 + 8;
        const length = Math.random() * 140 + 60;
        window._meteorBurst.push({
          x: e.clientX, y: e.clientY,
          vx: (Math.random() - 0.5) * speed * 1.4,
          vy: Math.sin(angle) * speed,
          length, alpha: 1,
          decay: 0.03 + Math.random() * 0.02,
          width: Math.random() * 1.2 + 0.5,
        });
      }
    });
  }

  /* 14. Back-to-top rocket */
  const backTop = document.querySelector(".back-top");
  if (backTop) {
    backTop.addEventListener("click", (e) => {
      e.preventDefault();
      backTop.classList.add("launching");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
      setTimeout(() => backTop.classList.remove("launching"), 1200);
    });
  }

  /* 15. About stat counters (data-count) — already handled by #8 above */
  // (existing counter observer at section 8 handles [data-count] attrs)

  /* 16. Space warp canvas on project cards */
  document.querySelectorAll(".project-card:not(.project-coming-soon)").forEach((card) => {
    let warpCanvas = card.querySelector(".warp-canvas");
    if (!warpCanvas) {
      warpCanvas = document.createElement("canvas");
      warpCanvas.className = "warp-canvas";
      warpCanvas.setAttribute("aria-hidden", "true");
      card.prepend(warpCanvas);
    }
    const wctx = warpCanvas.getContext("2d");
    let warpStars = [];
    let warpAF;
    let warpActive = false;
    let warpAlpha = 0;

    const initWarp = () => {
      warpCanvas.width  = card.offsetWidth;
      warpCanvas.height = card.offsetHeight;
      // Kurangi 80 → 40 bintang
      warpStars = Array.from({ length: 40 }, () => ({
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * 0.3 + 0.05,
        speed: Math.random() * 0.006 + 0.003,
        r: Math.random() * 1.2 + 0.3,
        cr: Math.random() > 0.5 ? 140 : 200,
        cg: Math.random() > 0.5 ? 210 : 230,
        cb: 255,
      }));
    };

    const drawWarp = () => {
      if (warpAlpha <= 0 && !warpActive) { warpAF = null; return; }

      const W = warpCanvas.width, H = warpCanvas.height;
      const cx = W / 2, cy = H / 2;
      wctx.clearRect(0, 0, W, H);

      warpStars.forEach((s) => {
        if (warpActive) s.dist += s.speed * (warpAlpha * 3 + 0.5);
        if (s.dist > 0.72) s.dist = 0.05 + Math.random() * 0.1;

        const px = cx + Math.cos(s.angle) * s.dist * W * 0.7;
        const py = cy + Math.sin(s.angle) * s.dist * H * 0.8;
        const tailLen = warpActive ? s.dist * 22 * warpAlpha : 0;

        if (tailLen > 1) {
          const tx = px - Math.cos(s.angle) * tailLen;
          const ty = py - Math.sin(s.angle) * tailLen;
          // Flat gradient-less line untuk performa
          wctx.beginPath();
          wctx.moveTo(tx, ty);
          wctx.lineTo(px, py);
          wctx.strokeStyle = `rgba(${s.cr},${s.cg},${s.cb},${(warpAlpha * 0.6).toFixed(2)})`;
          wctx.lineWidth = s.r * 0.7;
          wctx.stroke();
        }

        wctx.beginPath();
        wctx.arc(px, py, s.r * warpAlpha, 0, Math.PI * 2);
        wctx.fillStyle = `rgba(${s.cr},${s.cg},${s.cb},${(warpAlpha * 0.85).toFixed(2)})`;
        wctx.fill();
      });

      warpAF = requestAnimationFrame(drawWarp);
    };

    card.addEventListener("mouseenter", () => {
      warpActive = true;
      initWarp();
      const fadeIn = () => {
        warpAlpha = Math.min(1, warpAlpha + 0.07);
        if (warpAlpha < 1) requestAnimationFrame(fadeIn);
      };
      fadeIn();
      if (!warpAF) drawWarp();
    });

    card.addEventListener("mouseleave", () => {
      warpActive = false;
      const fadeOut = () => {
        warpAlpha = Math.max(0, warpAlpha - 0.06);
        if (warpAlpha > 0) requestAnimationFrame(fadeOut);
      };
      fadeOut();
    });
  });

  /* 11. WhatsApp contact form */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (document.getElementById("cf-name").value || "").trim();
      const contact = (document.getElementById("cf-contact").value || "").trim();
      const message = (document.getElementById("cf-msg").value || "").trim();
      const existing = contactForm.querySelector(".form-error");
      if (existing) existing.remove();
      if (!name || !contact || !message) {
        const err = document.createElement("p");
        err.className = "form-error";
        err.textContent = "Mohon lengkapi nama, kontak, dan pesan terlebih dahulu.";
        contactForm.insertBefore(err, contactForm.firstChild);
        return;
      }
      const text =
        "Halo Madentra, saya " + name + ".\nKontak saya: " + contact +
        "\n\n" + message +
        "\n\n(Pesan dikirim dari halaman portofolio)";
      window.open(
        "https://wa.me/628970654289?text=" + encodeURIComponent(text),
        "_blank",
        "noopener",
      );
      contactForm.reset();
    });
  }

});  // end DOMContentLoaded
