/* ============================================
   BOOMR. - Main Application JavaScript
   ============================================ */

'use strict';

// ---- State ----
const state = {
  cart: [],
  wishlist: [],
  cartOpen: false,
  wishlistOpen: false,
  searchOpen: false,
  loginOpen: false,
  checkoutOpen: false,
  currentProduct: null,
  currentQty: 1,
  currentTab: 'description',
  currentPayment: 'card',
  loginTab: 'login',
  scrollY: 0,
  couponApplied: false,
  couponDiscount: 0,
};

// ---- Products Data ----
const products = [
  {
    id: 1,
    name: 'Classic V-Wing Pro',
    category: 'Traditional V-shaped',
    catSlug: 'v-shaped',
    price: 54.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviews: 234,
    badge: 'sale',
    description: 'The legendary V-shaped design that started it all. Crafted from aircraft-grade carbon fiber laminate with hand-tuned flight angles for consistent 25-35m returns. Perfect for beginners and seasoned throwers alike.',
    specs: { Material: 'Carbon Fiber Laminate', Weight: '165g', Wingspan: '48cm', 'Flight Range': '25-35m', 'Wind Speed': '10-25 km/h', Skill: 'Beginner' },
    colors: ['Natural', 'Black Carbon', 'Ochre'],
    sizes: ['Standard', 'Competition'],
    inStock: true,
    sku: 'BM-V01-PRO',
    svgKey: 'v-shape',
    featured: true,
    tags: ['bestseller', 'beginner', 'outdoor'],
  },
  {
    id: 2,
    name: 'Hawk Hook Elite',
    category: 'Hook-shaped',
    catSlug: 'hook',
    price: 74.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 118,
    badge: 'new',
    description: 'Inspired by bird-of-prey silhouettes, the Hawk Hook delivers a dramatic curved flight path with extreme precision. The asymmetric hook geometry creates unique turbulence vortices for an unpredictable, exciting throw.',
    specs: { Material: 'Fibreglass Composite', Weight: '180g', Wingspan: '52cm', 'Flight Range': '30-40m', 'Wind Speed': '15-30 km/h', Skill: 'Intermediate' },
    colors: ['Storm Grey', 'Midnight Blue', 'Crimson'],
    sizes: ['Standard', 'XL'],
    inStock: true,
    sku: 'BM-HK-001',
    svgKey: 'hook',
    featured: true,
    tags: ['intermediate', 'outdoor', 'precision'],
  },
  {
    id: 3,
    name: 'Riddle Curve QM',
    category: 'Question-mark shaped',
    catSlug: 'question-mark',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.9,
    reviews: 89,
    badge: 'hot',
    description: 'Named for its unmistakable question-mark silhouette, the Riddle Curve challenges conventional aerodynamics. Advanced polymer flex allows the arm to bend slightly mid-flight, creating a mesmerizing looping trajectory.',
    specs: { Material: 'Polycarbonate Flex', Weight: '155g', Wingspan: '54cm', 'Flight Range': '28-38m', 'Wind Speed': '12-22 km/h', Skill: 'Advanced' },
    colors: ['Transparent', 'Deep Purple', 'Forest Green'],
    sizes: ['Standard'],
    inStock: true,
    sku: 'BM-QM-RC1',
    svgKey: 'question-mark',
    featured: true,
    tags: ['advanced', 'competition', 'unique'],
  },
  {
    id: 4,
    name: 'Tri-Blade Vortex',
    category: 'Tri-blade (3-wing)',
    catSlug: 'tri-blade',
    price: 99.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 156,
    badge: null,
    description: 'Three precision-tuned blades create a gyroscopic stabilisation effect that no two-wing boomerang can match. The Vortex hovers mid-arc with breathtaking hang-time before returning on a dead-straight path.',
    specs: { Material: 'Aerospace Aluminum', Weight: '210g', Wingspan: '55cm', 'Flight Range': '20-30m', 'Wind Speed': '8-20 km/h', Skill: 'Intermediate' },
    colors: ['Silver', 'Anodised Black', 'Gold'],
    sizes: ['Standard', 'Compact'],
    inStock: true,
    sku: 'BM-TB-VX3',
    svgKey: 'tri-blade',
    tags: ['intermediate', 'outdoor', 'gyroscopic'],
  },
  {
    id: 5,
    name: 'Cross Phantom X4',
    category: 'Four-wing / Cross-shaped',
    catSlug: 'four-wing',
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviews: 72,
    badge: 'sale',
    description: 'Four equidistant wings arranged in a cross pattern produce extraordinary lift-to-drag ratios. The Phantom X4 climbs higher than any boomerang in our lineup and delivers a slow, satisfying return arc.',
    specs: { Material: 'Carbon & Kevlar Hybrid', Weight: '225g', Wingspan: '58cm', 'Flight Range': '22-35m', 'Wind Speed': '10-25 km/h', Skill: 'Intermediate' },
    colors: ['Stealth Black', 'Arctic White'],
    sizes: ['Standard', 'Competition'],
    inStock: true,
    sku: 'BM-FW-X4P',
    svgKey: 'four-wing',
    tags: ['intermediate', 'altitude', 'long-range'],
  },
  {
    id: 6,
    name: 'Pentagram Spinner M5',
    category: 'Five-wing multi-wing',
    catSlug: 'multi-wing',
    price: 134.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 43,
    badge: 'new',
    description: 'Five wings in a perfect pentagonal array. The M5 is a crowd-stopper at competitions: its fast spin rate creates a visible disc of motion mid-air. Requires experienced technique but rewards with an unforgettable performance.',
    specs: { Material: 'Carbon Fiber Twill Weave', Weight: '245g', Wingspan: '60cm', 'Flight Range': '18-28m', 'Wind Speed': '8-18 km/h', Skill: 'Expert' },
    colors: ['Raven Black', 'Midnight Purple'],
    sizes: ['Standard'],
    inStock: true,
    sku: 'BM-M5-SPX',
    svgKey: 'five-wing',
    tags: ['expert', 'competition', 'showstopper'],
  },
  {
    id: 7,
    name: 'Halo Ring Glider',
    category: 'Ring boomerang (circular)',
    catSlug: 'ring',
    price: 79.99,
    originalPrice: 94.99,
    rating: 4.6,
    reviews: 198,
    badge: null,
    description: 'A perfectly circular ring with an aerofoil cross-section around its entire circumference. The Halo floats with uncanny smoothness, generating lift from every angle simultaneously. Arguably the most visually striking boomerang ever designed.',
    specs: { Material: 'Polypropylene', Weight: '140g', Diameter: '36cm', 'Flight Range': '20-30m', 'Wind Speed': '10-20 km/h', Skill: 'Beginner' },
    colors: ['Neon Yellow', 'Cobalt Blue', 'Crimson Red', 'White'],
    sizes: ['Small', 'Standard', 'Large'],
    inStock: true,
    sku: 'BM-RG-HL7',
    svgKey: 'ring',
    featured: true,
    tags: ['beginner', 'outdoor', 'visual'],
  },
  {
    id: 8,
    name: 'Delta Storm TR',
    category: 'Delta boomerang (triangle-like)',
    catSlug: 'delta',
    price: 64.99,
    originalPrice: null,
    rating: 4.4,
    reviews: 87,
    badge: null,
    description: 'Delta-wing geometry borrowed from supersonic aircraft. The Storm TR achieves the flattest, most stable flight trajectory in our range. Ideal for open fields and competition accuracy throwing.',
    specs: { Material: 'G10 Fibreglass', Weight: '175g', Wingspan: '50cm', 'Flight Range': '30-45m', 'Wind Speed': '15-35 km/h', Skill: 'Intermediate' },
    colors: ['Gunmetal', 'Desert Tan', 'Racing Green'],
    sizes: ['Standard', 'Long-Range'],
    inStock: true,
    sku: 'BM-DT-STR',
    svgKey: 'delta',
    tags: ['intermediate', 'long-range', 'accuracy'],
  },
  {
    id: 9,
    name: 'Serpent Curve S1',
    category: 'S-shaped boomerang',
    catSlug: 's-shaped',
    price: 84.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviews: 61,
    badge: 'hot',
    description: 'The sinuous S-curve is more than aesthetic. Each inflection point creates a controlled pressure differential that causes the Serpent to spiral upward in a corkscrew path before gracefully looping back. Extraordinary to watch, thrilling to throw.',
    specs: { Material: 'ABS Polymer', Weight: '160g', Wingspan: '56cm', 'Flight Range': '22-32m', 'Wind Speed': '10-22 km/h', Skill: 'Advanced' },
    colors: ['Viper Green', 'Black Mamba', 'Copper'],
    sizes: ['Standard'],
    inStock: true,
    sku: 'BM-SS-SRP',
    svgKey: 's-shape',
    tags: ['advanced', 'spiral-flight', 'competition'],
  },
  {
    id: 10,
    name: 'Nightwing Bat Edition',
    category: 'Bat-shaped novelty',
    catSlug: 'bat',
    price: 59.99,
    originalPrice: null,
    rating: 4.3,
    reviews: 302,
    badge: null,
    description: 'The iconic bat silhouette with fully functional boomerang aerodynamics. Great for Halloween events, night glow-in-the-dark sessions (with included phosphorescent coating), and as a conversation-starting display piece.',
    specs: { Material: 'ABS with Glow Coating', Weight: '150g', Wingspan: '48cm', 'Flight Range': '20-28m', 'Wind Speed': '10-20 km/h', Skill: 'Beginner' },
    colors: ['Classic Black', 'Blood Red', 'Glow Lime'],
    sizes: ['Standard'],
    inStock: true,
    sku: 'BM-NV-BAT',
    svgKey: 'bat',
    tags: ['beginner', 'novelty', 'gift', 'glow'],
  },
  {
    id: 11,
    name: 'Eagle Spirit Animal',
    category: 'Animal-shaped novelty',
    catSlug: 'animal',
    price: 69.99,
    originalPrice: 84.99,
    rating: 4.5,
    reviews: 145,
    badge: 'sale',
    description: 'Rendered in faithful eagle silhouette with painted feather detailing, the Eagle Spirit is both a collectible artwork and a capable outdoor thrower. Each unit is hand-painted and individually numbered.',
    specs: { Material: 'Hardwood & Resin Finish', Weight: '170g', Wingspan: '52cm', 'Flight Range': '18-28m', 'Wind Speed': '8-18 km/h', Skill: 'Beginner' },
    colors: ['Golden Eagle', 'Bald Eagle', 'Peregrine'],
    sizes: ['Standard'],
    inStock: true,
    sku: 'BM-NV-EGL',
    svgKey: 'eagle',
    tags: ['beginner', 'collectible', 'gift', 'animal'],
  },
  {
    id: 12,
    name: 'Indoor Micro Float',
    category: 'Indoor boomerangs',
    catSlug: 'indoor',
    price: 24.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 487,
    badge: 'hot',
    description: 'Engineered specifically for indoor use: ultra-light EVA foam construction at just 12g means zero wall damage and instant fun in any living room, gym, or office space. Throws gently, returns sweetly. Perfect starter kit.',
    specs: { Material: 'EVA Foam', Weight: '12g', Wingspan: '28cm', 'Flight Range': '6-10m', 'Wind Speed': 'Still air', Skill: 'All levels' },
    colors: ['Sky Blue', 'Neon Orange', 'Bubblegum Pink', 'White'],
    sizes: ['Kids (28cm)', 'Adult (34cm)'],
    inStock: true,
    sku: 'BM-IN-MCR',
    svgKey: 'indoor',
    featured: true,
    tags: ['beginner', 'indoor', 'kids', 'starter'],
  },
];

