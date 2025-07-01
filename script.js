document.addEventListener("DOMContentLoaded", () => {
  // Fade-in effect for all elements at once
  document.querySelectorAll(".fade-in").forEach((el) => {
    el.classList.add("visible");
  });

  // Slider code (if present)
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentSlide = 0;

  function showSlide(n) {
    if (!slides.length) return;
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[n].classList.add("active");
  }

  function nextSlide() {
    if (!slides.length) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    if (!slides.length) return;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (nextBtn && prevBtn && slides.length) {
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
    setInterval(nextSlide, 5000);
  }

  // Language toggle functionality
  const langBtn = document.querySelector(".lang-switch");
  const navLinks = document.querySelectorAll("nav ul li a");
  const quoteBtn = document.querySelector(".quote-btn");

  // زر الهمبرغر
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  const learnMoreBtns = document.querySelectorAll(".learn-more-btn");
  const contactTitle = document.querySelector(".footer-contact h3");
  const contactEmail = document.querySelector(".footer-contact p:nth-child(2)");
  const contactPhone = document.querySelector(".footer-contact p:nth-child(3)");
  const langSwitchWrapper = document.querySelector(".lang-switch-wrapper");
  const langDropdown = document.querySelector(".lang-dropdown");
  const langLabel = document.querySelector(".lang-label");

  let isArabic = false;
  let labels = {};
  fetch("translations.json")
    .then((res) => res.json())
    .then((data) => {
      labels = data;
      // Initial call for default language
      updateFooter("en");
    });

  // Dropdown toggle
  if (langSwitchWrapper && langDropdown) {
    langSwitchWrapper
      .querySelector(".lang-switch")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        langSwitchWrapper.classList.toggle("open");
      });
    // Dropdown select
    langDropdown.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", (e) => {
        const selected = li.getAttribute("data-lang");
        let lang = "en";
        if (selected === "ko") lang = "ko";
        // Nav
        navLinks.forEach((a, i) => (a.textContent = labels[lang].nav[i]));
        // Quote
        if (quoteBtn) quoteBtn.textContent = labels[lang].quote;
        // Learn More
        learnMoreBtns.forEach((btn) => {
          btn.childNodes[0].nodeValue = labels[lang].learn + " ";
        });
        // Footer
        if (contactTitle) contactTitle.textContent = labels[lang].contact;
        if (contactEmail) contactEmail.textContent = labels[lang].email;
        if (contactPhone) contactPhone.textContent = labels[lang].phone;
        // Lang btn label
        if (langLabel) langLabel.textContent = lang;
        // Main images titles
        const main1Title = document.getElementById("main1-title");
        const main2Title = document.getElementById("main2-title");
        if (main1Title) main1Title.textContent = labels[lang].main1Title;
        if (main2Title) main2Title.textContent = labels[lang].main2Title;
        langSwitchWrapper.classList.remove("open");
      });
    });
    // Close dropdown on outside click
    document.addEventListener("click", (e) => {
      langSwitchWrapper.classList.remove("open");
    });
  }

  // Footer links and copyright translation
  const footerLinks = document.querySelectorAll(
    ".footer-link-btn, .footer-contact-btn.footer-inline"
  );
  const copyright = document.querySelector(".footer-bottom p");

  function updateFooter(lang) {
    if (!labels[lang]) return;
    if (footerLinks.length === labels[lang].footerLinks.length) {
      footerLinks.forEach((btn, i) => {
        btn.textContent = labels[lang].footerLinks[i];
      });
    }
    if (copyright) copyright.textContent = labels[lang].copyright;
  }

  // Call updateFooter on language change
  if (langDropdown) {
    langDropdown.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", (e) => {
        const selected = li.getAttribute("data-lang");
        let lang = "en";
        if (selected === "ko") lang = "ko";
        updateFooter(lang);
      });
    });
  }
  // Initial call for default language
  updateFooter("en");

  // تحديث زر اللغة ليعرض اللغة الحالية
  if (langLabel) langLabel.textContent = "en";

  // About Us modal functionality
  var aboutBtn = document.getElementById("about-us-btn");
  var aboutModal = document.getElementById("about-us-modal");
  var closeAbout = document.getElementById("close-about-modal");

  if (aboutBtn && aboutModal && closeAbout) {
    aboutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      aboutModal.style.display = "flex";
    });
    closeAbout.addEventListener("click", function () {
      aboutModal.style.display = "none";
    });
    aboutModal.addEventListener("click", function (e) {
      if (e.target === aboutModal) {
        aboutModal.style.display = "none";
      }
    });
  }

  // About Us modal translation
  function updateAboutUsModal(lang) {
    var aboutModalText = document.querySelector(
      "#about-us-modal .modal-content p"
    );
    if (aboutModalText && labels[lang] && labels[lang].aboutUs) {
      aboutModalText.textContent = labels[lang].aboutUs;
    }
  }

  // تحديث نص About Us عند تغيير اللغة
  if (langDropdown) {
    langDropdown.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", (e) => {
        const selected = li.getAttribute("data-lang");
        let lang = "en";
        if (selected === "ko") lang = "ko";
        updateAboutUsModal(lang);
      });
    });
  }
  // تحديث نص About Us عند تحميل الصفحة
  updateAboutUsModal("en");

  // Bako Best Brand translation
  function updateBakoBest(lang) {
    var bakoBestText = document.getElementById("bako-best-text");
    if (bakoBestText && labels[lang] && labels[lang].bakoBest) {
      bakoBestText.textContent = labels[lang].bakoBest;
    }
  }

  // Update Bako Best Brand text on language change
  if (langDropdown) {
    langDropdown.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", (e) => {
        const selected = li.getAttribute("data-lang");
        let lang = "en";
        if (selected === "ko") lang = "ko";
        updateBakoBest(lang);
      });
    });
  }
  // Initial call for default language
  updateBakoBest("en");

  // Mobile language modal
  function showLangModal() {
    // Remove if already exists
    let oldModal = document.getElementById("lang-modal");
    if (oldModal) oldModal.remove();
    // Create modal
    const modal = document.createElement("div");
    modal.id = "lang-modal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.45)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "99999";
    modal.style.opacity = "0";
    modal.style.transition = "opacity 0.35s cubic-bezier(.4,1.6,.4,1)";
    // Modal content
    const content = document.createElement("div");
    content.style.background = "#fff";
    content.style.borderRadius = "14px";
    content.style.padding = "32px 24px 18px 24px";
    content.style.boxShadow = "0 8px 32px rgba(0,0,0,0.18)";
    content.style.textAlign = "center";
    content.style.minWidth = "220px";
    content.style.maxWidth = "90vw";
    content.style.transform = "translateY(40px) scale(0.98)";
    content.style.opacity = "0";
    content.style.transition = "all 0.35s cubic-bezier(.4,1.6,.4,1)";
    // Title
    const title = document.createElement("h3");
    title.textContent = "Select Language";
    title.style.margin = "0 0 18px 0";
    title.style.color = "#ff4500";
    content.appendChild(title);
    // List
    const ul = document.createElement("ul");
    ul.style.listStyle = "none";
    ul.style.padding = "0";
    ul.style.margin = "0";
    ul.style.display = "flex";
    ul.style.flexDirection = "column";
    ul.style.gap = "12px";
    // Add languages
    langDropdown.querySelectorAll("li").forEach((li) => {
      const btn = document.createElement("button");
      btn.textContent = li.textContent;
      btn.style.background = "#fff";
      btn.style.color = "#222";
      btn.style.fontWeight = "bold";
      btn.style.fontSize = "1.1rem";
      btn.style.border = "1px solid #eee";
      btn.style.borderRadius = "8px";
      btn.style.padding = "10px 0";
      btn.style.cursor = "pointer";
      btn.style.transition = "background 0.2s, color 0.2s";
      btn.onmouseenter = () => {
        btn.style.background = "#ff4500";
        btn.style.color = "#fff";
      };
      btn.onmouseleave = () => {
        btn.style.background = "#fff";
        btn.style.color = "#222";
      };
      btn.onclick = () => {
        li.click();
        document.body.removeChild(modal);
      };
      ul.appendChild(btn);
    });
    content.appendChild(ul);
    // Close btn
    const closeBtn = document.createElement("span");
    closeBtn.textContent = "×";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "12px";
    closeBtn.style.right = "24px";
    closeBtn.style.fontSize = "2.2rem";
    closeBtn.style.color = "#ff4500";
    closeBtn.style.cursor = "pointer";
    closeBtn.onclick = () => document.body.removeChild(modal);
    content.appendChild(closeBtn);
    content.style.position = "relative";
    modal.appendChild(content);
    document.body.appendChild(modal);
    // Animation in
    setTimeout(() => {
      modal.style.opacity = "1";
      content.style.transform = "translateY(0) scale(1)";
      content.style.opacity = "1";
    }, 10);
    // Close on outside click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        // Animation out
        modal.style.opacity = "0";
        content.style.transform = "translateY(40px) scale(0.98)";
        content.style.opacity = "0";
        setTimeout(() => {
          if (document.body.contains(modal)) document.body.removeChild(modal);
        }, 350);
      }
    });
  }
  // Hijack lang-switch for mobile
  if (langBtn) {
    langBtn.addEventListener("click", (e) => {
      if (window.innerWidth <= 600) {
        e.preventDefault();
        e.stopPropagation();
        showLangModal();
      }
    });
  }

  // Dynamic product cards rendering
  if (window.location.pathname.includes("products.html")) {
    fetch("products.json")
      .then((res) => res.json())
      .then((products) => {
        const automotive = document.getElementById("automotive-products");
        const industrial = document.getElementById("industrial-products");
        products.forEach((product) => {
          const card = document.createElement("div");
          card.className = "product-card better-card";
          card.innerHTML = `
            <img src="${product.image}" alt="${
            product.name
          }" class="product-img" />
            <div class="product-info">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <div class="product-price">$${product.price.toFixed(2)}</div>
            </div>
          `;
          if (product.category === "Automotive") {
            automotive.appendChild(card);
          } else if (product.category === "Industrial") {
            industrial.appendChild(card);
          }
        });
      });
  }
});
