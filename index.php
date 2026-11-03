<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Portfolio Madentra — Creative Developer & Designer. Crafting cinematic digital experiences.">
    <title>Portfolio</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div id="scroll-progress"></div>

    <!-- Preloader -->
    <div class="preloader" id="preloader">
        <div class="preloader-logo">PORTFOLIO<span class="dot" style="width:8px;height:8px;border-radius:50%;display:inline-block;background:var(--accent);"></span></div>
        <div class="preloader-bar"><span></span></div>
    </div>

    <div class="cursor-dot"></div>
    <div class="cursor-outline"></div>

    <div class="grain-overlay"></div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="particle-field" aria-hidden="true">
        <span style="--x: 8%; --delay: 0s; --duration: 18s;"></span>
        <span style="--x: 18%; --delay: -5s; --duration: 24s;"></span>
        <span style="--x: 31%; --delay: -12s; --duration: 21s;"></span>
        <span style="--x: 46%; --delay: -2s; --duration: 26s;"></span>
        <span style="--x: 59%; --delay: -9s; --duration: 20s;"></span>
        <span style="--x: 72%; --delay: -15s; --duration: 23s;"></span>
        <span style="--x: 86%; --delay: -7s; --duration: 19s;"></span>
        <span style="--x: 94%; --delay: -17s; --duration: 25s;"></span>
    </div>

    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="#home" class="logo">PORTOFOLIO<span class="dot"></span></a>
            <ul class="nav-links" id="navLinks">
                <li><a href="#about" class="nav-link">About</a></li>
                <li><a href="#services" class="nav-link">Layanan</a></li>
                <li><a href="#skills" class="nav-link">Skills</a></li>
                <li><a href="#projects" class="nav-link">Works</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
                <li><a href="#contact" class="nav-cta">Hire Me</a></li>
            </ul>
            <button class="hamburger" id="hamburger" aria-label="Menu">
                <span></span><span></span>
            </button>
        </div>
    </nav>

    <main>
        <!-- HERO -->
        <section class="hero" id="home">
            <div class="hero-content reveal">
                <span class="availability-badge reveal"><i></i>Tersedia untuk proyek baru</span>
                <p class="tagline">Madentra &middot; Creative Developer &amp; Designer</p>
                <h1>Crafting Digital<br><span class="gradient-text">Experiences</span></h1>
                <p class="subtitle">Membangun website dengan estetika sinematik, interaksi yang halus, dan perhatian pada setiap detail.</p>
                <div class="hero-actions">
                    <a href="#projects" class="btn btn-primary magnetic-btn">
                        <span>Lihat Proyek</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                    </a>
                    <a href="#contact" class="btn btn-ghost magnetic">
                        <span>Kontak Saya</span>
                    </a>
                </div>
                <div class="hero-stats">
                    <div class="hero-stat"><span class="num" data-count="3">0</span><span class="lbl">Tahun Pengalaman</span></div>
                    <div class="hero-stat"><span class="num" data-count="20">0</span><span class="lbl">Proyek Selesai</span></div>
                    <div class="hero-stat"><span class="num" data-count="12">0</span><span class="lbl">Klien Puas</span></div>
                </div>
            </div>
            <div class="scroll-hint"><span class="mouse"></span><span>Scroll</span></div>
        </section>

        <!-- ABOUT -->
        <section class="about" id="about">
            <div class="container">
                <div class="about-grid">
                    <div class="about-visual reveal">
                        <div class="image-frame"></div>
                        <div class="about-img-wrap">
                            <img src="assets/images/profile.jpeg" alt="Profile">
                        </div>
                        <div class="experience-badge">
                            <div class="big" data-count="3">0</div>
                            <div class="small">Tahun Dedikasi</div>
                        </div>
                    </div>
               <div class="about-text reveal" style="--d:0.15s">
    <p class="section-label">01 / About Me</p>

    <h2>
        Di balik setiap baris kode, ada
        <span class="italic-accent">cerita</span> yang ingin saya buat.
    </h2>

    <p>
        Saya adalah mahasiswa Teknik Informatika yang tertarik pada dunia
        web development, desain, dan teknologi. Saya suka mencoba hal baru,
        mulai dari membuat tampilan website sampai mengembangkan fitur agar
        sebuah website tidak hanya terlihat menarik, tetapi juga nyaman digunakan.
    </p>

    <p>
        Bagi saya, desain dan teknologi bukan dua hal yang terpisah.
        Keduanya bisa digabungkan untuk menciptakan sesuatu yang sederhana,
        fungsional, dan punya karakter.
    </p>

    <div class="about-badges">
        <span class="about-badge">#WebDevelopment</span>
        <span class="about-badge">#UIUX</span>
        <span class="about-badge">#Creative</span>
        <span class="about-badge">#DetailOriented</span>
    </div>

    <p style="margin-top:1.4rem;">
        <a href="#contact" class="text-link">Mari berkolaborasi &rarr;</a>
    </p>
