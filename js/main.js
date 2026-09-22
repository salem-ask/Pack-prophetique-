(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var CHARIOW_LINK = CFG.CHARIOW_LINK || "#";
  var OFFER_DURATION_HOURS = CFG.OFFER_DURATION_HOURS || 48;
  var OFFER_CYCLE_ANCHOR = CFG.OFFER_CYCLE_ANCHOR || "";
  var META_PIXEL_ID = CFG.META_PIXEL_ID || "";
  var images = CFG.images || {};

  /* ---------------------------------------------------------
   * 1. Injection des images centralisées
   * --------------------------------------------------------- */
  document.querySelectorAll("[data-img]").forEach(function (el) {
    var key = el.getAttribute("data-img");
    if (images[key]) {
      el.setAttribute("src", images[key]);
    }
  });

  /* ---------------------------------------------------------
   * 2. Meta Pixel (optionnel, ne casse rien si vide)
   * --------------------------------------------------------- */
  var pixelReady = false;
  if (META_PIXEL_ID) {
    /* eslint-disable */
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    try {
      window.fbq("init", META_PIXEL_ID);
      window.fbq("track", "PageView");
      window.fbq("track", "ViewContent", {
        content_name: "Spécial Pack Prophétique",
        content_type: "product"
      });
      pixelReady = true;
    } catch (err) {
      pixelReady = false;
    }
  }

  function goToCheckout(e) {
    if (e) e.preventDefault();
    if (pixelReady && window.fbq) {
      try {
        window.fbq("track", "InitiateCheckout", {
          content_name: "Spécial Pack Prophétique",
          content_type: "product"
        });
      } catch (err) {
        /* silencieux : le clic ne doit jamais être bloqué */
      }
    }
    window.location.href = CHARIOW_LINK;
  }

  document.querySelectorAll("[data-cta]").forEach(function (btn) {
    btn.setAttribute("href", CHARIOW_LINK);
    btn.addEventListener("click", goToCheckout);
  });

  /* ---------------------------------------------------------
   * 3. Compte à rebours 48h auto-renouvelable
   *
   * Le cycle est calé sur OFFER_CYCLE_ANCHOR : à chaque expiration d'un
   * cycle de OFFER_DURATION_HOURS, un nouveau cycle démarre aussitôt à
   * 48h, indéfiniment. Le compteur n'affiche donc jamais de valeur
   * négative et ne se bloque jamais à zéro.
   * --------------------------------------------------------- */
  function startCountdown() {
    var wrap = document.getElementById("countdown");
    if (!wrap) return;

    var durationMs = OFFER_DURATION_HOURS * 60 * 60 * 1000;
    var anchor = OFFER_CYCLE_ANCHOR ? new Date(OFFER_CYCLE_ANCHOR).getTime() : 0;
    if (isNaN(anchor)) anchor = 0;

    var elDays = document.getElementById("cd-days");
    var elHours = document.getElementById("cd-hours");
    var elMinutes = document.getElementById("cd-minutes");
    var elSeconds = document.getElementById("cd-seconds");

    function pad(n) {
      return String(n).padStart(2, "0");
    }

    function currentCycleEnd(now) {
      var elapsed = now - anchor;
      var cyclesPassed = Math.floor(elapsed / durationMs);
      return anchor + (cyclesPassed + 1) * durationMs;
    }

    function render() {
      var now = Date.now();
      var diff = currentCycleEnd(now) - now;
      if (diff < 0) diff = 0;

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      var minutes = Math.floor((diff / (1000 * 60)) % 60);
      var seconds = Math.floor((diff / 1000) % 60);

      elDays.textContent = pad(days);
      elHours.textContent = pad(hours);
      elMinutes.textContent = pad(minutes);
      elSeconds.textContent = pad(seconds);
    }

    render();
    setInterval(render, 1000);
  }
  startCountdown();

  /* ---------------------------------------------------------
   * 4. FAQ accordéon
   * --------------------------------------------------------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var question = item.querySelector(".faq-question");
    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item").forEach(function (i) {
        i.classList.remove("is-open");
        i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------------------------------------------------------
   * 5. Animations d'apparition au scroll (désactivables)
   * --------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;

  if (!prefersReducedMotion && !isLowPower && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------------------------------------------------------
   * 6. Barre CTA sticky mobile
   * --------------------------------------------------------- */
  var stickyBar = document.getElementById("sticky-cta");
  var hero = document.getElementById("hero");
  if (stickyBar && hero && "IntersectionObserver" in window) {
    var heroObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          stickyBar.classList.toggle("is-visible", !entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    heroObserver.observe(hero);
  } else if (stickyBar) {
    stickyBar.classList.add("is-visible");
  }
})();
