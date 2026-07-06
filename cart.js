/* Salxir cart + Stripe checkout (mirrors salxir.com production flow) */
(function () {
  'use strict';

  // Same Supabase project + edge function used by the production site.
  var SUPABASE_URL = 'https://dkorgvcwuzzoykxussac.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrb3JndmN3dXp6b3lreHVzc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMDg5MTEsImV4cCI6MjA2MDU4NDkxMX0.nr8TwC6CP5ylzR1weyxdKKAsDWFrm_9oLaLB-rL0glY';

  // NOTE: production maps every product to this single Stripe price (€15).
  // Replace priceId per product when real Stripe prices are created.
  var DEFAULT_PRICE_ID = 'price_1TnUKjGjelF8NP3aQG43H0Lk';

  var PRODUCTS = {
    'shilajit-resin':                    { name: 'Shilajit Resin (20g)',                 price: 15, img: 'images/shilajitresin.png',              priceId: DEFAULT_PRICE_ID },
    'shilajit-ashwagandha':              { name: 'Shilajit + Ashwagandha Capsules',      price: 10, img: 'images/ShilajitAshwagandhacapsules.png', priceId: DEFAULT_PRICE_ID },
    'shilajit-honey-sticks':             { name: 'Shilajit Honey Sticks',                price: 15, img: 'images/shilajithoney.png',              priceId: DEFAULT_PRICE_ID },
    'shilajit-ashwagandha-honey-sticks': { name: 'Shilajit + Ashwagandha Honey Sticks',  price: 18, img: 'images/shilajitashwagandhahoney.png',   priceId: DEFAULT_PRICE_ID },
    'shilajit-powder-capsules':          { name: 'Shilajit Capsules — Shilajit+',        price: 15, img: 'images/shilajitcaps.png',               priceId: DEFAULT_PRICE_ID },
    'shilajit-tablets':                  { name: 'Shilajit Tablets',                     price: 15, img: 'images/shilajittabs.png',               priceId: DEFAULT_PRICE_ID },
    'pink-salt-table':                   { name: 'Pink Salt — Table Salt',               price: 4,  img: 'images/pinksalt.png',                   priceId: DEFAULT_PRICE_ID },
    'sea-buckthorn-powder':              { name: 'Sea Buckthorn Powder',                 price: 9,  img: 'images/seabuckpowder.png',              priceId: DEFAULT_PRICE_ID },
    'moringa-powder':                    { name: 'Moringa Powder',                       price: 9,  img: 'images/moringapowder.png',              priceId: DEFAULT_PRICE_ID },
    'turmeric-powder':                   { name: 'Salxir Premium Turmeric Powder',       price: 10, img: 'images/turmericpowder.png',             priceId: DEFAULT_PRICE_ID },
    'tumur-tea':                         { name: 'Tumoro Tea',                           price: 9,  img: 'images/tumorotea.png',                  priceId: DEFAULT_PRICE_ID },
    'moringa-capsules':                  { name: 'Moringa Capsules',                     price: 12, img: 'images/moringacaps.png',                priceId: DEFAULT_PRICE_ID },
    'sea-buckthorn-capsules':            { name: 'Sea Buckthorn Capsules',               price: 12, img: 'images/seabuckcaps.png',                priceId: DEFAULT_PRICE_ID },
    'sea-buckthorn-oil':                 { name: 'Sea Buckthorn Oil',                    price: 15, img: 'images/seabuckoil.png',                 priceId: DEFAULT_PRICE_ID }
  };

  var KEY = 'salxir_cart';

  function getCart() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function setCart(c) {
    localStorage.setItem(KEY, JSON.stringify(c));
    updateBadge();
  }
  function cartCount() {
    var c = getCart(), n = 0;
    for (var k in c) n += c[k];
    return n;
  }
  function updateBadge() {
    document.querySelectorAll('.cart').forEach(function (el) {
      el.setAttribute('data-count', String(cartCount()));
    });
  }
  function euro(n) { return '€' + n.toFixed(2); }

  function addToCart(slug) {
    if (!PRODUCTS[slug]) return;
    var c = getCart();
    c[slug] = (c[slug] || 0) + 1;
    setCart(c);
  }
  function setQty(slug, qty) {
    var c = getCart();
    if (qty <= 0) delete c[slug]; else c[slug] = Math.min(10, qty);
    setCart(c);
    renderCartPage();
  }

  /* ---- cart page ---- */
  function renderCartPage() {
    var root = document.getElementById('cart-root');
    if (!root) return;
    var c = getCart();
    var slugs = Object.keys(c);
    var form = document.getElementById('checkout-form');
    if (!slugs.length) {
      root.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><a href="/shop" class="btn btn-black">Browse the Shop</a></div>';
      if (form) form.style.display = 'none';
      return;
    }
    if (form) form.style.display = '';
    var subtotal = 0;
    var rows = slugs.map(function (slug) {
      var p = PRODUCTS[slug];
      var line = p.price * c[slug];
      subtotal += line;
      return '<div class="cart-row">' +
        '<img src="' + p.img + '" alt="' + p.name + '">' +
        '<div class="cart-row-info"><b>' + p.name + '</b><span>' + euro(p.price) + ' each</span></div>' +
        '<div class="qty"><button type="button" data-dec="' + slug + '">−</button><span>' + c[slug] + '</span><button type="button" data-inc="' + slug + '">+</button></div>' +
        '<div class="cart-row-total">' + euro(line) + '</div>' +
        '</div>';
    }).join('');
    root.innerHTML = rows +
      '<div class="cart-summary"><span>Subtotal</span><b>' + euro(subtotal) + '</b></div>' +
      '<p class="cart-note">Shipping (€5, free pickup) and final totals are confirmed on the secure Stripe payment page.</p>';
    root.querySelectorAll('[data-inc]').forEach(function (b) {
      b.addEventListener('click', function () { setQty(b.dataset.inc, (getCart()[b.dataset.inc] || 0) + 1); });
    });
    root.querySelectorAll('[data-dec]').forEach(function (b) {
      b.addEventListener('click', function () { setQty(b.dataset.dec, (getCart()[b.dataset.dec] || 0) - 1); });
    });
  }

  /* ---- checkout (same contract as production stripe-checkout function) ---- */
  function checkout(e) {
    e.preventDefault();
    var c = getCart();
    var slugs = Object.keys(c);
    if (!slugs.length) return;

    var name = document.getElementById('co-name').value.trim();
    var email = document.getElementById('co-email').value.trim();
    var delivery = document.getElementById('co-delivery').value;
    var consent = document.getElementById('co-consent').checked;
    var msg = document.getElementById('co-msg');
    var btn = document.getElementById('co-btn');
    if (!name || !email) { msg.textContent = 'Please fill in your name and email.'; return; }

    // Deployed stripe-checkout function accepts a single price_id + quantity.
    // All products share one Stripe price in production, so total quantity
    // yields the same charge as per-line items. Swap to line_items once the
    // updated function (in salxir-website repo) is deployed.
    var totalQty = slugs.reduce(function (n, slug) { return n + c[slug]; }, 0);

    var payload = {
      price_id: DEFAULT_PRICE_ID,
      quantity: totalQty,
      success_url: window.location.origin + '/success',
      cancel_url: window.location.origin + '/cart',
      mode: 'payment',
      shipping_details: { name: name, email: email, deliveryMethod: delivery },
      metadata: {
        deliveryMethod: delivery,
        consent: consent ? 'true' : 'false',
        cart_items: JSON.stringify(slugs.map(function (slug) {
          return { slug: slug, name: PRODUCTS[slug].name, quantity: c[slug] };
        }))
      }
    };

    btn.disabled = true;
    btn.textContent = 'Redirecting to secure payment…';
    msg.textContent = '';

    fetch(SUPABASE_URL + '/functions/v1/stripe-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
      },
      body: JSON.stringify(payload)
    }).then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok || !res.d.url) throw new Error(res.d.error || 'Checkout failed');
        window.location.replace(res.d.url);
      })
      .catch(function (err) {
        btn.disabled = false;
        btn.textContent = 'Proceed to Payment';
        msg.textContent = err.message || 'Something went wrong. Please try again.';
      });
  }

  /* ---- init ---- */
  document.addEventListener('DOMContentLoaded', function () {
    updateBadge();
    document.querySelectorAll('.add-to-cart[data-slug]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        addToCart(btn.dataset.slug);
        var t = btn.textContent;
        btn.textContent = 'Added ✓';
        setTimeout(function () { btn.textContent = t; }, 1200);
      });
    });
    renderCartPage();
    var form = document.getElementById('checkout-form');
    if (form) form.addEventListener('submit', checkout);
    // success page: clear cart
    if (document.getElementById('order-success')) { localStorage.removeItem(KEY); updateBadge(); }
  });
})();