</div>
        </section>

        <!-- SKILLS -->
        <section class="skills" id="skills">
            <div class="container">
                <div class="section-header reveal">
                    <p class="section-label">02 / Expertise</p>
                    <h2>Senjata &amp; Alat Tempur</h2>
                    <p class="lead">Beberapa keahlian utama yang saya gunakan untuk menghidupkan setiap proyek.</p>
                </div>
                <div class="skills-grid">
                    <div class="skill-card reveal" style="--level: 90%; --d:0s">
                        <div class="skill-top"><span class="skill-icon">UI</span><span class="skill-percent">90%</span></div>
                        <h3>UI/UX Design</h3>
                        <p>Design yang intuitif, konsisten, dan memikat mata.</p>
                        <div class="skill-tags"><span class="skill-tag">Figma</span><span class="skill-tag">Prototyping</span><span class="skill-tag">Design System</span></div>
                        <div class="skill-bar"><span></span></div>
                    </div>
                    <div class="skill-card reveal" style="--level: 85%; --d:0.1s">
                        <div class="skill-top"><span class="skill-icon">FE</span><span class="skill-percent">85%</span></div>
                        <h3>Frontend Dev</h3>
                        <p>Interaksi halus dan performa tinggi di setiap viewport.</p>
                        <div class="skill-tags"><span class="skill-tag">React</span><span class="skill-tag">Next.js</span><span class="skill-tag">CSS3</span></div>
                        <div class="skill-bar"><span></span></div>
                    </div>
                    <div class="skill-card reveal" style="--level: 78%; --d:0.2s">
                        <div class="skill-top"><span class="skill-icon">PHP</span><span class="skill-percent">78%</span></div>
                        <h3>Backend &amp; PHP</h3>
                        <p>Fondasi data yang kuat dan API yang andal.</p>
                        <div class="skill-tags"><span class="skill-tag">Laravel</span><span class="skill-tag">MySQL</span><span class="skill-tag">REST API</span></div>
                        <div class="skill-bar"><span></span></div>
                    </div>
                    <div class="skill-card reveal" style="--level: 80%; --d:0.3s">
                        <div class="skill-top"><span class="skill-icon">FX</span><span class="skill-percent">80%</span></div>
                        <h3>Creative Coding</h3>
                        <p>Animasi sinematik &amp; efek visual yang memukau.</p>
                        <div class="skill-tags"><span class="skill-tag">GSAP</span><span class="skill-tag">Three.js</span><span class="skill-tag">WebGL</span></div>
                        <div class="skill-bar"><span></span></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SERVICES -->
        <section class="services" id="services">
            <div class="container">
                <div class="section-header reveal">
                    <p class="section-label">02 / Layanan</p>
                    <h2>Yang bisa <span class="italic-accent">saya bantu</span></h2>
                    <p class="lead">Penawaran jelas, harga transparan, dan hasil yang siap pakai.</p>
                </div>
                <div class="services-grid">
                    <article class="service-card reveal" style="--d:0s">
                        <span class="service-icon">LP</span>
                        <h3>Landing Page</h3>
                        <p>Halaman fokus untuk iklan, event, atau produk &mdash; cepat dimuat dan dirancang untuk mengonversi pengunjung menjadi pelanggan.</p>
                        <ul class="service-list">
                            <li>Desain responsif &amp; SEO-friendly</li>
                            <li>1x revisi desain</li>
                            <li>Integrasi WhatsApp / form kontak</li>
                        </ul>
                        <a href="#contact" class="btn btn-ghost service-cta">Pesan Sekarang</a>
                    </article>
                    <article class="service-card reveal" style="--d:0.1s">
                        <span class="service-icon">CP</span>
                        <h3>Website Profil</h3>
                        <p>Website multi-halaman untuk bisnis atau brand yang ingin tampil profesional dan dipercaya.</p>
                        <ul class="service-list">
                            <li>Hingga 8 halaman</li>
                            <li>Galeri, blog, &amp; fitur WhatsApp</li>
                            <li>Kecepatan &amp; performa dioptimalkan</li>
                        </ul>
                        <a href="#contact" class="btn btn-ghost service-cta">Pesan Sekarang</a>
                    </article>
                    <article class="service-card reveal" style="--d:0.2s">
                        <span class="service-icon">WA</span>
                        <h3>Web App / Sistem</h3>
                        <p>Dashboard, aplikasi data, atau sistem internal sesuai kebutuhan operasional bisnis Anda.</p>
                        <ul class="service-list">
                            <li>Autentikasi &amp; manajemen data</li>
                            <li>Panel admin yang mudah dipakai</li>
                            <li>Support &amp; maintenance</li>
                        </ul>
                        <a href="#contact" class="btn btn-ghost service-cta">Diskusikan Kebutuhan</a>
                    </article>
                </div>
                <p class="services-note reveal">Butuh sesuatu yang lebih spesifik? <a href="#contact" class="text-link">Ceritakan proyek Anda</a> &mdash; saya bantu sesuaikan.</p>
            </div>
        </section>
        <!-- PROJECTS -->
        <section class="projects" id="projects">
            <div class="container">
                <div class="section-header reveal">
                    <p class="section-label">04 / Selected Works</p>
                    <h2>Karya Pilihan</h2>
                    <p class="lead">Seleksi proyek yang paling mewakili standar dan gaya saya.</p>
                </div>
                <div class="project-grid">
                    <article class="project-card reveal" style="--d:0s">
                        <div class="card-media">
                            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop" alt="Cinematic Personal Site">
                        </div>
                        <span class="card-arrow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg></span>
                        <div class="card-info">
                            <span class="card-cat">Portfolio Website</span>
                            <h3>Cinematic Personal Site</h3>
                            <p>Landing portfolio dengan transisi halus, visual gelap, dan interaksi modern.</p>
                            <div class="card-tags"><span>HTML/CSS</span><span>JavaScript</span></div>
                        </div>
                    </article>

                    <article class="project-card reveal" style="--d:0.12s">
                        <div class="card-media">
                            <img src="https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=900&auto=format&fit=crop" alt="Interactive Web Project">
                        </div>
                        <span class="card-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg></span>
                        <div class="card-info">
                            <span class="card-cat">Web Development</span>
                            <h3>Interactive Web Project</h3>
                            <p>Website responsif dengan fokus pada performa, layout bersih, dan pengalaman pengguna.</p>
                            <div class="card-tags"><span>React</span><span>Node.js</span></div>
                        </div>
                    </article>

                    <article class="project-card project-extra reveal" style="--d:0s">
                        <div class="card-media">
                            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=900&auto=format&fit=crop" alt="Web App Dashboard">
                        </div>
                        <span class="card-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg></span>
                        <div class="card-info">
                            <span class="card-cat">App / Dashboard</span>
                            <h3>Modern Web App</h3>
                            <p>Aplikasi web dengan data dinamis, dark UI, dan autentikasi mulus.</p>
                            <div class="card-tags"><span>Next.js</span><span>Laravel API</span></div>
                        </div>
                    </article>

                    <article class="project-card project-extra reveal" style="--d:0.12s">
                        <div class="card-media">
                            <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=900&auto=format&fit=crop" alt="Brand Identity">
                        </div>
                        <span class="card-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg></span>
                        <div class="card-info">
                            <span class="card-cat">Design / Identity</span>
                            <h3>Brand Visual Identity</h3>
                            <p>Identitas visual yang konsisten untuk memperkuat citra brand klien.</p>
                            <div class="card-tags"><span>Figma</span><span>Branding</span></div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- TESTIMONIALS -->
        <section class="testimonials" id="testimonials">
            <div class="container">
                <div class="section-header reveal">
                    <p class="section-label">04 / Kata Mereka</p>
                    <h2>Dipercaya oleh <span class="italic-accent">klien</span></h2>
                    <p class="lead">Feedback langsung dari orang-orang yang sudah bekerja sama dengan saya.</p>
                </div>
                <div class="testimonial-grid">
                    <figure class="testimonial-card reveal" style="--d:0s">
                        <div class="quote-mark">&ldquo;</div>
                        <blockquote>Prosesnya sangat profesional dan komunikatif. Website jadi lebih cepat, modern, dan sesuai banget dengan karakter brand kami.</blockquote>
                        <figcaption>
                            <span class="avatar">R</span>
                            <div><strong>Raka Pratama</strong><span>Owner &middot; Kopi Senja</span></div>
                            <div class="stars" aria-label="5 dari 5">&starf;&starf;&starf;&starf;&starf;</div>
                        </figcaption>
                    </figure>
                    <figure class="testimonial-card reveal" style="--d:0.12s">
                        <div class="quote-mark">&ldquo;</div>
                        <blockquote>Detail dan estetikanya luar biasa. Klien kami sampai komentar soal tampilan baru ini. Nilai investasinya terbayar.</blockquote>
                        <figcaption>
                            <span class="avatar">S</span>
                            <div><strong>Salsabila</strong><span>Founder &middot; Studio Kilau</span></div>
                            <div class="stars" aria-label="5 dari 5">&starf;&starf;&starf;&starf;&starf;</div>
                        </figcaption>
                    </figure>
                    <figure class="testimonial-card reveal" style="--d:0.24s">
                        <div class="quote-mark">&ldquo;</div>
                        <blockquote>Dikerjakan cepat, hasil rapi, dan selalu update progres. Ini developer yang benar-benar paham kebutuhan bisnis.</blockquote>
                        <figcaption>
                            <span class="avatar">D</span>
                            <div><strong>Dimas Ananda</strong><span>CEO &middot; Toko Aruna</span></div>
                            <div class="stars" aria-label="5 dari 5">&starf;&starf;&starf;&starf;&starf;</div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
        <!-- CONTACT -->
        <section class="contact" id="contact">
            <div class="container reveal">
                <div class="cta-panel">
                    <p class="section-label center">05 / Get in Touch</p>
                    <h2 class="contact-title">Punya ide gila?<br>Mari kita <span class="gradient-text">wujudkan</span>.</h2>
                    <p class="contact-desc">Punya perbaikan web, website baru, atau kolaborasi? Kirim pesan, saya balas secepatnya.</p>
                    <div class="contact-actions">
                        <a href="https://wa.me/6281234567890?text=Halo%20Madentra%2C%20saya%20tertarik%20untuk%20bekerja%20sama." target="_blank" rel="noopener" class="btn btn-wa large magnetic">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.9 6.99c0 5.45-4.44 9.88-9.9 9.88zm8.43-18.3A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.33-1.66a11.9 11.9 0 0 0 5.66 1.44c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.46-8.4z"/></svg>
                            <span>Chat WhatsApp</span>
                        </a>
                        <a href="mailto:madentragf@gmail.com" class="btn btn-primary large magnetic">
                            <span>madentragf@gmail.com</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        </a>
                    </div>
                    <form class="contact-form" id="contactForm" novalidate>
                        <div class="form-row">
                            <div class="form-field">
                                <label for="cf-name">Nama</label>
                                <input type="text" id="cf-name" name="name" placeholder="Nama Anda" required>
                            </div>
                            <div class="form-field">
                                <label for="cf-contact">Email / WhatsApp</label>
                                <input type="text" id="cf-contact" name="contact" placeholder="email@contoh.com atau nomor WA" required>
                            </div>
                        </div>
                        <div class="form-field">
                            <label for="cf-msg">Ceritakan proyek Anda</label>
                            <textarea id="cf-msg" name="message" rows="4" placeholder="Kebutuhan, target waktu, budget..." required></textarea>
                        </div>
                        <p class="form-note">Form ini mengarahkan ke WhatsApp saya dengan pesan yang sudah terisi &mdash; paling cepat untuk direspon.</p>
                        <button type="submit" class="btn btn-primary magnetic form-submit">
                            <span>Kirim via WhatsApp</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                        </button>
                    </form>
                    <div class="social-links">
                        <a href="https://www.instagram.com/g1lardino?igsh=MWh6NmJ1aHk4b3V2NA==" target="_blank" rel="noopener" class="social-link magnetic">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.68.8.9 1.4.17.4.37 1 .42 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2a3.9 3.9 0 0 1-.9 1.4c-.4.42-.8.68-1.4.9-.4.17-1 .37-2.2.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.4-.42.8-.68 1.4-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.07-1 .05-1.5.2-1.9.35-.5.19-.8.43-1.2.83-.4.4-.64.7-.83 1.2-.14.4-.3.9-.35 1.9C3 8.6 3 9 3 12s0 3.4.07 4.7c.05 1 .2 1.5.35 1.9.19.5.43.8.83 1.2.4.4.7.64 1.2.83.4.14.9.3 1.9.35 1.2.07 1.6.07 4.7.07s3.5 0 4.7-.07c1-.05 1.5-.2 1.9-.35.5-.19.8-.43 1.2-.83.4-.4.64-.7.83-1.2.14-.4.3-.9.35-1.9.07-1.3.07-1.7.07-4.7s0-3.4-.07-4.7c-.05-1-.2-1.5-.35-1.9a3.4 3.4 0 0 0-.83-1.2 3.2 3.2 0 0 0-1.2-.83c-.4-.14-.9-.3-1.9-.35C15.5 4 15.1 4 12 4zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm5.1-3.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/></svg>
                            Instagram
                        </a>
                        <a href="https://github.com/giovano-code" target="_blank" rel="noopener" class="social-link magnetic">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.3c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C18 6.5 19 6.8 19 6.8c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-inner">
                <p>&copy; 2026 Madentra &middot; Crafted with <span class="heart">&#10084;</span> &amp; obsession.</p>
                <a href="#home" class="back-top">&uarr; Kembali ke atas</a>
            </div>
        </div>
    </footer>

    <a href="https://wa.me/6281234567890?text=Halo%20Madentra%2C%20saya%20ingin%20bertanya%20tentang%20jasa%20pembuatan%20website." class="wa-float" target="_blank" rel="noopener" aria-label="Chat WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z"/></svg>
    </a>
    <script src="script.js"></script>
</body>
</html>
