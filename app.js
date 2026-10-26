const catalog = {
  flash: [
    { name: 'HAVIT HV-G92 Gamepad', price: '$120', old: '$160', discount: '-40%', rating: '88', image: 'figma-gamepad.png', detailImage: 'figma-originals/product-details-image-01.png', gallery: ['figma-originals/product-details-image-01.png', 'figma-originals/product-details-image-02.png', 'figma-originals/product-details-image-03.png', 'figma-originals/product-details-image-16.png'] },
    { name: 'AK-900 Wired Keyboard', price: '$960', old: '$1160', discount: '-35%', rating: '75', image: 'figma-keyboard.png' },
    { name: 'IPS LCD Gaming Monitor', price: '$370', old: '$400', discount: '-30%', rating: '99', image: 'figma-monitor.png' },
    { name: 'S-Series Comfort Chair', price: '$375', old: '$400', discount: '-25%', rating: '99', image: 'figma-chair.png' },
  ],
  best: [
    { name: 'The north coat', price: '$260', old: '$360', rating: '65', image: 'figma-originals/home-best-selling-image-04.png' },
    { name: 'Gucci duffle bag', price: '$960', old: '$1160', rating: '65', image: 'figma-originals/home-best-selling-image-02.png' },
    { name: 'RGB liquid CPU Cooler', price: '$160', old: '$170', rating: '65', image: 'figma-originals/home-best-selling-image-06.png' },
    { name: 'Small BookShelf', price: '$360', rating: '65', image: 'figma-originals/home-best-selling-image-01.png' },
  ],
  explore: [
    { name: 'Breed Dry Dog Food', price: '$100', rating: '35', image: 'figma-originals/home-explore-products-image-01.jpg' },
    { name: 'CANON EOS DSLR Camera', price: '$360', rating: '95', image: 'figma-originals/home-explore-products-image-02.png' },
    { name: 'ASUS FHD Gaming Laptop', price: '$700', rating: '325', image: 'figma-originals/home-explore-products-image-04.png' },
    { name: 'Curology Product Set', price: '$500', rating: '145', image: 'figma-originals/home-explore-products-image-10.png' },
    { name: 'Kids Electric Car', price: '$960', rating: '65', image: 'figma-originals/home-explore-products-image-06.png' },
    { name: 'Jr. Zoom Soccer Cleats', price: '$1160', rating: '35', image: 'figma-originals/home-explore-products-image-03.png' },
    { name: 'GP11 Shooter USB Gamepad', price: '$660', rating: '55', image: 'figma-originals/home-explore-products-image-07.png' },
    { name: 'Quilted Satin Jacket', price: '$660', rating: '55', image: 'figma-originals/home-explore-products-image-08.png' },
  ],
};

const categoryExtras = [
  { name: 'iPhone 14 Series', price: '$999', rating: '124', image: 'figma-originals/home-hero-image-1.jpg' },
  { name: 'PlayStation 5 Console', price: '$499', rating: '208', image: 'figma-originals/home-new-arrival-image-01.png' },
  { name: 'Wireless Bluetooth Speaker', price: '$149', rating: '87', image: 'figma-originals/home-speaker-banner-image-2.png' },
  { name: 'Samsung Galaxy Z Fold7', price: '$1,999', rating: '142', image: 'samsung-galaxy-z-fold7.png' },
  { name: 'Women’s Collection Hat', price: '$75', rating: '41', image: 'figma-originals/home-new-arrival-women-image-03.jpg' },
  { name: 'Men’s Everyday Jacket', price: '$110', rating: '63', image: 'figma-originals/home-explore-products-image-08.png' },
  { name: 'Samsung Galaxy Watch7', price: '$299', rating: '102', image: 'samsung-galaxy-watch7.png' },
  { name: 'Sony WH-1000XM5 Headphones', price: '$399', rating: '93', image: 'sony-wh1000xm5.png' },
  { name: 'Nature Made Vitamin D3', price: '$18', rating: '38', image: 'nature-made-vitamin-d3.png' },
  { name: 'Gucci Oud Perfume', price: '$125', rating: '68', image: 'figma-originals/home-new-arrival-ps5-image-07.png' },
];