/* category filter chips */
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var chips = document.querySelectorAll('.chip[data-filter]');
    if (!chips.length) return;
    chips.forEach(function(ch){
      ch.addEventListener('click', function(){
        chips.forEach(function(c){ c.classList.remove('on'); });
        ch.classList.add('on');
        var f = ch.dataset.filter;
        document.querySelectorAll('.scard[data-cat]').forEach(function(card){
          card.style.display = (f === 'all' || card.dataset.cat.split(' ').indexOf(f) > -1) ? '' : 'none';
        });
      });
    });
  });
})();

/* anonymous review form */
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var toggle = document.getElementById('rev-toggle');
    var form = document.getElementById('rev-form');
    if (!toggle || !form) return;
    var rating = 5;
    toggle.addEventListener('click', function(){ form.hidden = !form.hidden; });
    document.querySelectorAll('#rev-pick button').forEach(function(b){
      b.addEventListener('click', function(){
        rating = Number(b.dataset.r);
        document.querySelectorAll('#rev-pick button').forEach(function(x){
          x.classList.toggle('on', Number(x.dataset.r) <= rating);
        });
      });
    });
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var text = document.getElementById('rev-text').value.trim();
      if (!text) return;
      var name = document.getElementById('rev-name').value.trim() || 'Anonymous';
      var stars = '★★★★★'.slice(0, rating);
      var subject = encodeURIComponent('Website review (' + rating + '/5) from ' + name);
      var body = encodeURIComponent('Rating: ' + stars + ' (' + rating + '/5)\nName: ' + name + '\n\n' + text);
      window.location.href = 'mailto:hello@salxir.com?subject=' + subject + '&body=' + body;
      document.getElementById('rev-msg').textContent = 'Thanks, ' + name + '! Your email app opened — press send and we’ll publish your review after a quick check.';
    });
  });
})();

