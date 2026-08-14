/* =========================================================
   EasyAfrik — Landing page · interactions
   Aucune dépendance externe.
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Année du copyright ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
  }

  if (burger && nav && navLinks) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        burger.focus();
      }
    });

    // Referme le menu si on repasse en desktop
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (e) {
      if (e.matches) closeMenu();
    });
  }

  /*
    Les tarifs n'ont plus de sélecteur mensuel/promo : chaque carte affiche le
    prix plein en titre et l'offre du 1er mois juste en dessous. Les deux
    montants étant visibles ensemble, il n'y a plus d'état à piloter ici.
  */

  /* ---------- Apparition au scroll ---------- */
  var revealTargets = document.querySelectorAll(
    '.sec-head, .vs__col, .pillar, .feat__copy, .feat__demo, .ai-card,' +
    '.pay-card, .zero, .ops__card, .table-scroll, .testi, .plan, .faq__item, .final__in'
  );

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    revealTargets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Démo AI Cloner : URL qui se tape toute seule ---------- */
  var typeEl = document.getElementById('typeUrl');
  if (typeEl) {
    var urls = [
      'boutique-gagnante.com/produit',
      'topseller-store.com/offre-1',
      'winning-shop.co/best-seller'
    ];

    if (reduceMotion) {
      typeEl.textContent = urls[0];
    } else {
      var u = 0, c = 0, deleting = false;

      var tick = function () {
        var current = urls[u];
        c += deleting ? -1 : 1;
        typeEl.textContent = current.slice(0, c);

        var delay = deleting ? 34 : 68;
        if (!deleting && c === current.length) {
          deleting = true;
          delay = 2200;
        } else if (deleting && c === 0) {
          deleting = false;
          u = (u + 1) % urls.length;
          delay = 420;
        }
        setTimeout(tick, delay);
      };

      // Ne démarre l'animation que lorsque la démo est visible
      var cloner = typeEl.closest('.cloner');
      if ('IntersectionObserver' in window && cloner) {
        var io2 = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            io2.disconnect();
            tick();
          }
        }, { threshold: 0.25 });
        io2.observe(cloner);
      } else {
        tick();
      }
    }
  }

  /* ---------- FAQ : une seule réponse ouverte à la fois ---------- */
  var faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