// ---- SVG Shapes Library ----
const boomerangSVGs = {
  'v-shape': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8a020"/><stop offset="100%" stop-color="#b07a10"/></linearGradient></defs>
    <path d="M30 160 L100 40 L170 160 L150 160 L100 80 L50 160 Z" fill="url(#g1)" opacity="0.95"/>
    <path d="M30 160 L100 40 L170 160 L150 160 L100 80 L50 160 Z" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  </svg>`,
  'hook': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8a020"/><stop offset="100%" stop-color="#b07a10"/></linearGradient></defs>
    <path d="M50 30 Q50 30 60 30 L155 30 Q175 30 175 60 Q175 100 140 120 Q120 130 100 125 L100 110 Q115 115 130 105 Q155 90 155 60 L75 60 L75 170 L55 170 L55 45 Q50 42 50 30 Z" fill="url(#g2)"/>
  </svg>`,
  'question-mark': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8a020"/><stop offset="100%" stop-color="#b07a10"/></linearGradient></defs>
    <path d="M100 30 Q145 30 145 70 Q145 100 110 115 L108 140 L92 140 L90 108 Q120 98 125 80 Q125 50 100 50 Q75 50 75 70 L55 70 Q55 30 100 30 Z" fill="url(#g3)"/>
    <circle cx="100" cy="165" r="12" fill="url(#g3)"/>
  </svg>`,
  'tri-blade': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8a020"/><stop offset="100%" stop-color="#b07a10"/></linearGradient></defs>
    <g transform="translate(100,100)">
      <path d="M0 -70 L12 -10 L-12 -10 Z" fill="url(#g4)" transform="rotate(0)"/>
      <path d="M0 -70 L12 -10 L-12 -10 Z" fill="url(#g4)" transform="rotate(120)"/>
      <path d="M0 -70 L12 -10 L-12 -10 Z" fill="url(#g4)" transform="rotate(240)"/>
      <circle cx="0" cy="0" r="14" fill="url(#g4)"/>
    </g>
  </svg>`,
  'four-wing': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8a020"/><stop offset="100%" stop-color="#b07a10"/></linearGradient></defs>
    <g transform="translate(100,100)">
      <path d="M0 -75 L10 -8 L-10 -8 Z" fill="url(#g5)" transform="rotate(0)"/>
      <path d="M0 -75 L10 -8 L-10 -8 Z" fill="url(#g5)" transform="rotate(90)"/>
      <path d="M0 -75 L10 -8 L-10 -8 Z" fill="url(#g5)" transform="rotate(180)"/>
      <path d="M0 -75 L10 -8 L-10 -8 Z" fill="url(#g5)" transform="rotate(270)"/>
      <circle cx="0" cy="0" r="12" fill="url(#g5)"/>
    </g>
  </svg>`,
  'five-wing': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8a020"/><stop offset="100%" stop-color="#b07a10"/></linearGradient></defs>
    <g transform="translate(100,100)">
      <path d="M0 -72 L9 -8 L-9 -8 Z" fill="url(#g6)" transform="rotate(0)"/>
      <path d="M0 -72 L9 -8 L-9 -8 Z" fill="url(#g6)" transform="rotate(72)"/>
      <path d="M0 -72 L9 -8 L-9 -8 Z" fill="url(#g6)" transform="rotate(144)"/>
      <path d="M0 -72 L9 -8 L-9 -8 Z" fill="url(#g6)" transform="rotate(216)"/>
      <path d="M0 -72 L9 -8 L-9 -8 Z" fill="url(#g6)" transform="rotate(288)"/>
      <circle cx="0" cy="0" r="11" fill="url(#g6)"/>
    </g>
  </svg>`,
  'ring': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g7" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8a020"/><stop offset="100%" stop-color="#b07a10"/></linearGradient></defs>
    <circle cx="100" cy="100" r="72" fill="none" stroke="url(#g7)" stroke-width="22"/>
    <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="22"/>
  </svg>`,
  'delta': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g8" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8a020"/><stop offset="100%" stop-color="#b07a10"/></linearGradient></defs>
    <polygon points="100,25 175,170 25,170" fill="url(#g8)"/>
    <polygon points="100,70 145,165 55,165" fill="rgba(0,0,0,0.3)"/>
    <line x1="100" y1="25" x2="100" y2="170" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  </svg>`,
  's-shape': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g9" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8a020"/><stop offset="100%" stop-color="#b07a10"/></linearGradient></defs>
    <path d="M130 35 Q165 35 165 70 Q165 100 100 105 Q35 110 35 140 Q35 170 75 170 L75 152 Q55 152 55 140 Q55 118 120 113 Q185 108 185 70 Q185 25 130 25 Z" fill="url(#g9)"/>
  </svg>`,
  'bat': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g10" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8a020"/><stop offset="100%" stop-color="#b07a10"/></linearGradient></defs>
    <path d="M100 90 L20 50 L35 80 L10 75 L30 105 L60 95 L70 120 Q80 110 100 108 Q120 110 130 120 L140 95 L170 105 L190 75 L165 80 L180 50 Z" fill="url(#g10)"/>
    <ellipse cx="100" cy="120" rx="15" ry="20" fill="url(#g10)"/>
    <path d="M87 115 L100 108 L113 115" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
  </svg>`,
  'eagle': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g11" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8a020"/><stop offset="100%" stop-color="#b07a10"/></linearGradient></defs>
    <path d="M100 85 L15 60 L25 85 L5 82 L22 108 L55 95 L72 130 Q86 118 100 116 Q114 118 128 130 L145 95 L178 108 L195 82 L175 85 L185 60 Z" fill="url(#g11)"/>
    <ellipse cx="100" cy="130" rx="16" ry="28" fill="url(#g11)"/>
    <path d="M90 130 L100 118 L110 130" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="1.5"/>
    <circle cx="100" cy="88" r="10" fill="#f0ede6"/>
    <circle cx="100" cy="88" r="5" fill="#0a0a0f"/>
  </svg>`,
  'indoor': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g12" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#5b9cf6"/><stop offset="100%" stop-color="#3a6fd8"/></linearGradient></defs>
    <path d="M40 155 L100 50 L160 155 L142 155 L100 75 L58 155 Z" fill="url(#g12)" opacity="0.9"/>
    <path d="M40 155 L100 50 L160 155 L142 155 L100 75 L58 155 Z" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <circle cx="100" cy="100" r="8" fill="rgba(255,255,255,0.3)"/>
  </svg>`,
};

