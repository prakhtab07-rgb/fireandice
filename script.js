// =========================================
// FIRE & ICE CAFE — JAVASCRIPT
// =========================================

document.addEventListener('DOMContentLoaded', function () {

  // ===== ELEMENT REFERENCES =====
  var navbar          = document.getElementById('navbar');
  var hamburger       = document.getElementById('hamburger');
  var navLinks        = document.getElementById('navLinks');
  var navLinkItems    = document.querySelectorAll('.nav-link');
  var scrollTopBtn    = document.getElementById('scrollTopBtn');
  var sectionTitle    = document.getElementById('sectionTitle');
  var sectionTitleTxt = document.getElementById('sectionTitleText');
  var heroContent     = document.getElementById('heroContent');
  var sendBtn         = document.getElementById('sendBtn');
  var formMsg         = document.getElementById('formMsg');
  var filterBtns      = document.querySelectorAll('.filter-btn');
  var galleryItems    = document.querySelectorAll('.gallery-item');
  var sections        = document.querySelectorAll('section[id]');

  // ===== 1. NAVBAR SCROLL EFFECT =====
  function handleNavbarScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ===== 2. SCROLL TO TOP BUTTON =====
  function handleScrollTopBtn() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== 3. HERO SECTION TITLE OVERLAY =====
  function showSectionTitle(sectionName) {
    heroContent.style.opacity = '0';
    sectionTitleTxt.textContent = sectionName;
    sectionTitle.classList.add('visible');

    setTimeout(function () {
      sectionTitle.classList.remove('visible');
      heroContent.style.opacity = '1';
    }, 1800);
  }

  navLinkItems.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId    = link.getAttribute('href');
      var sectionName = link.getAttribute('data-section');
      var targetEl    = document.querySelector(targetId);

      if (targetEl && targetId !== '#home') {
        showSectionTitle(sectionName);
      }

      navLinkItems.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');

      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // ===== 4. HAMBURGER MENU (MOBILE) =====
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });

  // ===== 5. ACTIVE NAV LINK ON SCROLL =====
  function highlightActiveSection() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      var top    = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinkItems.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ===== 6. SCROLL REVEAL ANIMATION =====
  function setupReveal() {
    var revealTargets = document.querySelectorAll(
      '.highlight-card, .testimonial-card, .gallery-item, .about-text, ' +
      '.about-images, .contact-info-col, .contact-form-col, .menu-image-wrap'
    );

    revealTargets.forEach(function (el) {
      el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ===== 7. GALLERY FILTER =====
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      galleryItems.forEach(function (item) {
        var category = item.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ===== 8. CONTACT FORM VALIDATION =====
  sendBtn.addEventListener('click', function () {
    var name    = document.getElementById('name').value.trim();
    var email   = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();
    sendBtn.textContent = 'Sending...';

    function showMsg(text, type) {
      formMsg.textContent = text;
      formMsg.className   = 'form-msg ' + type;
    }

    if (name === '') { showMsg('⚠️ Please enter your name.', 'error'); return; }
    if (email === '' || !email.includes('@') || !email.includes('.')) { showMsg('⚠️ Please enter a valid email address.', 'error'); return; }
    if (message === '') { showMsg('⚠️ Please write a message before sending.', 'error'); return; }
    console.log("New Message Received:");
console.log("Name:", name);
console.log("Email:", email);
console.log("Message:", message);
    showMsg('✅ Thank you, ' + name + '! Your message has been received. Our team will contact you soon.', 'success');
    sendBtn.textContent = 'Message Sent ✓';
    sendBtn.disabled    = true;

    document.getElementById('name').value    = '';
    document.getElementById('email').value   = '';
    document.getElementById('message').value = '';

    setTimeout(function () {
      sendBtn.textContent = 'Send Message ✉️';
      sendBtn.disabled    = false;
      formMsg.className   = 'form-msg hidden';
    }, 4000);
  });

  // ===== 9. SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href');
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        var offset    = navbar.offsetHeight + 20;
        var targetPos = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ===== 10. MAIN SCROLL LISTENER =====
  window.addEventListener('scroll', function () {
    handleNavbarScroll();
    handleScrollTopBtn();
    highlightActiveSection();
  });

  // ===== INIT =====
  handleNavbarScroll();
  handleScrollTopBtn();
  setupReveal();

});