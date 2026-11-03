document.addEventListener("DOMContentLoaded", () => {
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;

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
        "https://wa.me/6281234567890?text=" + encodeURIComponent(text),
        "_blank",
        "noopener",
      );
      contactForm.reset();
    });
  }