const pageParam = new URLSearchParams(window.location.search).get('page');
const productParam = new URLSearchParams(window.location.search).get('product');
const categoryParam = new URLSearchParams(window.location.search).get('category');
const productsByName = [...Object.values(catalog).flat(), ...categoryExtras];
const selectedProduct = productsByName.find((product) => product.name === productParam) || catalog.flash[0];
const categoryGroups = {
  'Woman’s Fashion': ['The north coat', 'Gucci duffle bag', 'Quilted Satin Jacket', 'Women’s Collection Hat'],
  'Men’s Fashion': ['Men’s Everyday Jacket', 'The north coat'],
  Electronics: ['iPhone 14 Series', 'Samsung Galaxy Z Fold7', 'ASUS FHD Gaming Laptop', 'CANON EOS DSLR Camera', 'IPS LCD Gaming Monitor', 'Sony WH-1000XM5 Headphones', 'Wireless Bluetooth Speaker'],
  'Home & Lifestyle': ['Small BookShelf', 'S-Series Comfort Chair', 'Wireless Bluetooth Speaker'],
  Medicine: ['Nature Made Vitamin D3'],
  'Sports & Outdoor': ['Jr. Zoom Soccer Cleats'],
  'Baby’s & Toys': ['Kids Electric Car'],
  'Groceries & Pets': ['Breed Dry Dog Food'],
  'Health & Beauty': ['Curology Product Set', 'Gucci Oud Perfume'],
  Phones: ['iPhone 14 Series', 'Samsung Galaxy Z Fold7'],
  Computers: ['ASUS FHD Gaming Laptop', 'AK-900 Wired Keyboard', 'IPS LCD Gaming Monitor'],
  SmartWatch: ['Samsung Galaxy Watch7'],
  Camera: ['CANON EOS DSLR Camera'],
  HeadPhones: ['Sony WH-1000XM5 Headphones'],
  Gaming: ['HAVIT HV-G92 Gamepad', 'AK-900 Wired Keyboard', 'IPS LCD Gaming Monitor', 'PlayStation 5 Console', 'GP11 Shooter USB Gamepad'],
  'Women’s Collections': ['Women’s Collection Hat', 'Quilted Satin Jacket', 'Gucci duffle bag'],
  Speakers: ['Wireless Bluetooth Speaker'],
  Perfume: ['Gucci Oud Perfume'],
  'PlayStation 5': ['PlayStation 5 Console', 'HAVIT HV-G92 Gamepad', 'GP11 Shooter USB Gamepad'],
};
const normalizeCategory = (value) => String(value || '').toLowerCase().replace(/['’]/g, '').replace(/\s+/g, ' ').trim();
const findCategory = (value) => Object.keys(categoryGroups).find((name) => normalizeCategory(name) === normalizeCategory(value));
if (new URLSearchParams(window.location.search).get('order') === 'success') {
  try { window.sessionStorage.removeItem('exclusive-order-notice'); } catch { /* Ignore unavailable session storage. */ }
  const notice = document.createElement('div');
  notice.className = 'order-success-notice';
  notice.setAttribute('role', 'status');
  notice.textContent = 'Order placed successfully.';
  document.body.prepend(notice);
  window.setTimeout(() => notice.remove(), 4000);
  window.history.replaceState(null, '', window.location.pathname);
}
const breadcrumbHref = (label) => {
  const routes = {
    Home: 'index.html', Account: 'index.html?page=account', 'My Account': 'index.html?page=account',
    Product: 'index.html#products', Gaming: 'index.html#categories', 'View Cart': 'index.html?page=cart',
    CheckOut: 'index.html?page=checkout', Cart: 'index.html?page=cart', Wishlist: 'index.html?page=wishlist',
    'My Orders': 'index.html?page=orders', About: 'index.html?page=about', Contact: 'index.html?page=contact', Categories: 'index.html#categories',
    'Sign Up': 'index.html?page=signup', 'Log In': 'index.html?page=login', '404 Error': 'index.html?page=404',
  };
  const categoryName = findCategory(label);
  if (categoryName) return `index.html?page=category&category=${encodeURIComponent(categoryName)}`;
  if (productsByName.some((product) => product.name === label)) return `index.html?page=detail&product=${encodeURIComponent(label)}`;
  return routes[label] || `index.html?page=${encodeURIComponent(pageParam || 'home')}`;
};
const crumbs = (last) => `<nav class="breadcrumbs wrap" aria-label="Breadcrumb"><a href="index.html">Home</a>${last.split('/').map((part) => { const label = part.trim(); return `<span aria-hidden="true">/</span><a href="${breadcrumbHref(label)}">${escapeHtml(label)}</a>`; }).join('')}</nav>`;
const formField = (label, type = 'text', required = true, attrs = '') => `<label class="form-field">${label}${required ? ' *' : ''}<input type="${type}" ${required ? 'required' : ''} ${attrs}/></label>`;

const pageContent = {
  signup: () => `<section class="auth-page wrap"><div class="auth-art"><img src="assets/signup-shopping.png" alt="Online shopping on a phone" /></div><div class="auth-panel"><h1>Create an account</h1><p>Enter your details below</p><form class="account-form" data-auth-form="signup"><label class="form-field">Name *<input type="text" name="name" required autocomplete="name" /></label><label class="form-field">Email *<input type="email" name="email" required autocomplete="email" /></label><label class="form-field">Password *<input type="password" name="password" required minlength="8" autocomplete="new-password" /></label><button class="primary-button">Create Account</button><p class="form-status" role="status" aria-live="polite"></p></form><div class="google-auth" data-mode="signup"></div><p class="auth-status" role="status" aria-live="polite"></p><p class="auth-switch">Already have account? <a href="index.html?page=login">Log in</a></p></div></section>${crumbs('Sign Up')}`,
  login: () => `<section class="auth-page wrap"><div class="auth-art"><img src="assets/signup-shopping.png" alt="Online shopping on a phone" /></div><div class="auth-panel"><h1>Log in to Exclusive</h1><p>Enter your details below</p><form class="account-form" data-auth-form="login"><label class="form-field">Email *<input type="email" name="email" required autocomplete="email" /></label><label class="form-field">Password *<input type="password" name="password" required autocomplete="current-password" /></label><div class="login-actions"><button class="primary-button">Log In</button><a href="#forgot">Forgot Password?</a></div><p class="form-status" role="status" aria-live="polite"></p></form><p class="auth-switch">New to Exclusive? <a href="index.html?page=signup">Create an account</a></p></div></section>${crumbs('Log In')}`,
  wishlist: () => `<section class="page-content wrap">${crumbs('Wishlist')}<div class="list-heading"><h1>Wishlist (4)</h1><button class="outline-button" data-move-all>Move All To Bag</button></div><div class="product-grid page-product-grid">${catalog.flash.map((p) => productCard(p).outerHTML).join('')}</div><div class="list-heading suggestion-heading"><h2><span class="red-mark"></span>Just For You</h2><a class="outline-button" href="index.html">See All</a></div><div class="product-grid page-product-grid">${catalog.best.map((p) => productCard(p).outerHTML).join('')}</div></section>`,
  cart: () => `<section class="page-content wrap">${crumbs('Cart')}<div class="cart-table"><div class="cart-row cart-head"><span>Product</span><span>Price</span><span>Quantity</span><span>Subtotal</span></div><div id="cart-items"></div></div><div class="cart-actions"><a class="outline-button" href="index.html">Return To Shop</a><button class="outline-button" data-update-cart>Update Cart</button></div><div class="cart-bottom"><form class="coupon"><input placeholder="Coupon Code"/><button class="primary-button" type="submit">Apply Coupon</button></form><div class="cart-total"><h2>Cart Total</h2><p><span>Subtotal:</span><b id="cart-subtotal">$0</b></p><p><span>Shipping:</span><b>Free</b></p><p class="grand-total"><span>Total:</span><b id="cart-total">$0</b></p><a class="primary-button" href="index.html?page=checkout">Proceed to checkout</a></div></div></section>`,
  category: () => { const name = findCategory(categoryParam) || 'Electronics'; const products = categoryGroups[name].map((productName) => productsByName.find((product) => product.name === productName)).filter(Boolean); return `<section class="page-content wrap">${crumbs(`Categories / ${name}`)}<div class="list-heading category-page-heading"><div><div class="eyebrow"><i></i><span>Categories</span></div><h1>${escapeHtml(name)}</h1></div><span>${products.length} Products</span></div><div class="product-grid page-product-grid">${products.map((product) => productCard(product).outerHTML).join('')}</div></section>`; },
  checkout: () => `<section class="page-content wrap">${crumbs('Account / My Account / Product / View Cart / CheckOut')}<div class="checkout-layout"><div><h1 class="page-title">Billing Details</h1><form class="billing-form" data-message="Your order has been placed.">${formField('First Name')}${formField('Company Name', 'text', false)}${formField('Street Address')}${formField('Apartment, floor, etc. (optional)', 'text', false)}${formField('Town / City')}${formField('Phone Number', 'tel')}${formField('Email Address', 'email')}<label class="check-field"><input type="checkbox"/> Save this information for faster check-out next time</label></form></div><div class="order-summary"><div class="order-items" id="checkout-items"></div><p><span>Subtotal</span><b id="checkout-subtotal">$0.00</b></p><p><span>Shipping</span><b>Free</b></p><p class="grand-total"><span>Total</span><b id="checkout-total">$0.00</b></p><label class="payment-option"><input type="radio" name="payment" value="bank" checked/> Bank</label><label class="payment-option"><input type="radio" name="payment" value="cod"/> Cash on delivery</label><div class="bank-payment-details" id="bank-payment-details" hidden><label class="form-field">Bank Name *<select name="bankName"><option value="">Select your bank</option><option>Vietcombank</option><option>VietinBank</option><option>BIDV</option><option>Agribank</option><option>MB Bank</option><option>Techcombank</option><option>ACB</option><option>VPBank</option><option>TPBank</option><option>Sacombank</option><option>HDBank</option><option>SHB</option><option>VIB</option><option>OCB</option><option>MSB</option><option>SeABank</option><option>Eximbank</option><option>LPBank</option><option>PVcomBank</option><option>ABBANK</option><option>Bac A Bank</option><option>Viet A Bank</option><option>Nam A Bank</option><option>KienlongBank</option><option>NCB</option><option>VietBank</option><option>PGBank</option><option>CBBank</option><option>BaoViet Bank</option><option>Woori Bank</option><option>Shinhan Bank</option><option>HSBC Vietnam</option><option>Standard Chartered Vietnam</option></select></label><label class="form-field">Bank Account Number *<input name="bankAccount" type="text" inputmode="numeric" autocomplete="off" placeholder="Enter your bank account number"/></label></div><form class="coupon"><input placeholder="Coupon Code"/><button class="primary-button" type="button">Apply Coupon</button></form><button class="primary-button place-order" data-submit-form=".billing-form">Place Order</button><p class="order-submit-status" role="status" aria-live="polite"></p></div></div></section>`,
  account: () => `<section class="page-content wrap">${crumbs('My Account')}<div class="account-layout"><aside class="account-menu"><p>Manage My Account</p><a class="selected" href="index.html?page=account">My Profile</a><a href="index.html?page=account">Address Book</a><a href="index.html?page=account">My Payment Options</a><p>My Orders</p><a href="index.html?page=orders">My Orders</a><a href="index.html?page=orders#cancellations">My Cancellations</a><p>My Wishlist</p><a href="index.html?page=wishlist">Wishlist</a></aside><form class="profile-form" data-message="Your changes have been saved."><h1>Edit Your Profile</h1><div class="two-fields">${formField('First Name')}${formField('Last Name')}</div><div class="two-fields">${formField('Email', 'email')}${formField('Address')}</div><label class="form-field">Password Changes<input type="password" placeholder="Current Password"/><input type="password" placeholder="New Password"/><input type="password" placeholder="Confirm New Password"/></label><div class="form-actions"><button type="reset" class="text-button">Cancel</button><button class="primary-button">Save Changes</button></div></form></div></section>`,
  orders: () => `<section class="page-content wrap">${crumbs('My Account / My Orders')}<h1 class="page-title">My Orders</h1><div class="order-tabs"><a class="selected" href="index.html?page=orders">All Orders</a><a href="index.html?page=orders#cancellations">Cancelled</a></div><div class="orders-list" id="orders-list"></div></section>`,
  about: () => `<section class="page-content wrap">${crumbs('About')}<div class="about-story"><div><h1>Our Story</h1><p>Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.</p><p>Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer.</p></div><img src="assets/about-shoppers.png" alt="Two shoppers browsing their phones"/></div><div class="stats-grid"><article><b>10.5k</b><span>Sallers active our site</span></article><article class="highlight"><b>33k</b><span>Mopnthly Produduct Sale</span></article><article><b>45.5k</b><span>Customer active in our site</span></article><article><b>25k</b><span>Anual gross sale in our site</span></article></div><div class="team-grid"><article><img src="assets/about-team-1.png" alt="Tom Cruise"/><h2>Tom Cruise</h2><p>Founder &amp; Chairman</p><div>𝕏　◎　in</div></article><article><img src="assets/about-team-2.png" alt="Emma Watson"/><h2>Emma Watson</h2><p>Managing Director</p><div>𝕏　◎　in</div></article><article><img src="assets/about-team-3.png" alt="Will Smith"/><h2>Will Smith</h2><p>Product Designer</p><div>𝕏　◎　in</div></article></div></section>`,
  contact: () => `<section class="page-content wrap">${crumbs('Contact')}<div class="contact-layout"><aside class="contact-info"><article><h2><span>☎</span> Call To Us</h2><p>We are available 24/7, 7 days a week.</p><p>Phone: +8801611112222</p></article><hr/><article><h2><span>✉</span> Write To Us</h2><p>Fill out our form and we will contact you within 24 hours.</p><p>Emails: customer@exclusive.com</p><p>Emails: support@exclusive.com</p></article></aside><form class="contact-form" data-message="Thanks, your message has been sent."><div class="contact-fields"><input aria-label="Your Name" placeholder="Your Name *" required/><input type="email" aria-label="Your Email" placeholder="Your Email *" required/><input aria-label="Your Phone" placeholder="Your Phone *" required/></div><textarea placeholder="Your Message" aria-label="Your Message" rows="8" required></textarea><button class="primary-button">Send Message</button></form></div></section>`,
  detail: () => { const product = selectedProduct; const gallery = product.gallery || [product.image, product.image, product.image, product.image]; return `<section class="page-content wrap">${crumbs(`Account / Gaming / ${product.name}`)}<div class="detail-layout"><div class="detail-thumbs">${gallery.map((image, index) => `<button type="button" class="detail-thumb${index === 0 ? ' selected' : ''}' data-detail-image="${image}" aria-label="View product image ${index + 1}"><img src="assets/${image}" alt="${product.name} view ${index + 1}"/></button>`).join('')}</div><div class="detail-main-image"><img id="detail-main-image" src="assets/${product.detailImage || product.image}" alt="${product.name}"/></div><div class="detail-info"><h1>${product.name}</h1><div class="detail-rating">★★★★★ <span>(${product.rating} Reviews)</span>　<i>In Stock</i></div><p class="detail-price">${product.price}</p><p class="detail-description">High quality ${product.name.toLowerCase()} with comfortable design and reliable performance for everyday use.</p><hr/><div class="choice-row"><span>Colours:</span><button class="color-choice blue" aria-label="Blue"></button><button class="color-choice red" aria-label="Red"></button></div><div class="choice-row"><span>Size:</span><button class="size-choice">XS</button><button class="size-choice">S</button><button class="size-choice selected">M</button><button class="size-choice">L</button><button class="size-choice">XL</button></div><div class="buy-row"><div class="quantity-control"><button data-qty="-1">−</button><b id="detail-quantity">1</b><button data-qty="1">+</button></div><button class="primary-button" data-add-detail data-product="${product.name}">Buy Now</button><button class="detail-heart" aria-label="Add to wishlist">♡</button></div><div class="delivery-box"><div><b>▱　Free Delivery</b><a href="#delivery">Enter your postal code for Delivery Availability</a></div><div><b>↩　Return Delivery</b><span>Free 30 Days Delivery Returns. <a href="#policy">Details</a></span></div></div></div></div><h2 class="related-title">Related Item</h2><div class="product-grid page-product-grid">${catalog.best.map(p => productCard(p).outerHTML).join('')}</div></section>`; },
  '404': () => `<section class="page-content wrap error-page">${crumbs('404 Error')}<div><h1>404 Not Found</h1><p>Your visited page not found. You may go home page.</p><a class="primary-button" href="index.html">Back to home page</a></div></section>`,
};

if (pageParam && pageContent[pageParam]) {
  document.querySelector('main').innerHTML = pageContent[pageParam]();
  document.querySelectorAll('.main-nav a').forEach((link) => link.classList.toggle('active', link.href.includes(`page=${pageParam}`)));
  document.title = `${pageParam === '404' ? '404 Error' : pageParam[0].toUpperCase() + pageParam.slice(1)} — Exclusive`;
}
updateBankPaymentFields();

async function updateAccountHeader() {
  const dropdown = document.getElementById('account-dropdown');
  const guest = document.getElementById('guest-account');
  if (!dropdown || !guest) return;
  try {
    const response = await fetch('/api/session', { credentials: 'same-origin', cache: 'no-store' });
    const data = await response.json();
    const signedIn = response.ok && Boolean(data.user);
    dropdown.hidden = !signedIn;
    guest.hidden = signedIn;
    if (signedIn) {
      const trigger = document.getElementById('account-trigger');
      trigger.setAttribute('aria-label', `Account menu for ${data.user.name}`);
      trigger.title = data.user.name;
      if (data.user.picture) {
        const avatar = trigger.querySelector('.account-avatar');
        avatar.innerHTML = `<img src="${escapeHtml(data.user.picture)}" alt="" referrerpolicy="no-referrer"/>`;
      }
    }
  } catch {
    dropdown.hidden = true;
    guest.hidden = false;
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

updateAccountHeader();

function productCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.name = product.name.toLowerCase();
  card.innerHTML = `<div class="product-visual">${product.discount ? `<span class="discount">${product.discount}</span>` : ''}<button class="wish" aria-label="Add ${product.name} to wishlist">♡</button><button class="view" aria-label="View details for ${product.name}">⌕</button><img src="assets/${product.image}" alt="${product.name}"/><button class="add-cart" data-product="${product.name}">Add To Cart</button></div><div class="product-info"><h3 data-product="${product.name}">${product.name}</h3><div><span class="price">${product.price}</span>${product.old ? `<span class="old-price">${product.old}</span>` : ''}</div><div class="rating" aria-label="Rated 5 out of 5">★★★★★ <small>(${product.rating})</small></div></div>`;
  return card;
}

function renderProducts(id, products) {
  const grid = document.getElementById(id);
  if (!grid) return;
  products.forEach((product) => grid.append(productCard(product)));
}

if (!pageParam || pageParam === 'detail') {
  renderProducts('flash-products', catalog.flash);
  renderProducts('best-products', catalog.best);
  renderProducts('explore-products', catalog.explore);
}

function startCountdown(selector, storageKey, initialSeconds, repeatSeconds) {
  const timer = document.querySelector(selector);
  if (!timer) return;
  let deadline = Number(window.localStorage.getItem(storageKey));
  if (!Number.isFinite(deadline) || deadline <= Date.now()) {
    deadline = Date.now() + initialSeconds * 1000;
    window.localStorage.setItem(storageKey, String(deadline));
  }
  const tick = () => {
    let remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    if (remaining === 0) {
      deadline = Date.now() + repeatSeconds * 1000;
      window.localStorage.setItem(storageKey, String(deadline));
      remaining = repeatSeconds;
    }
    const days = Math.floor(remaining / 86400);
    const hours = Math.floor((remaining % 86400) / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = remaining % 60;
    const values = selector === '.round-timer' ? [hours, days, minutes, seconds] : [days, hours, minutes, seconds];
    timer.querySelectorAll('b').forEach((value, index) => { value.textContent = String(values[index]).padStart(2, '0'); });
  };
  tick();
  window.setInterval(tick, 1000);
}

startCountdown('.countdown', 'exclusive-flash-sale-deadline', 3 * 86400 + 23 * 3600 + 19 * 60 + 56, 4 * 86400);
startCountdown('.round-timer', 'exclusive-music-sale-deadline', 5 * 86400 + 23 * 3600 + 59 * 60 + 35, 6 * 86400);

function loadCart() {
  try { const cart = JSON.parse(window.localStorage.getItem('exclusive-cart') || '[]'); return Array.isArray(cart) ? cart : []; } catch { return []; }
}

let cart = loadCart();
let cartCount = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
const countBadge = document.getElementById('cart-count');
if (countBadge) countBadge.textContent = cartCount;

function saveCart() {
  cartCount = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  window.localStorage.setItem('exclusive-cart', JSON.stringify(cart));
  document.querySelectorAll('#cart-count').forEach((badge) => { badge.textContent = cartCount; });
  renderCheckoutSummary();
}

function addToCart(name, quantity = 1) {
  const product = productsByName.find((item) => item.name === name);
  if (!product) return;
  const existing = cart.find((item) => item.name === name);
  if (existing) existing.quantity += quantity;
  else cart.push({ name: product.name, price: product.price, image: product.image, quantity });
  saveCart();
}

function renderCart() {
  const target = document.getElementById('cart-items');
  if (!target) return;
  if (!cart.length) {
    target.innerHTML = '<p class="cart-empty">Your cart is empty. Choose a product and press Add To Cart.</p>';
  } else {
    target.innerHTML = cart.map((item, index) => `<div class="cart-row"><div class="cart-product"><button class="remove-item" aria-label="Remove ${item.name}" data-cart-index="${index}">×</button><img src="assets/${item.image}" alt=""/><span>${item.name}</span></div><span>${item.price}</span><input class="quantity" aria-label="Quantity for ${item.name}" type="number" min="1" value="${item.quantity}" data-cart-index="${index}"/><b class="line-total" data-price="${Number(item.price.replace(/[^\d.]/g, ''))}">$${(Number(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}</b></div>`).join('');
  }
  updateCartTotals();
}

saveCart();
renderCart();

function renderCheckoutSummary() {
  const target = document.getElementById('checkout-items');
  if (!target) return;
  const total = cart.reduce((sum, item) => sum + Number(item.price.replace(/[^\d.]/g, '')) * Number(item.quantity || 0), 0);
  target.innerHTML = cart.length
    ? cart.map((item) => {
      const quantity = Number(item.quantity || 0);
      const price = Number(item.price.replace(/[^\d.]/g, ''));
      return `<div><img src="assets/${escapeHtml(item.image)}" alt=""/><span>${escapeHtml(item.name)} × ${quantity}</span><b>$${(price * quantity).toFixed(2)}</b></div>`;
    }).join('')
    : '<p class="cart-empty">Your cart is empty. Add products before checkout.</p>';
  document.getElementById('checkout-subtotal').textContent = `$${total.toFixed(2)}`;
  document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
}

function updateBankPaymentFields() {
  const panel = document.getElementById('bank-payment-details');
  if (!panel) return;
  const bankSelected = document.querySelector('input[name="payment"]:checked')?.value === 'bank';
  panel.hidden = !bankSelected;
  panel.querySelectorAll('input, select').forEach((field) => {
    field.disabled = !bankSelected;
    field.required = bankSelected;
  });
}

function updateCartTotals() {
  const total = cart.reduce((sum, item) => sum + Number(item.price.replace(/[^\d.]/g, '')) * Number(item.quantity || 0), 0);
  document.querySelectorAll('#cart-subtotal, #cart-total').forEach((node) => { node.textContent = `$${total}`; });
}

function renderOrders() {
  const target = document.getElementById('orders-list');
  if (!target) return;
  const orders = JSON.parse(window.localStorage.getItem('exclusive-orders') || '[]');
  if (!orders.length) {
    target.innerHTML = '<p class="cart-empty">You do not have any orders yet.</p>';
    return;
  }
  target.innerHTML = orders.map((order) => `<article class="order-card"><div class="order-card-heading"><b>Order #${escapeHtml(order.id)}</b><span>${escapeHtml(order.createdAt)}</span><strong>${escapeHtml(order.status)}</strong></div>${order.items.map((item) => `<div class="order-item"><img src="assets/${escapeHtml(item.image)}" alt=""/><span>${escapeHtml(item.name)} × ${Number(item.quantity)}</span><b>${escapeHtml(item.price)}</b></div>`).join('')}<p class="order-card-total">Total <b>$${Number(order.total).toFixed(2)}</b></p></article>`).join('');
}

let orderSubmissionInProgress = false;

function getOrderIdempotencyKey(items) {
  const fingerprint = JSON.stringify(items.map(({ name, price, quantity, image }) => ({ name, price, quantity, image })));
  const storageKey = 'exclusive-checkout-idempotency';
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(storageKey) || 'null');
    if (saved?.fingerprint === fingerprint && typeof saved.key === 'string') return saved.key;
  } catch { /* Generate a fresh key if session storage contains invalid data. */ }
  const key = window.crypto.randomUUID();
  window.sessionStorage.setItem(storageKey, JSON.stringify({ fingerprint, key }));
  return key;
}

async function submitOrder(button) {
  if (orderSubmissionInProgress || button.disabled) return;
  if (!cart.length) {
    window.location.assign('index.html?page=cart');
    return;
  }
  const billingForm = document.querySelector(button.dataset.submitForm);
  if (!billingForm?.reportValidity()) return;
  const bankDetails = document.getElementById('bank-payment-details');
  if (bankDetails && !bankDetails.hidden) {
    const invalidBankField = [...bankDetails.querySelectorAll('input, select')].find((field) => !field.checkValidity());
    if (invalidBankField) { invalidBankField.reportValidity(); return; }
  }

  const status = document.querySelector('.order-submit-status');
  const items = cart.map((item) => ({ ...item }));
  const idempotencyKey = getOrderIdempotencyKey(items);
  orderSubmissionInProgress = true;
  button.disabled = true;
  button.textContent = 'Placing order…';
  if (status) status.textContent = '';

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json', 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify({ items }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Could not place your order. Please try again.');

    const orders = JSON.parse(window.localStorage.getItem('exclusive-orders') || '[]');
    if (!orders.some((order) => order.id === result.order.id)) orders.unshift(result.order);
    window.localStorage.setItem('exclusive-orders', JSON.stringify(orders));
    cart = [];
    saveCart();
    updateCartTotals();
    window.sessionStorage.removeItem('exclusive-checkout-idempotency');
    try { window.sessionStorage.setItem('exclusive-order-notice', '1'); } catch { /* The redirect still works when storage is unavailable. */ }
    window.location.replace('index.html?order=success');
  } catch (error) {
    button.disabled = false;
    button.textContent = 'Place Order';
    if (status) status.textContent = error.message;
  } finally {
    orderSubmissionInProgress = false;
  }
}

renderOrders();

updateCartTotals();

document.addEventListener('click', (event) => {
  if (event.target.closest('#account-trigger')) {
    const trigger = document.getElementById('account-trigger');
    const menu = document.getElementById('account-menu');
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!expanded));
    menu.hidden = expanded;
  } else if (!event.target.closest('#account-menu')) {
    document.getElementById('account-menu')?.setAttribute('hidden', '');
    document.getElementById('account-trigger')?.setAttribute('aria-expanded', 'false');
  }
  if (event.target.closest('#logout-button')) {
    fetch('/api/logout', { method: 'POST', credentials: 'same-origin' }).finally(() => window.location.assign('index.html'));
  }
  if (event.target.matches('.add-cart')) {
    addToCart(event.target.dataset.product, 1);
    event.target.textContent = 'Added';
    window.setTimeout(() => { event.target.textContent = 'Add To Cart'; }, 900);
  }
  if (event.target.matches('.view') || event.target.matches('.product-info h3')) {
    const name = event.target.dataset.product || event.target.closest('.product-card')?.querySelector('.product-info h3')?.dataset.product || catalog.flash[0].name;
    window.location.href = `index.html?page=detail&product=${encodeURIComponent(name)}`;
  }
  if (event.target.matches('.wish')) {
    event.target.classList.toggle('is-favorite');
    event.target.textContent = event.target.classList.contains('is-favorite') ? '♥' : '♡';
  }
  if (event.target.matches('.menu-toggle')) {
    document.querySelector('.main-nav').classList.toggle('open');
  }
  if (event.target.closest('[data-page]')) {
    window.location.href = `index.html?page=${event.target.closest('[data-page]').dataset.page}`;
  }
  if (event.target.matches('[data-move-all]')) {
    catalog.flash.forEach((product) => addToCart(product.name, 1));
    event.target.textContent = 'Moved To Bag';
  }
  if (event.target.matches('.remove-item')) {
    const index = Number(event.target.dataset.cartIndex);
    if (Number.isInteger(index)) cart.splice(index, 1);
    saveCart();
    renderCart();
  }
  if (event.target.matches('[data-update-cart]')) {
    document.querySelectorAll('.quantity[data-cart-index]').forEach((input) => {
      const item = cart[Number(input.dataset.cartIndex)];
      if (item) item.quantity = Math.max(1, Number(input.value) || 1);
    });
    saveCart();
    renderCart();
  }
  if (event.target.matches('[data-qty]')) {
    const node = document.getElementById('detail-quantity');
    node.textContent = Math.max(1, Number(node.textContent) + Number(event.target.dataset.qty));
  }
  if (event.target.matches('[data-add-detail]')) {
    addToCart(event.target.dataset.product, Number(document.getElementById('detail-quantity')?.textContent || 1));
    event.target.textContent = 'Added to Cart';
  }
  if (event.target.matches('.detail-thumb, .detail-thumb img')) {
    const thumb = event.target.closest('.detail-thumb');
    document.getElementById('detail-main-image').src = `assets/${thumb.dataset.detailImage}`;
    document.querySelectorAll('.detail-thumb').forEach((item) => item.classList.toggle('selected', item === thumb));
  }
  if (event.target.matches('.size-choice')) {
    document.querySelectorAll('.size-choice').forEach((button) => button.classList.remove('selected'));
    event.target.classList.add('selected');
  }
  if (event.target.matches('.detail-heart')) {
    event.target.classList.toggle('is-favorite');
    event.target.textContent = event.target.classList.contains('is-favorite') ? '♥' : '♡';
  }
  if (event.target.matches('.place-order')) {
    void submitOrder(event.target);
  }
  if (event.target.closest('[data-category-link]')) {
    const category = decodeURIComponent(event.target.closest('[data-category-link]').dataset.categoryLink);
    window.location.assign(`index.html?page=category&category=${encodeURIComponent(category)}`);
  }
  if (event.target.matches('#view-all')) {
    document.querySelector('#explore-products').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

document.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-category-link]')) {
    event.preventDefault();
    const category = decodeURIComponent(event.target.dataset.categoryLink);
    window.location.assign(`index.html?page=category&category=${encodeURIComponent(category)}`);
  }
});

