// HEADER ve FOOTER yükle
fetch("components/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-include").innerHTML = data;
    bindFadeLinks(); // link fade efektleri header yüklendikten sonra
    initMenuToggle(); // mobil menü
  });

fetch("components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer-include").innerHTML = data;
  });

// Sayfa tamamen yüklendiğinde (resimler dahil) fade-in animasyonu
window.addEventListener("load", function () {
  document.body.classList.remove("fade-out");
  document.body.classList.add("fade-in");

  // Hero animasyonu
  const heroOverlay = document.querySelector(".hero-overlay");
  if (heroOverlay) {
    setTimeout(() => {
      heroOverlay.classList.add("animate-in");
    }, 300);
  }

  // Sayfa başlığı animasyonu
  const pageHeroOverlay = document.querySelector(".page-hero-overlay");
  if (pageHeroOverlay) {
    setTimeout(() => {
      pageHeroOverlay.classList.add("animate-in");
    }, 300);
  }
});

// Anasayfadaki iletişim formu validasyonu
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("homepage-contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      const inputs = form.querySelectorAll("input, textarea");
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          input.style.border = "2px solid red";
          isValid = false;
        } else {
          input.style.border = "1px solid #ccc";
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert("Lütfen tüm alanları doldurunuz.");
      } else {
        alert("Mesajınız başarıyla gönderildi!");
      }
    });
  }
});

// Sayfalar arası geçişte fade-in / fade-out
function bindFadeLinks() {
  const links = document.querySelectorAll("a[href]");
  links.forEach(link => {
    const url = link.getAttribute("href");

    if (
      url &&
      !url.startsWith("#") &&
      !url.startsWith("http") &&
      !url.startsWith("tel:") &&       // Telefon linklerini hariç tut
      !url.startsWith("mailto:") &&    // Mail linklerini hariç tut
      !url.startsWith("https://wa.me") && // WhatsApp linklerini hariç tut
      !link.hasAttribute("target")
    ) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.remove("fade-in");
        document.body.classList.add("fade-out");

        setTimeout(() => {
          window.location.href = url;
        }, 800);
      });
    }
  });
}


// Rakamların artış animasyonu (countup)
(function () {
  const items = document.querySelectorAll(".countup");
  if (!items.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animate = (el) => {
    const target = parseFloat(el.getAttribute("data-target")) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1500; // ms
    const start = performance.now();
    const startVal = 0;

    if (prefersReduced) {
      el.textContent = target + suffix;
      return;
    }

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      const current = Math.floor(startVal + (target - startVal) * eased);
      el.textContent = current + suffix;

      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  items.forEach((el) => io.observe(el));
})();

// Mobil menü toggle
function initMenuToggle() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".main-nav ul");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle();
});

// Accordion
    document.addEventListener("DOMContentLoaded", () => {
      const questions = document.querySelectorAll(".faq-question");
      questions.forEach(q => {
        q.addEventListener("click", () => {
          q.classList.toggle("active");
          const answer = q.nextElementSibling;
          if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
          } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
          }
        });
      });
    });

