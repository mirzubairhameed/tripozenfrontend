// TripOzen - script.js
// Populates data from data.js, handles nav, scroll effects,
// reveal animations, and mobile menu.

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Theme toggle ----------
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // ---------- Build navigation links ----------
  const navLinks = document.getElementById("navLinks");
  const mobileNavLinks = document.getElementById("mobileNavLinks");
  const footerLinks = document.getElementById("footerLinks");

  if (navLinks) navLinks.innerHTML = NAV_LINKS.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join("");
  if (mobileNavLinks) mobileNavLinks.innerHTML = NAV_LINKS.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join("");
  if (footerLinks) footerLinks.innerHTML = NAV_LINKS.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join("");

  // ---------- Build destinations ----------
  const destGrid = document.getElementById("destGrid");
  if (destGrid) {
    destGrid.innerHTML = DESTINATIONS.map(d => `
      <a href="#contact" class="dest-card" aria-label="Plan a trip to ${d.name}">
        <img src="${d.image}" alt="${d.name}" class="dest-card-img" loading="lazy" />
        <div class="dest-card-overlay">
          <span class="dest-tagline">${d.tagline}</span>
          <h3 class="dest-name">${d.name}</h3>
          <p class="dest-desc">${d.description}</p>
          <span class="dest-arrow">Plan this trip →</span>
        </div>
      </a>
    `).join("");
  }

  // ---------- Build Gallery ----------
  const galleryGrid = document.getElementById("galleryGrid");
  if (galleryGrid) {
    galleryGrid.innerHTML = GALLERY.map(g => `
      <figure class="gallery-item">
        <img src="${g.image}" alt="${g.label}" class="gallery-img" loading="lazy" />
        <figcaption class="gallery-caption">
          <span class="gallery-cat">${g.category}</span>
          <span class="gallery-label">${g.label}</span>
        </figcaption>
      </figure>
    `).join("");
  }

  // ---------- Build Why TripOzen ----------
  const whyGrid = document.getElementById("whyGrid");
  if (whyGrid) {
    whyGrid.innerHTML = WHY_US.map(w => `
      <div class="why-item">
        <h3 class="why-title">${w.title}</h3>
        <p class="why-desc">${w.description}</p>
      </div>
    `).join("");
  }

  // ---------- Contact form ----------
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contactName")?.value || "";
      const phone = document.getElementById("contactPhone")?.value || "";
      const email = document.getElementById("contactEmail")?.value || "";
      const dest = document.getElementById("contactDest")?.value || "";
      const message = document.getElementById("contactMessage")?.value || "";

      const destLabel = document.getElementById("contactDest")?.selectedOptions[0]?.text || "";
      const destLine = dest ? `Destination: ${destLabel}` : "";

      const subject = encodeURIComponent(`Trip Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n${destLine}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    });
  }

  // ---------- Navbar scroll state ----------
  const navbar = document.getElementById("navbar");
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---------- Mobile menu ----------
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (navToggle && mobileMenu) {
    const closeMenu = () => {
      mobileMenu.classList.remove("open");
      navToggle.classList.remove("active");
      document.body.style.overflow = "";
    };

    navToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      navToggle.classList.toggle("active", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileMenu.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", closeMenu)
    );
  }

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          entry.target.style.setProperty("--reveal-delay", delay + "ms");
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach(el => revealObserver.observe(el));
});