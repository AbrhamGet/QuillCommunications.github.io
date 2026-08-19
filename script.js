/* Quill Communications — shared interactions
   CONFIG — paste your Formspree endpoint between the quotes below.
   (Formspree dashboard → your form → it looks like https://formspree.io/f/abcdwxyz)
   Both the contact box and the Work With Us form use this one value.
   Until it's set, messages fall back to opening a pre-filled Gmail window. */
window.FORM_ENDPOINT = "";

document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Cursor dot */
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (fine && !reduceMotion) {
    var cur = document.createElement('div');
    cur.className = 'qcursor';
    document.body.appendChild(cur);
    document.addEventListener('mousemove', function (e) {
      cur.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px) translate(-50%,-50%)';
    });
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('a, button, .pick, .opt, summary')) cur.classList.add('is-hover');
      else cur.classList.remove('is-hover');
    });
  }

  /* Button ripple */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.btn');
    if (!btn || reduceMotion) return;
    var r = btn.getBoundingClientRect();
    var rip = document.createElement('span');
    rip.className = 'ripple';
    var size = Math.max(r.width, r.height);
    rip.style.width = rip.style.height = size + 'px';
    rip.style.left = (e.clientX - r.left - size / 2) + 'px';
    rip.style.top = (e.clientY - r.top - size / 2) + 'px';
    btn.appendChild(rip);
    setTimeout(function () { if (rip.parentNode) rip.parentNode.removeChild(rip); }, 600);
  });

  /* Kinetic word rotation in hero */
  var kin = document.querySelector('.kin');
  if (kin && !reduceMotion) {
    var words = JSON.parse(kin.getAttribute('data-words'));
    var idx = 0;
    setInterval(function () {
      idx = (idx + 1) % words.length;
      kin.innerHTML = '<span class="kin__word">' + words[idx] + '</span>';
    }, 2600);
  }

  /* Count-up */
  function runCountUp(el) {
    var raw = el.getAttribute('data-count-to');
    var target = parseFloat(raw);
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = raw.indexOf('.') > -1 ? raw.split('.')[1].length : 0;
    if (reduceMotion) { el.textContent = target.toFixed(decimals) + suffix; return; }
    var duration = 1700, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-visible');
        ro.unobserve(en.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { ro.observe(el); });

    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        runCountUp(en.target);
        co.unobserve(en.target);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count-to]').forEach(function (el) { co.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
    document.querySelectorAll('[data-count-to]').forEach(runCountUp);
  }

  /* Contact box (homepage) */
  var cbox = document.getElementById('contactBox');
  if (cbox) {
    cbox.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = document.getElementById('cbName').value.trim();
      var reach = document.getElementById('cbEmail').value.trim();
      var msg = document.getElementById('cbMsg').value.trim();
      var cerr = document.getElementById('cbErr');
      if (!name || !reach || !msg) {
        cerr.textContent = 'All three fields, please — otherwise we can\u2019t reply.';
        cerr.classList.add('is-on');
        return;
      }
      cerr.classList.remove('is-on');
      var sendBtn = document.getElementById('cbSend');
      sendBtn.disabled = true;
      sendBtn.textContent = 'Sending\u2026';
      var body = 'Message from Quill website contact box\n\nName: ' + name + '\nContact: ' + reach + '\n\n' + msg;

      function done() {
        sendBtn.textContent = '\u2713 Sent — we\u2019ll follow up within 2 days';
        cbox.querySelectorAll('.finput').forEach(function (f) { f.value = ''; });
        setTimeout(function () {
          sendBtn.disabled = false;
          sendBtn.textContent = 'Send message';
        }, 6000);
      }
      function fallback() {
        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=Abrhamg.fetene@gmail.com' +
          '&su=' + encodeURIComponent('Message from Quill website') +
          '&body=' + encodeURIComponent(body), '_blank');
        done();
      }
      if (!window.FORM_ENDPOINT) { fallback(); return; }
      fetch(window.FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ subject: 'Message from Quill website', name: name, contact: reach, message: msg, email: reach.indexOf('@') > -1 ? reach : 'not-provided@quill.form' })
      }).then(function (r) { if (r.ok) done(); else fallback(); }).catch(fallback);
    });
  }

  /* Floating CTA after first screen */
  var floatCta = document.querySelector('.float-cta');
  if (floatCta) {
    var ticking = false;
    function upd() {
      floatCta.classList.toggle('is-on', window.scrollY > window.innerHeight * 0.7);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(upd); ticking = true; }
    }, { passive: true });
    upd();
  }
});