function getSVG(key, size = '100%') {
  const px = typeof size === 'string' && size.includes('px') ? size : null;
  const style = px
    ? `width:${px};height:${px};object-fit:contain;display:block;`
    : `width:${size};height:${size};object-fit:contain;display:block;`;
  return `<img src="images/products/${key}-1.png" alt="${key} boomerang" style="${style}" loading="lazy" draggable="false"/>`;
}

function getAlternateSVG(key) {
  return `<img src="images/products/${key}-2.png" alt="${key} boomerang alternate view" style="width:100%;height:100%;object-fit:contain;display:block;" loading="lazy" draggable="false"/>`;
}

// =============================
//  LOADING SCREEN
// =============================
function initLoader() {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => { loader.style.display = 'none'; }, 700);
  }, 1800);
}

// =============================
//  CUSTOM CURSOR
// =============================
function initCursor() {
  const cursor = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  if (!cursor || !ring || window.matchMedia('(pointer: coarse)').matches) return;

  let rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    rx += (e.clientX - rx) * 0.12;
    ry += (e.clientY - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
  });

  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, [role="button"], .product-card, .swatch, .cat-tab')) {
      cursor.style.width = '18px';
      cursor.style.height = '18px';
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.borderColor = 'rgba(232,160,32,0.8)';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, [role="button"], .product-card, .swatch, .cat-tab')) {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(232,160,32,0.5)';
    }
  });
}

// =============================
//  NAVBAR
// =============================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    state.scrollY = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Announcement bar close
  const closeBar = document.querySelector('.close-bar');
  const annBar = document.querySelector('.announcement-bar');
  if (closeBar && annBar) {
    closeBar.addEventListener('click', () => {
      annBar.style.transition = 'height 0.3s ease, padding 0.3s ease, opacity 0.3s ease';
      annBar.style.height = '0';
      annBar.style.padding = '0';
      annBar.style.opacity = '0';
      annBar.style.overflow = 'hidden';
      // slide navbar up to take over top position
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.style.transition = 'top 0.3s ease, background 0.28s cubic-bezier(0.4,0,0.2,1), box-shadow 0.28s cubic-bezier(0.4,0,0.2,1)';
        navbar.style.top = '0';
      }
      // also fix hero and page-header padding
      const hero = document.querySelector('.hero');
      if (hero) hero.style.paddingTop = '72px';
      const pageHeader = document.querySelector('.page-header');
      if (pageHeader) pageHeader.style.marginTop = '72px';
    });
  }

  // Mobile nav
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
    if (mobileClose) mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
  }
}

// =============================
//  REVEAL ON SCROLL
// =============================
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

