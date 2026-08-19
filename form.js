/* Quill — Work With Us adaptive form.
   The Formspree endpoint is configured once, at the top of script.js. */

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('wform');
  if (!form) return;

  var steps = Array.prototype.slice.call(form.querySelectorAll('.fstep'));
  var bar = form.querySelector('.wform__bar');
  var stepLabel = form.querySelector('.wform__stepLabel');
  var backBtn = document.getElementById('fBack');
  var nextBtn = document.getElementById('fNext');
  var err = form.querySelector('.err');
  var current = 0;

  /* ----- Service definitions with adaptive questions ----- */
  var SERVICES = {
    content: { name: 'Content Creation', qs: [
      { key: 'strategy', label: 'Do you already have a content strategy?', opts: ['We have one', 'We need a new one', 'Not sure — advise us'] },
      { key: 'volume', label: 'How many pieces of content per month?', opts: ['4', '8', '12', '16+', 'Suggest for us'] }
    ]},
    video: { name: 'Video Production', qs: [
      { key: 'heaviness', label: 'How heavy is the production?', opts: ['Light (phone-grade, fast)', 'Medium (lighting + setup)', 'Heavy (full crew)'] },
      { key: 'shoots', label: 'Shoots per month?', opts: ['1', '2', '3+', 'One-off project'] }
    ]},
    event: { name: 'Event Documentation', qs: [
      { key: 'scale', label: 'Scale of the event?', opts: ['Small (under 100 people)', 'Medium (100–500)', 'Large (500+)'] },
      { key: 'timing', label: 'When is it?', opts: ['Within 2 weeks', 'Within a month', '1–3 months out', 'Date not set'] }
    ]},
    tvc: { name: 'TVC (TV Commercial)', qs: [
      { key: 'script', label: 'Where does the concept stand?', opts: ['Script ready', 'Rough idea', 'Need it from scratch'] },
      { key: 'airing', label: 'Where will it air?', opts: ['TV', 'YouTube / digital', 'Both'] }
    ]},
    smm: { name: 'Social Media Management', qs: [
      { key: 'package', label: 'Which package are you leaning toward?', opts: ['Standard (50,000 birr)', 'Growth (70,000 birr)', 'Gold (110,000 birr)', 'Not sure yet'] },
      { key: 'platforms', label: 'Which platforms matter most?', opts: ['TikTok', 'Instagram', 'Facebook', 'Telegram', 'All of them'], multi: true }
    ]},
    ads: { name: 'Ad Running & Optimization', qs: [
      { key: 'platforms', label: 'Where should the ads run?', opts: ['Meta (Facebook/Instagram)', 'Google', 'Both'] },
      { key: 'budget', label: 'Rough monthly ad budget?', opts: ['Under 20K birr', '20–50K birr', '50–150K birr', '150K+ birr', 'Advise us'] }
    ]},
    influencer: { name: 'Influencer Marketing', qs: [
      { key: 'shape', label: 'What shape should it take?', opts: ['One campaign', 'Ongoing partnerships', 'Not sure yet'] }
    ]},
    community: { name: 'Community Management', qs: [
      { key: 'volume', label: 'How busy are your inboxes/comments?', opts: ['Light', 'Steady', 'Heavy — we can\u2019t keep up'] }
    ]},
    seo: { name: 'SEO', qs: [
      { key: 'site', label: 'Do you have a website already?', opts: ['Yes, live', 'In progress', 'No — need one too'] }
    ]},
    webdev: { name: 'Website Development', qs: [
      { key: 'kind', label: 'What are we building?', opts: ['New site from scratch', 'Redesign of existing', 'E-commerce store'] }
    ]}
  };

  var picked = [];      // service keys in pick order
  var answers = {};     // answers[serviceKey][qKey] = value or [values]

  /* ----- Step 1: service picks ----- */
  form.querySelectorAll('.pick').forEach(function (p) {
    p.addEventListener('click', function () {
      var key = p.getAttribute('data-svc');
      var i = picked.indexOf(key);
      if (i > -1) { picked.splice(i, 1); p.classList.remove('is-sel'); }
      else { picked.push(key); p.classList.add('is-sel'); }
      var t = p.querySelector('.tick');
      if (t) t.textContent = p.classList.contains('is-sel') ? '\u2713' : '';
    });
  });

  /* ----- Step 2: build adaptive questions ----- */
  function buildQuestions() {
    var host = document.getElementById('qHost');
    host.innerHTML = '';
    picked.forEach(function (key) {
      var svc = SERVICES[key];
      if (!answers[key]) answers[key] = {};
      var g = document.createElement('div');
      g.className = 'qgroup';
      var h = document.createElement('h3');
      h.innerHTML = FEATHER_SVG + svc.name;
      g.appendChild(h);
      svc.qs.forEach(function (q) {
        var qd = document.createElement('div');
        qd.className = 'q';
        var lab = document.createElement('label');
        lab.className = 'qlab';
        lab.textContent = q.label;
        qd.appendChild(lab);
        var row = document.createElement('div');
        row.className = 'optrow';
        q.opts.forEach(function (optText) {
          var o = document.createElement('button');
          o.type = 'button';
          o.className = 'opt';
          o.textContent = optText;
          o.addEventListener('click', function () {
            if (q.multi) {
              var arr = answers[key][q.key] || [];
              var ix = arr.indexOf(optText);
              if (ix > -1) { arr.splice(ix, 1); o.classList.remove('is-sel'); }
              else { arr.push(optText); o.classList.add('is-sel'); }
              answers[key][q.key] = arr;
            } else {
              answers[key][q.key] = optText;
              row.querySelectorAll('.opt').forEach(function (x) { x.classList.remove('is-sel'); });
              o.classList.add('is-sel');
            }
          });
          row.appendChild(o);
        });
        qd.appendChild(row);
        g.appendChild(qd);
      });
      host.appendChild(g);
    });
  }

  /* ----- Step 3: call preference toggle ----- */
  var callOpts = document.getElementById('callOpts');
  form.querySelectorAll('[data-call]').forEach(function (o) {
    o.addEventListener('click', function () {
      form.querySelectorAll('[data-call]').forEach(function (x) { x.classList.remove('is-sel'); });
      o.classList.add('is-sel');
      callOpts.style.display = o.getAttribute('data-call') === 'yes' ? 'block' : 'none';
    });
  });
  form.querySelectorAll('#callOpts .opt').forEach(function (o) {
    o.addEventListener('click', function () { o.classList.toggle('is-sel'); });
  });

  /* ----- Navigation ----- */
  function show(i) {
    steps.forEach(function (s, ix) { s.classList.toggle('is-on', ix === i); });
    current = i;
    bar.style.width = ((i + 1) / steps.length * 100) + '%';
    stepLabel.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
    backBtn.style.visibility = i === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = i === steps.length - 1 ? 'Send it \u2192' : 'Next \u2192';
    err.classList.remove('is-on');
    window.scrollTo({ top: form.offsetTop - 80, behavior: 'smooth' });
  }

  function validate(i) {
    if (i === 0 && picked.length === 0) { err.textContent = 'Pick at least one service to continue.'; return false; }
    if (i === 2) {
      var name = document.getElementById('fName').value.trim();
      var biz = document.getElementById('fBiz').value.trim();
      var email = document.getElementById('fEmail').value.trim();
      var phone = document.getElementById('fPhone').value.trim();
      if (!name || !biz || (!email && !phone)) {
        err.textContent = 'We need your name, business, and at least one way to reach you.';
        return false;
      }
    }
    return true;
  }

  backBtn.addEventListener('click', function () { if (current > 0) show(current - 1); });
  nextBtn.addEventListener('click', function () {
    if (!validate(current)) { err.classList.add('is-on'); return; }
    if (current === 0) buildQuestions();
    if (current < steps.length - 1) { show(current + 1); return; }
    submit();
  });

  /* ----- Compose + submit ----- */
  function compose() {
    var lines = [];
    lines.push('NEW PROJECT INQUIRY — Quill website form');
    lines.push('');
    lines.push('Services: ' + picked.map(function (k) { return SERVICES[k].name; }).join(', '));
    lines.push('');
    picked.forEach(function (k) {
      lines.push('— ' + SERVICES[k].name + ' —');
      SERVICES[k].qs.forEach(function (q) {
        var v = answers[k] && answers[k][q.key];
        lines.push(q.label + ' ' + (Array.isArray(v) ? v.join(', ') : (v || '(not answered)')));
      });
      lines.push('');
    });
    lines.push('Name: ' + document.getElementById('fName').value.trim());
    lines.push('Business: ' + document.getElementById('fBiz').value.trim());
    lines.push('Email: ' + document.getElementById('fEmail').value.trim());
    lines.push('Phone: ' + document.getElementById('fPhone').value.trim());
    var wantsCall = form.querySelector('[data-call].is-sel');
    lines.push('Wants a call: ' + (wantsCall ? wantsCall.textContent : '(not answered)'));
    if (wantsCall && wantsCall.getAttribute('data-call') === 'yes') {
      var slots = [];
      form.querySelectorAll('#callOpts .opt.is-sel').forEach(function (o) { slots.push(o.textContent); });
      lines.push('Preferred call times (Ethiopian time): ' + (slots.join(', ') || '(none picked)'));
    }
    var msg = document.getElementById('fMsg').value.trim();
    if (msg) { lines.push(''); lines.push('Message: ' + msg); }
    return lines.join('\n');
  }

  function submit() {
    var body = compose();
    nextBtn.disabled = true;
    nextBtn.textContent = 'Sending\u2026';

    function done() {
      form.querySelector('.wform__steps').style.display = 'none';
      form.querySelector('.wform__nav').style.display = 'none';
      bar.style.width = '100%';
      document.getElementById('fDone').style.display = 'block';
    }
    function fallback() {
      // open a pre-filled Gmail compose so nothing is lost
      var url = 'https://mail.google.com/mail/?view=cm&fs=1&to=Abrhamg.fetene@gmail.com' +
        '&su=' + encodeURIComponent('Project inquiry — Quill Communications') +
        '&body=' + encodeURIComponent(body);
      window.open(url, '_blank');
      done();
    }

    if (!window.FORM_ENDPOINT) { fallback(); return; }
    fetch(window.FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        subject: 'Project inquiry — Quill Communications',
        services: picked.map(function (k) { return SERVICES[k].name; }).join(', '),
        details: body,
        email: document.getElementById('fEmail').value.trim() || 'not-provided@quill.form',
        name: document.getElementById('fName').value.trim()
      })
    }).then(function (res) {
      if (res.ok) done(); else fallback();
    }).catch(fallback);
  }

  var FEATHER_SVG = document.getElementById('featherTpl') ? document.getElementById('featherTpl').innerHTML : '';
  show(0);
});