/* ---- modal system + certificates + contact + review popup ---- */
(function () {
  'use strict';

  var STORE_URL = 'https://dkorgvcwuzzoykxussac.supabase.co';
  var STORE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrb3JndmN3dXp6b3lreHVzc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMDg5MTEsImV4cCI6MjA2MDU4NDkxMX0.nr8TwC6CP5ylzR1weyxdKKAsDWFrm_9oLaLB-rL0glY';
  /* Reviews DB (Salxir tools project) — filled at deploy time */
  var REVIEWS_URL = 'https://vfrkgasrjretcgiwgyxt.supabase.co';
  var REVIEWS_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcmtnYXNyanJldGNnaXdneXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjI2MTgsImV4cCI6MjA5Njc5ODYxOH0.YOQ4yk0TdBBYm-ZID_qafMHPpIj4MaEqX1qP50YsM7Q';

  function openModal(html) {
    closeModal();
    var ov = document.createElement('div');
    ov.className = 'modal-ov';
    ov.innerHTML = '<div class="modal-box" role="dialog" aria-modal="true"><button class="modal-x" aria-label="Close">×</button>' + html + '</div>';
    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';
    ov.addEventListener('click', function (e) { if (e.target === ov) closeModal(); });
    ov.querySelector('.modal-x').addEventListener('click', closeModal);
    document.addEventListener('keydown', escClose);
    return ov;
  }
  function escClose(e) { if (e.key === 'Escape') closeModal(); }
  function closeModal() {
    var ov = document.querySelector('.modal-ov');
    if (ov) ov.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', escClose);
  }

  /* certificates on /about */
  function loadCerts() {
    var grid = document.getElementById('cert-grid');
    if (!grid) return;
    var ICONS = { 'Qarshi EOE Certificate': '📜', 'SGS Certification Report': '🔬', 'Laboratory Test Results': '🧪', 'Heavy Metal Analysis': '⚗️', 'Narcotics Analysis': '✅' };
    fetch(STORE_URL + '/rest/v1/product_certificates?select=product_name,certificate_type,issue_date,file_url&order=issue_date.desc', {
      headers: { apikey: STORE_KEY, Authorization: 'Bearer ' + STORE_KEY }
    }).then(function (r) { return r.json(); }).then(function (rows) {
      if (!Array.isArray(rows) || !rows.length) throw new Error('empty');
      grid.innerHTML = rows.map(function (c) {
        var d = new Date(c.issue_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        return '<div class="cert"><div class="ico">' + (ICONS[c.certificate_type] || '📄') + '</div>' +
          '<h3>' + c.certificate_type + '</h3><p>' + c.product_name + '</p>' +
          '<div class="date">Issued: ' + d + '</div>' +
          '<div class="cert-actions"><button class="btn btn-black cert-view" data-url="' + c.file_url + '" data-title="' + c.certificate_type + '">View</button>' +
          '<a class="btn btn-ghost-dark" href="' + c.file_url + '" target="_blank" rel="noopener" download>Download</a></div></div>';
      }).join('');
      grid.querySelectorAll('.cert-view').forEach(function (b) {
        b.addEventListener('click', function () {
          openModal('<h3 class="modal-title">' + b.dataset.title + '</h3><iframe class="cert-frame" src="' + b.dataset.url + '#toolbar=0" title="Certificate"></iframe>' +
            '<a class="btn btn-black" style="margin-top:12px" href="' + b.dataset.url + '" target="_blank" rel="noopener">Open Full Size ↗</a>');
        });
      });
    }).catch(function () {
      grid.innerHTML = '<p style="color:#888">Certificates are temporarily unavailable. Email <a href="mailto:hello@salxir.com">hello@salxir.com</a> for copies.</p>';
    });
  }

  /* business inquiry form (For Businesses page + any .contact-open buttons) */
  function submitInquiry(fields, ui) {
    ui.btn.disabled = true; ui.btn.textContent = 'Sending\u2026';
    return fetch(REVIEWS_URL + '/rest/v1/contact_requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: REVIEWS_KEY, Authorization: 'Bearer ' + REVIEWS_KEY, Prefer: 'return=minimal' },
      body: JSON.stringify(fields)
    }).then(function (r) {
      if (!r.ok) throw new Error('submit failed');
      ui.onSuccess();
    }).catch(function () {
      window.location.href = 'mailto:hello@salxir.com?subject=' + encodeURIComponent('Business inquiry from ' + fields.name) +
        '&body=' + encodeURIComponent(fields.message + '\n\nCompany: ' + (fields.company || '-') + '\nType: ' + fields.inquiry_type);
      ui.btn.disabled = false; ui.btn.textContent = ui.label;
      ui.onFallback();
    });
  }

  function bindBizForm() {
    var form = document.getElementById('biz-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('bz-note');
      var btn = document.getElementById('bz-btn');
      var fields = {
        name: document.getElementById('bz-name').value.trim(),
        email: document.getElementById('bz-email').value.trim(),
        company: document.getElementById('bz-company').value.trim() || null,
        inquiry_type: document.getElementById('bz-type').value,
        message: document.getElementById('bz-msg').value.trim()
      };
      if (!fields.name || !fields.email || !fields.message) { note.textContent = 'Please fill in name, email, and message.'; note.style.color = 'var(--red)'; return; }
      submitInquiry(fields, {
        btn: btn, label: 'Send Inquiry',
        onSuccess: function () {
          form.innerHTML = '<h3>Thank you, ' + fields.name.split(' ')[0] + '! \ud83c\udf89</h3><p style="color:#666;font-size:14.5px">Your inquiry was received. We reply within one business day at <b>' + fields.email + '</b>.</p>';
        },
        onFallback: function () { note.textContent = 'Direct submit unavailable \u2014 your email app opened instead.'; note.style.color = 'var(--red)'; }
      });
    });
  }

  function bindContact() {
    document.querySelectorAll('.contact-open').forEach(function (b) {
      b.addEventListener('click', function () { window.location.href = '/for-businesses#contact'; });
    });
  }

  /* review popup */
  function bindReview() {
    var btn = document.getElementById('rev-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var rating = 5;
      var ov = openModal('<h3 class="modal-title">Write a Review</h3>' +
        '<div class="rev-pick" id="rev-pick"><button type="button" data-r="1">★</button><button type="button" data-r="2">★</button><button type="button" data-r="3">★</button><button type="button" data-r="4">★</button><button type="button" data-r="5" class="on">★</button></div>' +
        '<input id="rev-name" type="text" placeholder="Name (optional — posts as Anonymous)">' +
        '<textarea id="rev-text" rows="4" placeholder="Your experience with Salxir…"></textarea>' +
        '<button class="btn btn-black" id="rev-send" type="button" style="width:100%">Submit Review</button>' +
        '<p class="rev-msg" id="rev-msg">Reviews are published after a quick moderation check.</p>');
      function paint() {
        ov.querySelectorAll('#rev-pick button').forEach(function (x) {
          x.classList.toggle('on', Number(x.dataset.r) <= rating);
        });
      }
      ov.querySelectorAll('#rev-pick button').forEach(function (b2) {
        b2.addEventListener('click', function () { rating = Number(b2.dataset.r); paint(); });
      });
      paint();
      ov.querySelector('#rev-send').addEventListener('click', function () {
        var text = ov.querySelector('#rev-text').value.trim();
        var msg = ov.querySelector('#rev-msg');
        if (!text) { msg.textContent = 'Please write a few words first.'; return; }
        var name = ov.querySelector('#rev-name').value.trim() || 'Anonymous';
        var send = ov.querySelector('#rev-send');
        send.disabled = true; send.textContent = 'Sending…';
        var configured = REVIEWS_URL.indexOf('http') === 0;
        (configured ? fetch(REVIEWS_URL + '/rest/v1/website_reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: REVIEWS_KEY, Authorization: 'Bearer ' + REVIEWS_KEY, Prefer: 'return=minimal' },
          body: JSON.stringify({ name: name, rating: rating, text: text })
        }) : Promise.reject()).then(function (r) {
          if (!r.ok) throw new Error();
          ov.querySelector('.modal-box').innerHTML = '<button class="modal-x" aria-label="Close">×</button><h3 class="modal-title">Thank you' + (name !== 'Anonymous' ? ', ' + name : '') + '! 🎉</h3><p style="color:#666">Your review was received and will appear after a quick moderation check.</p>';
          ov.querySelector('.modal-x').addEventListener('click', closeModal);
        }).catch(function () {
          window.location.href = 'mailto:hello@salxir.com?subject=' + encodeURIComponent('Website review (' + rating + '/5) from ' + name) + '&body=' + encodeURIComponent(text);
          send.disabled = false; send.textContent = 'Submit Review';
          msg.textContent = 'Direct submit unavailable — your email app opened instead.';
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadCerts();
    bindContact();
    bindBizForm();
    bindReview();
  });
})();
