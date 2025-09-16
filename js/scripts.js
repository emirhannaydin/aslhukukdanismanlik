// Header yükle
fetch("components/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-include").innerHTML = data;
    bindFadeLinks(); // header yüklendikten sonra linkleri bağla
  });

// Footer yükle
fetch("components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer-include").innerHTML = data;
  });

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("fade-in");

  // HERO OVERLAY ANİMASYONU
  const heroOverlay = document.querySelector(".hero-overlay");
  if (heroOverlay) {
    setTimeout(() => {
      heroOverlay.classList.add("animate-in");
    }, 300);
  }

  // PAGE HERO OVERLAY ANİMASYONU
  const pageHeroOverlay = document.querySelector(".page-hero-overlay");
  if (pageHeroOverlay) {
    setTimeout(() => {
      pageHeroOverlay.classList.add("animate-in");
    }, 300);
  }

  // FORM DOĞRULAMA
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

  bindFadeLinks(); // DOM hazır olunca bir defa da burada çağır
});

// 👇 Bu fonksiyon hem ilk yüklemede hem header yüklendikten sonra kullanılabilir
function bindFadeLinks() {
  const links = document.querySelectorAll("a[href]");
  links.forEach(link => {
    const url = link.getAttribute("href");

    if (url && !url.startsWith("#") && !url.startsWith("http") && !link.hasAttribute("target")) {
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

// ===== CountUp on view =====
(function () {
  const items = document.querySelectorAll('.countup');
  if (!items.length) return;

  // Kullanıcı "reduced motion" tercih ediyorsa animasyonu atla
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animate = (el) => {
    const target = parseFloat(el.getAttribute('data-target')) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500; // ms
    const start = performance.now();
    const startVal = 0;

    if (prefersReduced) {
      el.textContent = target + suffix;
      return;
    }

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutQuad
      const eased = 1 - Math.pow(1 - progress, 2);
      const current = Math.floor(startVal + (target - startVal) * eased);
      el.textContent = current + suffix;

      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix; // tam değerde bitir
    };
    requestAnimationFrame(step);
  };

  // Ekrana girince tetiklemek için IntersectionObserver
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target); // sadece bir kez çalışsın
        }
      });
    },
    { threshold: 0.3 }
  );

  items.forEach((el) => io.observe(el));
})();
