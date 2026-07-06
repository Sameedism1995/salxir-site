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
      root.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><a href="shop.html" class="btn btn-black">Browse the Shop</a></div>';
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
      success_url: new URL('success.html', window.location.href).href,
      cancel_url: new URL('cart.html', window.location.href).href,
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