// =============================
//  COUNTDOWN TIMER
// =============================
function initCountdown() {
  function getTarget() {
    const t = new Date();
    t.setHours(23, 59, 59, 0);
    return t;
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    const now = new Date();
    const diff = Math.max(0, getTarget() - now);
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const hEl = document.getElementById('cd-h');
    const mEl = document.getElementById('cd-m');
    const sEl = document.getElementById('cd-s');
    if (hEl) hEl.textContent = pad(h);
    if (mEl) mEl.textContent = pad(m);
    if (sEl) sEl.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
}

// =============================
//  TOAST SYSTEM
// =============================
function showToast(title, msg, type = 'success', duration = 3200) {
  const container = document.querySelector('.toast-container');
  if (!container) return;
  const icons = { success: '&#10003;', error: '&#10007;', info: 'i', warning: '!' };
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon ${type}">${icons[type] || icons.success}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => { requestAnimationFrame(() => toast.classList.add('show')); });
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// =============================
//  CART
// =============================
function openCart() {
  document.getElementById('cart-panel').classList.add('active');
  document.getElementById('overlay').classList.add('active');
  state.cartOpen = true;
  renderCart();
}
function closeCart() {
  document.getElementById('cart-panel').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
  state.cartOpen = false;
}
function addToCart(productId, qty = 1) {
  const p = products.find(x => x.id === productId);
  if (!p) return;
  const existing = state.cart.find(x => x.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({ ...p, qty });
  }
  updateCartBadge();
  showToast('Added to cart', `${p.name} x${qty}`, 'success');
  renderCart();
}
function removeFromCart(productId) {
  state.cart = state.cart.filter(x => x.id !== productId);
  updateCartBadge();
  renderCart();
}
function updateQty(productId, delta) {
  const item = state.cart.find(x => x.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  updateCartBadge();
  renderCart();
}
function updateCartBadge() {
  const total = state.cart.reduce((a, b) => a + b.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}
function getCartSubtotal() {
  return state.cart.reduce((a, b) => a + b.price * b.qty, 0);
}
function renderCart() {
  const body = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');
  if (!body) return;
  if (state.cart.length === 0) {
    body.innerHTML = `<div class="cart-empty">
      <div class="cart-empty-icon">&#128722;</div>
      <div class="cart-empty-text">Your cart is empty</div>
      <div class="cart-empty-sub">Add some boomerangs to get started</div>
      <button class="btn btn-primary btn-sm mt-16" onclick="closeCart(); showShop();">Browse Products</button>
    </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }
  if (footer) footer.style.display = 'block';
  const subtotal = getCartSubtotal();
  const discount = state.couponApplied ? state.couponDiscount : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  body.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${getSVG(item.svgKey, '50px')}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-variant">${item.category}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        <div class="qty-control">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">&#128465;</button>
    </div>
  `).join('');

  if (footer) {
    footer.innerHTML = `
      <div class="coupon-row">
        <input class="coupon-input" id="coupon-input" placeholder="Discount code" value="${state.couponApplied ? 'BOOMR20' : ''}"/>
        <button class="btn btn-outline btn-sm" onclick="applyCoupon()">Apply</button>
      </div>
      <div class="cart-summary-line"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
      ${discount > 0 ? `<div class="cart-summary-line" style="color:var(--success)"><span>Discount (BOOMR20)</span><span>-$${discount.toFixed(2)}</span></div>` : ''}
      <div class="cart-summary-line"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:var(--success)">Free</span>' : '$' + shipping.toFixed(2)}</span></div>
      ${shipping > 0 ? `<div style="font-size:0.75rem;color:var(--chalk-dim);margin:-8px 0 4px">Free shipping on orders over $100</div>` : ''}
      <div class="cart-summary-line total"><span>Total</span><span class="amount">$${total.toFixed(2)}</span></div>
      <button class="btn btn-primary" style="width:100%;margin-top:16px" onclick="closeCart(); openCheckout();">Proceed to Checkout</button>
      <button class="btn btn-ghost" style="width:100%;margin-top:8px;font-size:0.8rem" onclick="closeCart()">Continue Shopping</button>
    `;
  }
}
function applyCoupon() {
  const val = document.getElementById('coupon-input')?.value.trim().toUpperCase();
  if (val === 'BOOMR20') {
    state.couponApplied = true;
    state.couponDiscount = getCartSubtotal() * 0.2;
    showToast('Coupon applied!', '20% discount added to your order', 'success');
    renderCart();
  } else if (val === 'FREESHIP') {
    showToast('Coupon applied!', 'Free shipping on this order', 'success');
    renderCart();
  } else {
    showToast('Invalid code', 'Try BOOMR20 for 20% off', 'error');
  }
}

// =============================
//  WISHLIST
// =============================
function openWishlist() {
  document.getElementById('wishlist-panel').classList.add('active');
  document.getElementById('overlay').classList.add('active');
  state.wishlistOpen = true;
  renderWishlist();
}
function closeWishlist() {
  document.getElementById('wishlist-panel').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
  state.wishlistOpen = false;
}
function toggleWishlist(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return;
  const idx = state.wishlist.findIndex(x => x.id === productId);
  if (idx >= 0) {
    state.wishlist.splice(idx, 1);
    showToast('Removed', `${p.name} removed from wishlist`, 'info');
  } else {
    state.wishlist.push(p);
    showToast('Saved!', `${p.name} added to your wishlist`, 'success');
  }
  updateWishlistBadge();
  document.querySelectorAll(`[data-wish="${productId}"]`).forEach(el => {
    el.classList.toggle('active', state.wishlist.some(x => x.id === productId));
  });
  renderWishlist();
}
function updateWishlistBadge() {
  document.querySelectorAll('.wishlist-badge').forEach(el => {
    el.textContent = state.wishlist.length;
    el.style.display = state.wishlist.length > 0 ? 'flex' : 'none';
  });
}
function renderWishlist() {
  const body = document.getElementById('wishlist-body');
  if (!body) return;
  if (state.wishlist.length === 0) {
    body.innerHTML = `<div class="cart-empty">
      <div class="cart-empty-icon">&#10084;&#65039;</div>
      <div class="cart-empty-text">Your wishlist is empty</div>
      <div class="cart-empty-sub">Save items you love for later</div>
    </div>`;
    return;
  }
  body.innerHTML = state.wishlist.map(p => `
    <div class="wishlist-item">
      <div class="wishlist-item-img">${getSVG(p.svgKey, '40px')}</div>
      <div>
        <div class="wishlist-item-name">${p.name}</div>
        <div class="wishlist-item-price">$${p.price.toFixed(2)}</div>
      </div>
      <div class="wishlist-actions">
        <button class="btn btn-primary btn-sm" onclick="addToCart(${p.id}); closeWishlist(); openCart();">Add to Cart</button>
        <button class="btn btn-ghost btn-sm btn-icon" onclick="toggleWishlist(${p.id})" style="color:var(--danger)">&#10005;</button>
      </div>
    </div>
  `).join('');
}

// =============================
//  SEARCH
// =============================
function openSearch() {
  document.getElementById('search-overlay').classList.add('active');
  document.getElementById('search-input').focus();
}
function closeSearch() {
  document.getElementById('search-overlay').classList.remove('active');
}
function doSearch(q) {
  const query = q || document.getElementById('search-input').value.trim().toLowerCase();
  if (!query) return;
  closeSearch();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.tags.some(t => t.includes(query))
  );
  showShop(filtered, `Search results for "${q || document.getElementById('search-input')?.value}"`);
}

// =============================
//  LOGIN MODAL
// =============================
function openLogin() {
  document.getElementById('login-modal').classList.add('active');
}
function closeLogin() {
  document.getElementById('login-modal').classList.remove('active');
}
function switchLoginTab(tab) {
  state.loginTab = tab;
  document.querySelectorAll('.modal-tab').forEach(el => el.classList.toggle('active', el.dataset.tab === tab));
  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
}

// =============================
//  CHECKOUT
// =============================
function openCheckout() {
  if (state.cart.length === 0) {
    showToast('Cart is empty', 'Add products before checking out', 'warning');
    openCart();
    return;
  }
  renderCheckout();
  document.getElementById('checkout-modal').classList.add('active');
}
function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('active');
}
function renderCheckout() {
  const orderItems = document.getElementById('checkout-order-items');
  const orderTotals = document.getElementById('checkout-order-totals');
  if (!orderItems || !orderTotals) return;
  const subtotal = getCartSubtotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;
  orderItems.innerHTML = state.cart.map(item => `
    <div class="order-item">
      <div class="order-item-img">${getSVG(item.svgKey, '32px')}</div>
      <div style="flex:1">
        <div class="order-item-name">${item.name}</div>
        <div class="order-item-qty">Qty: ${item.qty}</div>
      </div>
      <div class="order-item-price">$${(item.price * item.qty).toFixed(2)}</div>
    </div>
  `).join('');
  orderTotals.innerHTML = `
    <div class="cart-summary-line"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
    <div class="cart-summary-line"><span>Shipping</span><span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span></div>
    <div class="cart-summary-line total"><span>Total</span><span class="amount">$${total.toFixed(2)}</span></div>
  `;
}
function selectPayment(method) {
  state.currentPayment = method;
  document.querySelectorAll('.payment-option').forEach(el => {
    el.classList.toggle('selected', el.dataset.method === method);
  });
  const cardFields = document.getElementById('card-fields');
  if (cardFields) cardFields.style.display = method === 'card' ? 'block' : 'none';
}
function placeOrder() {
  const form = document.getElementById('checkout-form');
  const fields = form ? form.querySelectorAll('[required]') : [];
  let valid = true;
  fields.forEach(f => { if (!f.value.trim()) { valid = false; f.style.borderColor = 'var(--danger)'; } else { f.style.borderColor = ''; } });
  if (!valid) { showToast('Missing fields', 'Please fill all required fields', 'error'); return; }
  closeCheckout();
  state.cart = [];
  state.couponApplied = false;
  state.couponDiscount = 0;
  updateCartBadge();
  setTimeout(() => {
    showOrderConfirmation();
  }, 200);
}
function showOrderConfirmation() {
  const modal = document.getElementById('confirm-modal');
  if (modal) modal.classList.add('active');
}
function closeConfirmModal() {
  document.getElementById('confirm-modal').classList.remove('active');
}

// =============================
//  OVERLAY
// =============================
function initOverlay() {
  document.getElementById('overlay')?.addEventListener('click', () => {
    closeCart();
    closeWishlist();
  });
}

// =============================
//  PRODUCT GRID (Shop)
// =============================
let currentCategory = 'all';
let currentSort = 'featured';
function showShop(overrideProducts, headerTitle) {
  document.getElementById('homepage').style.display = 'none';
  document.getElementById('shop-page').style.display = 'block';
  document.getElementById('product-page').style.display = 'none';
  document.getElementById('shop-header-title').textContent = headerTitle || 'All Boomerangs';
  renderShopGrid(overrideProducts);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function showHome() {
  document.getElementById('homepage').style.display = 'block';
  document.getElementById('shop-page').style.display = 'none';
  document.getElementById('product-page').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(initReveal, 100);
}
function filterCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll('.cat-tab').forEach(el => el.classList.toggle('active', el.dataset.cat === cat));
  renderShopGrid();
}
function sortProducts(val) {
  currentSort = val;
  renderShopGrid();
}
function renderShopGrid(overrideList) {
  let list = overrideList || [...products];
  if (!overrideList && currentCategory !== 'all') {
    list = list.filter(p => p.catSlug === currentCategory);
  }
  switch(currentSort) {
    case 'price-asc':  list.sort((a,b) => a.price - b.price); break;
    case 'price-desc': list.sort((a,b) => b.price - a.price); break;
    case 'rating':     list.sort((a,b) => b.rating - a.rating); break;
    case 'newest':     list.sort((a,b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0)); break;
    default: list.sort((a,b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
  const grid = document.getElementById('shop-grid');
  const countEl = document.getElementById('shop-count');
  if (countEl) countEl.textContent = `${list.length} product${list.length !== 1 ? 's' : ''}`;
  if (!grid) return;
  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--chalk-dim)">
      <div style="font-size:3rem;margin-bottom:16px">&#128722;</div>
      <div style="font-family:var(--ff-display);font-weight:700;color:var(--chalk);margin-bottom:8px">No products found</div>
      <div>Try a different category or search term</div>
    </div>`;
    return;
  }
  grid.innerHTML = list.map(p => renderProductCard(p)).join('');
  setTimeout(initReveal, 50);
}
function renderProductCard(p) {
  const starsHTML = Array.from({length: 5}, (_,i) => `<span class="star ${i < Math.round(p.rating) ? '' : 'empty'}">&#9733;</span>`).join('');
  const badge = p.badge ? `<span class="badge-tag badge-${p.badge}">${p.badge}</span>` : '';
  const inWish = state.wishlist.some(x => x.id === p.id);
  return `
    <div class="product-card reveal" onclick="showProduct(${p.id})">
      <div class="product-card-image">
        <div class="card-badges">${badge}</div>
        <button class="card-wish ${inWish ? 'active' : ''}" data-wish="${p.id}" onclick="event.stopPropagation(); toggleWishlist(${p.id})" aria-label="Add to wishlist">&#10084;</button>
        ${getSVG(p.svgKey, '65%')}
        <div class="hover-img">${getAlternateSVG(p.svgKey)}</div>
      </div>
      <div class="card-body">
        <div class="card-category">${p.category}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-rating">
          <div class="stars">${starsHTML}</div>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="card-price">
          <div>
            <span class="price-main">$${p.price.toFixed(2)}</span>
            ${p.originalPrice ? `<span class="price-old">$${p.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id})" aria-label="Add to cart">+</button>
        </div>
      </div>
    </div>
  `;
}

// =============================
//  PRODUCT DETAIL PAGE
// =============================
function showProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  state.currentProduct = p;
  state.currentQty = 1;
  state.currentTab = 'description';
  document.getElementById('homepage').style.display = 'none';
  document.getElementById('shop-page').style.display = 'none';
  document.getElementById('product-page').style.display = 'block';
  renderProductPage(p);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function renderProductPage(p) {
  const page = document.getElementById('product-page');
  if (!page) return;
  const starsHTML = Array.from({length: 5}, (_,i) => `<span class="star ${i < Math.round(p.rating) ? '' : 'empty'}">&#9733;</span>`).join('');
  const specRows = Object.entries(p.specs).map(([k,v]) => `<div class="spec-row"><div class="spec-key">${k}</div><div class="spec-val">${v}</div></div>`).join('');
  const inWish = state.wishlist.some(x => x.id === p.id);
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  const related = products.filter(x => x.catSlug !== p.catSlug && x.id !== p.id).slice(0, 4);
  const reviews = [
    { name: 'Jordan K.', rating: 5, date: 'March 2025', text: 'Absolutely incredible flight path. Returns within a foot of where I threw it every single time. The build quality is exceptional.', verified: true },
    { name: 'Mia S.', rating: 5, date: 'January 2025', text: 'Perfect for competition throwing. The weight distribution is outstanding and it handles light wind beautifully.', verified: true },
    { name: 'Felix R.', rating: 4, date: 'February 2025', text: 'Great boomerang, very happy with the purchase. Just takes some practice to nail the release angle.', verified: false },
  ];
  const reviewsHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div>
          <div class="reviewer-name">${r.name}</div>
          <div class="stars" style="margin-top:4px">${Array.from({length:5},(_,i) => `<span class="star ${i<r.rating?'':'empty'}">&#9733;</span>`).join('')}</div>
        </div>
        <div class="review-date">${r.date}</div>
      </div>
      <p class="review-body">${r.text}</p>
      ${r.verified ? '<div class="review-verified">&#10003; Verified Purchase</div>' : ''}
    </div>
  `).join('');

  page.innerHTML = `
    <div style="margin-top:72px">
      <div class="page-header">
        <div class="container">
          <div class="breadcrumb">
            <a href="#" onclick="showHome()">Home</a>
            <span class="sep">/</span>
            <a href="#" onclick="showShop()">Shop</a>
            <span class="sep">/</span>
            <span class="current">${p.name}</span>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="product-detail-layout">
          <!-- Gallery -->
          <div class="product-gallery">
            <div class="main-image" id="main-img-wrapper">
              ${getSVG(p.svgKey, '70%')}
            </div>
            <div class="thumb-grid">
              <div class="thumb active" onclick="switchMainImage('primary', this)">${getSVG(p.svgKey, '50%')}</div>
              <div class="thumb" onclick="switchMainImage('alt', this)">${getAlternateSVG(p.svgKey).replace('width="100%" height="100%"', 'width="50%" height="50%"')}</div>
              <div class="thumb" onclick="switchMainImage('primary', this)">${getSVG(p.svgKey, '50%')}</div>
              <div class="thumb" onclick="switchMainImage('alt', this)">${getAlternateSVG(p.svgKey).replace('width="100%" height="100%"', 'width="50%" height="50%"')}</div>
            </div>
          </div>
          <!-- Info -->
          <div class="product-info">
            <div class="product-category-tag">&#9679; ${p.category}</div>
            <h1 class="product-title t-display">${p.name}</h1>
            <div class="product-rating-row">
              <div class="stars">${starsHTML}</div>
              <span style="font-family:var(--ff-mono);font-size:0.85rem;color:var(--chalk)">${p.rating}</span>
              <a class="review-link" href="#reviews" onclick="switchTab('reviews')">${p.reviews} reviews</a>
            </div>
            <div class="product-price-row">
              <span class="product-price-main">$${p.price.toFixed(2)}</span>
              ${p.originalPrice ? `<span class="product-price-old">$${p.originalPrice.toFixed(2)}</span>` : ''}
              ${discount ? `<span class="product-discount">-${discount}%</span>` : ''}
            </div>
            <p class="product-desc">${p.description}</p>
            <!-- Color Option -->
            <div class="product-options">
              <div class="option-label">Color <span id="selected-color">${p.colors[0]}</span></div>
              <div class="option-swatches">
                ${p.colors.map((c,i) => `<div class="swatch ${i===0?'active':''}" onclick="selectSwatch(this, 'selected-color', '${c}')">${c}</div>`).join('')}
              </div>
            </div>
            <!-- Size Option -->
            <div class="product-options">
              <div class="option-label">Size <span id="selected-size">${p.sizes[0]}</span></div>
              <div class="option-swatches">
                ${p.sizes.map((s,i) => `<div class="swatch ${i===0?'active':''}" onclick="selectSwatch(this, 'selected-size', '${s}')">${s}</div>`).join('')}
              </div>
            </div>
            <!-- Add to Cart -->
            <div class="add-row">
              <div class="qty-select">
                <button class="qty-select-btn" onclick="changeProductQty(-1)">-</button>
                <span class="qty-select-num" id="product-qty">1</span>
                <button class="qty-select-btn" onclick="changeProductQty(1)">+</button>
              </div>
              <button class="btn btn-primary" style="flex:1" onclick="addToCart(${p.id}, state.currentQty); openCart()">
                &#128722; Add to Cart
              </button>
              <button class="btn btn-outline btn-icon ${inWish ? 'active' : ''}" data-wish="${p.id}" onclick="toggleWishlist(${p.id}); this.classList.toggle('active')" style="font-size:1.1rem" aria-label="Wishlist">&#10084;</button>
            </div>
            <div class="trust-row">
              <div class="trust-item"><span class="ti">&#10003;</span> In Stock</div>
              <div class="trust-item"><span class="ti">&#10003;</span> Free returns 30 days</div>
              <div class="trust-item"><span class="ti">&#10003;</span> Secure checkout</div>
            </div>
            <!-- Meta -->
            <div class="product-meta">
              <div class="meta-row"><span class="meta-icon">&#128230;</span><span>Ships in <strong>1-3 business days</strong> worldwide</span></div>
              <div class="meta-row"><span class="meta-icon">&#128230;</span><span>SKU: <strong>${p.sku}</strong></span></div>
              <div class="meta-row"><span class="meta-icon">&#127991;</span><span>Tags: ${p.tags.map(t => `<span class="tag">${t}</span>`).join(' ')}</span></div>
            </div>
            <!-- Specs preview -->
            <div class="product-specs">
              ${specRows}
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div style="margin-top:64px">
          <div class="product-tabs">
            <button class="product-tab active" data-tab="description" onclick="switchTab('description')">Description</button>
            <button class="product-tab" data-tab="specs" onclick="switchTab('specs')">Specifications</button>
            <button class="product-tab" data-tab="reviews" onclick="switchTab('reviews')" id="reviews">Reviews (${p.reviews})</button>
            <button class="product-tab" data-tab="shipping" onclick="switchTab('shipping')">Shipping & Returns</button>
          </div>
          <div class="tab-panel active" id="tab-description">
            <p style="color:var(--chalk-dim);line-height:1.8;font-size:0.9375rem;max-width:720px">${p.description}</p>
            <p style="color:var(--chalk-dim);line-height:1.8;font-size:0.9375rem;max-width:720px;margin-top:16px">Every BOOMR. product is crafted to the highest standards. Our team of aerodynamics engineers and professional throwers collaborate on each design to achieve the perfect balance between visual impact and true-return flight performance. The ${p.name} has been through over 2,000 test throws before reaching you.</p>
          </div>
          <div class="tab-panel" id="tab-specs">
            <div class="product-specs" style="max-width:480px">${specRows}</div>
          </div>
          <div class="tab-panel" id="tab-reviews">
            <div style="display:grid;grid-template-columns:200px 1fr;gap:40px;align-items:flex-start;margin-bottom:32px">
              <div style="text-align:center;background:var(--card);border:1px solid var(--border);border-radius:var(--r-lg);padding:24px">
                <div style="font-family:var(--ff-display);font-weight:800;font-size:3rem;color:var(--chalk)">${p.rating}</div>
                <div class="stars" style="justify-content:center;margin:8px 0">${starsHTML}</div>
                <div style="font-size:0.8rem;color:var(--chalk-dim)">${p.reviews} reviews</div>
                <div style="margin-top:16px">
                  ${[5,4,3,2,1].map(n => {
                    const pct = n===5 ? 70 : n===4 ? 20 : n===3 ? 7 : n===2 ? 2 : 1;
                    return `<div class="rating-bar-row">
                      <span class="rating-bar-label">${n}</span>
                      <div class="rating-bar-bar"><div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div></div>
                      <span class="rating-bar-count">${pct}</span>
                    </div>`;
                  }).join('')}
                </div>
              </div>
              <div>${reviewsHTML}</div>
            </div>
          </div>
          <div class="tab-panel" id="tab-shipping">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:720px">
              <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r-lg);padding:24px">
                <div style="font-family:var(--ff-display);font-weight:700;color:var(--chalk);margin-bottom:12px">&#128230; Shipping</div>
                <ul style="display:flex;flex-direction:column;gap:8px;font-size:0.875rem;color:var(--chalk-dim)">
                  <li>&#10003; Standard (5-7 days): $9.99</li>
                  <li>&#10003; Express (2-3 days): $19.99</li>
                  <li>&#10003; Overnight: $34.99</li>
                  <li>&#10003; Free on orders over $100</li>
                  <li>&#10003; Ships to 60+ countries</li>
                </ul>
              </div>
              <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r-lg);padding:24px">
                <div style="font-family:var(--ff-display);font-weight:700;color:var(--chalk);margin-bottom:12px">&#8617;&#65039; Returns</div>
                <ul style="display:flex;flex-direction:column;gap:8px;font-size:0.875rem;color:var(--chalk-dim)">
                  <li>&#10003; 30-day return window</li>
                  <li>&#10003; Full refund on unused items</li>
                  <li>&#10003; Free return label provided</li>
                  <li>&#10003; Exchange for any product</li>
                  <li>&#10003; Defect warranty: 1 year</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div class="section">
          <div class="section-header" style="text-align:left;margin-bottom:32px">
            <span class="section-eyebrow">You might also like</span>
            <h2 class="section-title" style="text-align:left">Related Products</h2>
          </div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px">
            ${related.map(r => renderProductCard(r)).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  setTimeout(initReveal, 100);
}
function switchMainImage(type, thumbEl) {
  const wrapper = document.getElementById('main-img-wrapper');
  if (!wrapper || !state.currentProduct) return;
  const key = state.currentProduct.svgKey;
  const imgNum = type === 'primary' ? '1' : '2';
  wrapper.innerHTML = `<img src="images/products/${key}-${imgNum}.png" alt="${state.currentProduct.name}" style="width:70%;height:70%;object-fit:contain;display:block;transition:transform 0.4s ease;" loading="eager" draggable="false"/>`;
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
}
function switchTab(tabName) {
  document.querySelectorAll('.product-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + tabName));
}
function selectSwatch(el, targetId, val) {
  el.parentNode.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  const target = document.getElementById(targetId);
  if (target) target.textContent = val;
}
function changeProductQty(delta) {
  state.currentQty = Math.max(1, (state.currentQty || 1) + delta);
  const el = document.getElementById('product-qty');
  if (el) el.textContent = state.currentQty;
}

// =============================
//  HERO FEATURED CARDS
// =============================
function renderFeaturedProducts() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const featured = products.filter(p => p.featured).slice(0, 4);
  grid.innerHTML = featured.map(p => renderProductCard(p)).join('');
}
function renderCategoryCards() {
  const grid = document.getElementById('category-grid');
  if (!grid) return;
  const cats = [
    { name: 'Traditional', slug: 'v-shaped', svg: 'v-shape', count: 3 },
    { name: 'Hook-shaped', slug: 'hook', svg: 'hook', count: 2 },
    { name: 'Tri-blade', slug: 'tri-blade', svg: 'tri-blade', count: 2 },
    { name: 'Ring', slug: 'ring', svg: 'ring', count: 2 },
    { name: 'Indoor', slug: 'indoor', svg: 'indoor', count: 4 },
    { name: 'Novelty', slug: 'bat', svg: 'bat', count: 5 },
  ];
  grid.innerHTML = cats.map(c => `
    <div class="product-card reveal" style="cursor:pointer" onclick="showShop(); setTimeout(() => filterCategory('${c.slug}'), 100)">
      <div class="product-card-image" style="aspect-ratio:1.2">
        ${getSVG(c.svg, '55%')}
      </div>
      <div class="card-body">
        <div class="card-name">${c.name}</div>
        <div class="t-muted" style="font-size:0.8125rem;font-family:var(--ff-mono)">${c.count} products</div>
      </div>
    </div>
  `).join('');
}

// =============================
//  DEAL OF THE DAY
// =============================
function renderDeal() {
  const p = products.find(x => x.id === 3); // Riddle Curve QM
  if (!p) return;
  const dealImg = document.getElementById('deal-img');
  if (dealImg) dealImg.innerHTML = `<img src="images/ui/deal-featured.png" alt="Riddle Curve QM - Deal of the Day" style="width:80%;height:80%;object-fit:contain;display:block;margin:0 auto;" loading="eager" draggable="false"/>`;
  const dealBtn = document.getElementById('deal-add-btn');
  if (dealBtn) dealBtn.onclick = () => { addToCart(p.id); openCart(); };
}

// =============================
//  SHOP PAGE RENDER
// =============================
function renderShopPage() {
  const page = document.getElementById('shop-page');
  if (!page) return;
  const catSlugs = [...new Set(products.map(p => p.catSlug))];
  const catNames = {
    'v-shaped': 'Traditional V', 'hook': 'Hook', 'question-mark': 'Question Mark',
    'tri-blade': 'Tri-blade', 'four-wing': 'Four-wing', 'multi-wing': 'Multi-wing',
    'ring': 'Ring', 'delta': 'Delta', 's-shaped': 'S-shaped',
    'bat': 'Bat Novelty', 'animal': 'Animal', 'indoor': 'Indoor',
  };
  page.innerHTML = `
    <div style="margin-top:72px">
      <div class="page-header">
        <div class="container page-header-content">
          <div class="breadcrumb"><a href="#" onclick="showHome()">Home</a><span class="sep">/</span><span class="current" id="shop-header-title">All Boomerangs</span></div>
          <h1 class="page-header-title t-display" id="shop-header-title">All Boomerangs</h1>
          <p class="page-header-sub">The world's most complete collection of handcrafted boomerangs</p>
        </div>
      </div>
      <div class="container">
        <div class="shop-layout">
          <!-- Sidebar -->
          <aside class="filter-sidebar">
            <div class="filter-section">
              <div class="filter-header"><span class="filter-header-title">Category</span></div>
              <div class="filter-body">
                <div class="filter-option" onclick="filterCategory('all')">
                  <label class="filter-option-label"><input type="radio" name="cat" ${currentCategory==='all'?'checked':''} onchange="filterCategory('all')"> All Products</label>
                  <span class="filter-count">${products.length}</span>
                </div>
                ${catSlugs.map(s => `
                  <div class="filter-option" onclick="filterCategory('${s}')">
                    <label class="filter-option-label"><input type="radio" name="cat" ${currentCategory===s?'checked':''}> ${catNames[s] || s}</label>
                    <span class="filter-count">${products.filter(p => p.catSlug === s).length}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="filter-section">
              <div class="filter-header"><span class="filter-header-title">Price Range</span></div>
              <div class="filter-body">
                <div class="price-range">
                  <input type="range" class="range-slider" min="0" max="200" value="200" oninput="document.getElementById('price-max').textContent='$'+this.value">
                  <div class="range-vals"><span>$0</span><span id="price-max">$200</span></div>
                </div>
              </div>
            </div>
            <div class="filter-section">
              <div class="filter-header"><span class="filter-header-title">Skill Level</span></div>
              <div class="filter-body">
                ${['Beginner','Intermediate','Advanced','Expert'].map(s => `
                  <div class="filter-option"><label class="filter-option-label"><input type="checkbox"> ${s}</label></div>
                `).join('')}
              </div>
            </div>
            <div class="filter-section">
              <div class="filter-header"><span class="filter-header-title">Material</span></div>
              <div class="filter-body">
                ${['Carbon Fiber','Fibreglass','Hardwood','ABS Polymer','EVA Foam'].map(m => `
                  <div class="filter-option"><label class="filter-option-label"><input type="checkbox"> ${m}</label></div>
                `).join('')}
              </div>
            </div>
          </aside>
          <!-- Main -->
          <div>
            <div class="shop-toolbar">
              <span class="shop-toolbar-left"><span id="shop-count">12 products</span></span>
              <div class="shop-toolbar-right">
                <select class="sort-select" onchange="sortProducts(this.value)">
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <div class="view-toggle">
                  <button class="view-btn active" title="Grid view">&#9783;</button>
                  <button class="view-btn" title="List view">&#9776;</button>
                </div>
              </div>
            </div>
            <div class="products-grid" id="shop-grid"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  renderShopGrid();
}

// =============================
//  INIT ALL
// =============================
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initNavbar();
  initReveal();
  initCountdown();
  initOverlay();
  renderFeaturedProducts();
  renderCategoryCards();
  renderDeal();
  renderShopPage();

  // Search overlay keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeSearch();
      closeLogin();
      closeCheckout();
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  // Search enter
  const si = document.getElementById('search-input');
  if (si) si.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
});

