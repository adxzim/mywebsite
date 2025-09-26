// js/main.js
// Small vanilla JS for nav toggle, project filtering, and contact form validation.

document.addEventListener('DOMContentLoaded', function () {
  // Set year in footers
  var year = new Date().getFullYear();
  ['year', 'yearProjects', 'yearAbout', 'yearContact'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.textContent = year;
  });

  // Accessible nav toggle (works per-page)
  Array.prototype.slice.call(document.querySelectorAll('.nav-toggle')).forEach(function (btn) {
    var attr = btn.getAttribute('aria-controls');
    btn.addEventListener('click', function () {
      var nav;
      if (attr) nav = document.getElementById(attr);
      // fallback: find next nav element
      if (!nav) nav = btn.nextElementSibling;
      if (!nav) return;
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      // set aria-expanded on nav for CSS selectors if desired
      nav.setAttribute('aria-expanded', String(!expanded));
      // toggle display for small screens
      if (!expanded) nav.style.display = 'block';
      else nav.style.display = '';
    });
  });

  // Project filtering (on projects.html)
  (function projectFiltering(){
    var filters = document.querySelectorAll('.filter-btn');
    var cards = Array.prototype.slice.call(document.querySelectorAll('.project-card'));
    if (!filters.length || !cards.length) return;

    function setActive(btn){
      filters.forEach(function(b){
        b.classList.remove('active');
        b.setAttribute('aria-pressed','false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed','true');
    }

    function filterBy(tag){
      cards.forEach(function(card){
        var tags = (card.getAttribute('data-tags') || '').split(',').map(function(t){ return t.trim(); });
        if (tag === 'all' || tags.indexOf(tag) !== -1){
          card.style.display = '';
          card.setAttribute('tabindex','0');
        } else {
          card.style.display = 'none';
          card.setAttribute('tabindex','-1');
        }
      });
    }

    filters.forEach(function(btn){
      btn.addEventListener('click', function(){
        var tag = btn.getAttribute('data-tag') || 'all';
        setActive(btn);
        filterBy(tag);
      });
    });
  })();

  // Contact form validation + mailto fallback
  (function contactForm(){
    var form = document.getElementById('contactForm');
    if (!form) return;

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var message = document.getElementById('message');
    var errName = document.getElementById('err-name');
    var errEmail = document.getElementById('err-email');
    var errMessage = document.getElementById('err-message');
    var status = document.getElementById('formStatus');
    var mailtoBtn = document.getElementById('mailtoFallback');

    function clearErrors(){
      [errName, errEmail, errMessage].forEach(function(e){ if(e) e.textContent=''; });
      status.textContent = '';
    }

    function validEmail(e){
      // simple email regex (not perfect but acceptable for client-side)
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    }

    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      clearErrors();
      var ok = true;
      if (!name.value.trim()){
        errName.textContent = 'Please enter your name.';
        ok = false;
      }
      if (!email.value.trim() || !validEmail(email.value.trim())){
        errEmail.textContent = 'Please enter a valid email.';
        ok = false;
      }
      if (!message.value.trim()){
        errMessage.textContent = 'Please enter a message.';
        ok = false;
      }
      if (!ok){
        status.textContent = 'Please fix the errors above.';
        return;
      }

      // Progressive enhancement: attempt to POST if form action set in future,
      // but for this static site we open mail client via mailto (fallback).
      var subject = encodeURIComponent('Contact from portfolio: ' + name.value.trim());
      var body = encodeURIComponent('Name: ' + name.value.trim() + '\n\nMessage:\n' + message.value.trim() + '\n\nEmail: ' + email.value.trim());
      var mailto = 'mailto:you@example.com?subject=' + subject + '&body=' + body;
      // Open mail client
      window.location.href = mailto;
      status.textContent = 'Opened your email client. If nothing happened, use the "Open Email App" button.';
    });

    if (mailtoBtn){
      mailtoBtn.addEventListener('click', function(){
        var subject = encodeURIComponent('Contact from portfolio');
        var body = encodeURIComponent('');
        window.location.href = 'mailto:you@example.com?subject=' + subject + '&body=' + body;
      });
    }
  })();
});