document.addEventListener('change', (event) => {
  if (event.target.matches('input[name="payment"]')) updateBankPaymentFields();
});

document.getElementById('search')?.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  const cards = [...document.querySelectorAll('.product-card')];
  cards.forEach((card) => { card.hidden = query.length > 0 && !card.dataset.name.includes(query); });
  document.querySelectorAll('.product-grid').forEach((grid) => {
    const empty = grid.querySelector('.empty-state');
    const hasResults = [...grid.querySelectorAll('.product-card')].some((card) => !card.hidden);
    if (!hasResults && query) {
      if (!empty) grid.insertAdjacentHTML('beforeend', '<p class="empty-state">No products match your search.</p>');
    } else if (empty) empty.remove();
  });
});

document.querySelector('.subscribe')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector('input');
  if (input.checkValidity()) {
    input.value = '';
    input.placeholder = 'Thanks for subscribing!';
    window.dispatchEvent(new Event('exclusive:content-change'));
  } else input.reportValidity();
});

document.querySelectorAll('form[data-auth-form]').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const submitButton = form.querySelector('button[type="submit"], button:not([type])');
    const message = form.querySelector('.form-status');
    const fields = [...form.querySelectorAll('input')];
    const payload = Object.fromEntries(fields.map((field) => [field.name, field.value]));
    submitButton.disabled = true;
    message.classList.remove('is-error');
    message.textContent = form.dataset.authForm === 'signup' ? 'Creating your account…' : 'Signing in…';
    try {
      const response = await fetch(`/api/auth/${form.dataset.authForm}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Authentication failed.');
      message.textContent = form.dataset.authForm === 'signup' ? 'Account created. You are now signed in.' : 'You are now signed in.';
      window.location.assign('index.html');
    } catch (error) {
      message.classList.add('is-error');
      message.textContent = error.message || 'Could not complete your request.';
      submitButton.disabled = false;
    }
  });
});

document.querySelectorAll('form[data-message]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const message = document.createElement('p');
    message.className = 'form-success';
    message.textContent = form.dataset.message;
    form.querySelector('.form-success')?.remove();
    form.append(message);
  });
});

document.querySelector('.coupon')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector('input');
  input.placeholder = input.value ? 'Coupon applied' : 'Enter a coupon code';
  input.value = '';
  window.dispatchEvent(new Event('exclusive:content-change'));
});

document.addEventListener('input', (event) => {
  if (event.target.matches('.quantity[data-cart-index]')) {
    const item = cart[Number(event.target.dataset.cartIndex)];
    if (item) item.quantity = Math.max(1, Number(event.target.value) || 1);
    saveCart();
    updateCartTotals();
  }
});