// =============================
//  SCROLL PROGRESS BAR
// =============================
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-label', 'Page scroll progress');
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
  });
}

// =============================
//  HERO PARTICLE CANVAS
// =============================
function initParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'hero-canvas';
  hero.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const N = 40;
  for (let i = 0; i < N; i++) {
    particles.push({
      x: Math.random() * 1000,
      y: Math.random() * 800,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.5 + 0.2,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,160,32,${p.o})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(232,160,32,${0.08 * (1 - dist/120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  // Respect reduced motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) draw();
}

// =============================
//  CARD MOUSE GLOW
// =============================
function initCardGlow() {
  document.addEventListener('mousemove', e => {
    const card = e.target.closest('.product-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--glow-x', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--glow-y', (e.clientY - rect.top) + 'px');
  });
}

// =============================
//  MODAL OPEN/CLOSE LOCK
// =============================
function lockBody() { document.body.classList.add('modal-open'); }
function unlockBody() { document.body.classList.remove('modal-open'); }

// Patch open/close functions for body lock
const _openCart = openCart;
const _closeCart = closeCart;
// openCart/closeCart already defined, add body class via observer

const modalObserver = new MutationObserver(() => {
  const anyOpen = document.querySelector('.modal-overlay.active, .side-panel.active');
  anyOpen ? lockBody() : unlockBody();
});
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay, .side-panel').forEach(el => {
    modalObserver.observe(el, { attributes: true, attributeFilter: ['class'] });
  });
});

// =============================
//  CART BADGE BUMP ANIMATION
// =============================
const _addToCart = addToCart;
// Wrap add to cart to bump the badge
const origAddToCart = addToCart;
window.addToCart = function(productId, qty = 1) {
  origAddToCart(productId, qty);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.classList.remove('bump');
    void el.offsetWidth; // reflow
    el.classList.add('bump');
    setTimeout(() => el.classList.remove('bump'), 300);
  });
};

// =============================
//  COUNTDOWN FLIP EFFECT
// =============================
let _lastS = -1;
function patchCountdown() {
  const origTick = window._origTick;
  setInterval(() => {
    const sEl = document.getElementById('cd-s');
    if (sEl && sEl.textContent !== String(_lastS)) {
      _lastS = sEl.textContent;
      sEl.classList.remove('flip');
      void sEl.offsetWidth;
      sEl.classList.add('flip');
    }
  }, 1000);
}

// =============================
//  INTERSECTION REVEAL ENHANCED
// =============================
function initStaggerReveal() {
  const grids = document.querySelectorAll('.products-grid, .grid-3, .testimonials-grid, .features-grid');
  grids.forEach(grid => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.product-card, .testimonial-card, .feature-item');
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add('reveal', 'visible');
            }, i * 80);
          });
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    io.observe(grid);
  });
}

// =============================
//  KEYBOARD NAVIGATION
// =============================
function initKeyNav() {
  // Trap focus in modals
  document.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const modal = document.querySelector('.modal-overlay.active, .side-panel.active, .search-overlay.active');
    if (!modal) return;
    const focusable = modal.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { last.focus(); e.preventDefault(); }
    } else {
      if (document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });
}

// =============================
//  NUMBERS COUNTER ANIMATION
// =============================
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const from = 0;
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(from + (target - from) * eased);
    el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const val = parseFloat(el.dataset.count);
        if (!isNaN(val)) animateCounter(el, val);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
}

// =============================
//  INIT EVERYTHING
// =============================
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initParticles();
  initCardGlow();
  initKeyNav();
  initCounters();
  patchCountdown();
  setTimeout(initStaggerReveal, 500);
});
