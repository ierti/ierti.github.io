#!/usr/bin/env node
/**
 * 精选账号商城 · Verve Coffee 温暖手工风生成器
 * 风格：温暖奶油色 · 衬线标题 · 编辑式排版 · 手工质感
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DIST_DIR = path.join(__dirname, 'dist');

function loadJSON(name) {
    const fp = path.join(DATA_DIR, name);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
}

function esc(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fixImg(url, base) {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return base + url;
    return url;
}

// ── SEO 配置 ──
function loadRootJSON(name) {
    const fp = path.join(__dirname, name);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
}
const SEO = loadRootJSON('seo.json') || {};
const SEO_KEYWORDS = SEO.keywords || '';
const SEO_DESC = SEO.description || '';
const SITE_TITLE = SEO.title || '精选账号商城';
const SEO_TITLE_SUFFIX = SEO.titleSuffix || '';
const SEO_AUTHOR = SEO.author || SITE_TITLE;
const SEO_ROBOTS = SEO.robots || 'index, follow';
const SEO_CANONICAL = SEO.canonical || '';
const SEO_OG = SEO.og || {};
const SEO_TWITTER = SEO.twitter || {};
const SEO_JSON_LD = SEO.jsonLd || {};
const SEO_FAVICON = SEO.favicon || '';

// ── CSS ── Verve Coffee 风格：温暖 · 手工 · 编辑式
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

:root {
  --cream: #f7f3ee;
  --cream-dark: #efe9e0;
  --warm-white: #fdfbf8;
  --espresso: #2c1810;
  --espresso-light: #4a3228;
  --terracotta: #c4704b;
  --terracotta-light: #d4896a;
  --terracotta-dark: #a85a38;
  --sage: #7a8b6f;
  --sage-light: #a3b296;
  --sand: #d4c5b0;
  --sand-light: #e8ddd0;
  --charcoal: #3a3a3a;
  --gray-500: #8a8580;
  --gray-400: #a8a29e;
  --gray-300: #c8c2bc;
  --white: #ffffff;
  --font-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --max-w: 1280px;
  --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: var(--font-sans);
  background: var(--warm-white);
  color: var(--charcoal);
  line-height: 1.7;
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
img { max-width: 100%; height: auto; display: block; }
.container { max-width: var(--max-w); margin: 0 auto; padding: 0 24px; }

/* ── ANNOUNCEMENT BAR ── */
.announcement-bar {
  background: var(--espresso);
  color: var(--cream);
  text-align: center;
  padding: 10px 24px;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
}
.announcement-bar a { color: var(--cream); text-decoration: underline; text-underline-offset: 3px; }
.announcement-bar a:hover { color: var(--terracotta-light); }

/* ── HEADER ── */
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--warm-white);
  border-bottom: 1px solid var(--sand-light);
  transition: box-shadow 0.3s var(--ease);
}
.header.scrolled { box-shadow: 0 2px 20px rgba(44,24,16,0.06); }
.header-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 24px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo-area { display: flex; align-items: center; gap: 14px; }
.logo-mark {
  height: 44px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}
.logo-mark img { height: 100%; width: auto; border-radius: 12px; display: block; }
.nav-brand-text { display: flex; flex-direction: column; gap: 2px; }
.logo-text {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--espresso);
  letter-spacing: -0.01em;
}
.logo-sub {
  font-size: 0.72rem;
  color: var(--gray-400);
  letter-spacing: 0.02em;
}
.logo-sub a { color: var(--gray-400); }
.logo-sub a:hover { color: var(--terracotta); }
.header-nav { display: flex; align-items: center; gap: 36px; }
.header-nav a {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--gray-500);
  transition: color 0.2s;
  position: relative;
}
.header-nav a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--terracotta);
  transition: width 0.3s var(--ease);
}
.header-nav a:hover { color: var(--espresso); }
.header-nav a:hover::after { width: 100%; }
.header-actions { display: flex; align-items: center; gap: 14px; }
.btn-shop {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 30px;
  background: var(--espresso);
  color: var(--cream);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  transition: all 0.3s var(--ease);
  border: none;
}
.btn-shop:hover {
  background: var(--terracotta);
  color: var(--white);
}

/* ── HERO ── */
.hero {
  position: relative;
  background: var(--cream);
  overflow: hidden;
}
.hero-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 620px;
  align-items: center;
}
.hero-content {
  padding: 80px 60px 80px 24px;
}
.hero-eyebrow {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--terracotta);
  margin-bottom: 24px;
  position: relative;
  padding-left: 32px;
}
.hero-eyebrow::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 1.5px;
  background: var(--terracotta);
}
.hero h1 {
  font-family: var(--font-serif);
  font-size: clamp(2.6rem, 5vw, 4.2rem);
  font-weight: 500;
  line-height: 1.1;
  color: var(--espresso);
  margin-bottom: 28px;
  letter-spacing: -0.02em;
}
.hero h1 em {
  font-style: italic;
  color: var(--terracotta);
}
.hero-desc {
  font-size: 1.05rem;
  color: var(--gray-500);
  line-height: 1.9;
  margin-bottom: 44px;
  max-width: 440px;
}
.hero-actions { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 17px 44px;
  background: var(--espresso);
  color: var(--cream);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  border: none;
  transition: all 0.3s var(--ease);
  cursor: pointer;
}
.btn-primary:hover {
  background: var(--terracotta);
  color: var(--white);
}
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 17px 44px;
  background: transparent;
  color: var(--espresso);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  border: 1.5px solid var(--sand);
  transition: all 0.3s var(--ease);
  cursor: pointer;
}
.btn-secondary:hover { border-color: var(--espresso); background: var(--espresso); color: var(--cream); }

.hero-visual {
  position: relative;
  height: 100%;
  min-height: 620px;
  overflow: hidden;
}
.hero-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-visual-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--cream) 0%, transparent 25%);
}

/* ── TRUST BAR ── */
.trust-bar {
  background: var(--white);
  border-bottom: 1px solid var(--sand-light);
  padding: 32px 0;
}
.trust-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  gap: 56px;
  flex-wrap: wrap;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 14px;
}
.trust-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--cream);
  border: 1px solid var(--sand-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}
.trust-text h4 {
  font-family: var(--font-serif);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--espresso);
  margin-bottom: 2px;
}
.trust-text p {
  font-size: 0.75rem;
  color: var(--gray-400);
}

/* ── STATS ── */
.stats-section { padding: 72px 0; background: var(--cream); }
.stats-row {
  display: flex;
  justify-content: center;
  gap: 28px;
  flex-wrap: wrap;
}
.stat-card {
  text-align: center;
  padding: 36px 44px;
  background: var(--white);
  border-radius: 20px;
  min-width: 160px;
  transition: all 0.3s var(--ease);
  border: 1px solid var(--sand-light);
}
.stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(44,24,16,0.06); }
.stat-num {
  font-family: var(--font-serif);
  font-size: 2.6rem;
  font-weight: 500;
  color: var(--espresso);
  line-height: 1;
  margin-bottom: 10px;
}
.stat-label {
  font-size: 0.72rem;
  color: var(--gray-400);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

/* ── SECTION HEADER ── */
.section-header {
  text-align: center;
  margin-bottom: 52px;
}
.section-eyebrow {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--terracotta);
  margin-bottom: 14px;
}
.section-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 500;
  color: var(--espresso);
  margin-bottom: 14px;
  letter-spacing: -0.02em;
}
.section-desc {
  font-size: 1rem;
  color: var(--gray-500);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.8;
}

/* ── FILTER ── */
.filter-section { padding: 56px 0 0; }
.filter-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}
.filter-btn {
  padding: 11px 30px;
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  transition: all 0.25s var(--ease);
  background: transparent;
  color: var(--gray-500);
  border: 1.5px solid var(--sand);
  user-select: none;
}
.filter-btn:hover {
  color: var(--espresso);
  border-color: var(--espresso);
}
.filter-btn.active {
  background: var(--espresso);
  color: var(--cream);
  border-color: var(--espresso);
}

/* ── PRODUCTS ── */
.products-section { padding: 48px 0 88px; }
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
}
.product-card {
  position: relative;
  display: block;
  background: var(--white);
  border: 1px solid var(--sand-light);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.45s var(--ease);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(44,24,16,0.08);
  border-color: transparent;
}

.card-img-wrap {
  position: relative;
  overflow: hidden;
  height: 230px;
  background: var(--cream);
}
.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s var(--ease-out);
}
.product-card:hover .card-img-wrap img { transform: scale(1.05); }

.card-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
  padding: 6px 16px;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--espresso);
  color: var(--cream);
}

.card-body { padding: 22px; }
.card-cat {
  font-size: 0.66rem;
  color: var(--terracotta);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 10px;
}
.card-title {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 18px;
  color: var(--espresso);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3em;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 18px;
  border-top: 1px solid var(--cream);
}
.card-price {
  font-family: var(--font-sans);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--espresso);
}
.card-price .from {
  font-size: 0.68rem;
  font-weight: 400;
  color: var(--gray-400);
  margin-right: 2px;
}
.card-cta {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--cream);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-500);
  font-size: 0.9rem;
  transition: all 0.3s var(--ease);
  border: 1px solid var(--sand-light);
}
.product-card:hover .card-cta {
  background: var(--terracotta);
  color: var(--white);
  border-color: var(--terracotta);
}

/* ── STORY SECTION ── */
.story-section {
  padding: 88px 0;
  background: var(--cream);
}
.story-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  padding: 0 24px;
}
.story-content {}
.story-eyebrow {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--terracotta);
  margin-bottom: 18px;
}
.story-title {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 500;
  color: var(--espresso);
  line-height: 1.2;
  margin-bottom: 24px;
}
.story-text {
  font-size: 0.95rem;
  color: var(--gray-500);
  line-height: 1.9;
  margin-bottom: 32px;
}
.story-stats {
  display: flex;
  gap: 40px;
}
.story-stat-item {}
.story-stat-num {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 500;
  color: var(--espresso);
  line-height: 1;
}
.story-stat-label {
  font-size: 0.72rem;
  color: var(--gray-400);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 4px;
}
.story-visual {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4/5;
}
.story-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.story-visual-accent {
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: var(--terracotta);
  opacity: 0.15;
  pointer-events: none;
}

/* ── FEATURES ── */
.features-section {
  padding: 88px 0;
  background: var(--warm-white);
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
}
.feature-card {
  background: var(--white);
  border: 1px solid var(--sand-light);
  border-radius: 20px;
  padding: 44px 28px;
  text-align: center;
  transition: all 0.35s var(--ease);
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(44,24,16,0.06);
  border-color: transparent;
}
.feature-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin: 0 auto 22px;
  background: var(--cream);
  border: 1px solid var(--sand-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s;
}
.feature-card:hover .feature-icon {
  background: var(--espresso);
  border-color: var(--espresso);
  transform: scale(1.05);
}
.feature-card:hover .feature-icon span { filter: grayscale(1) brightness(10); }
.feature-card h3 {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--espresso);
}
.feature-card p {
  font-size: 0.85rem;
  color: var(--gray-500);
  line-height: 1.7;
}

/* ── CTA BANNER ── */
.cta-section { padding: 88px 0; }
.cta-banner {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  padding: 88px 40px;
  background: var(--espresso);
  color: var(--cream);
  text-align: center;
}
.cta-banner::before {
  content: '';
  position: absolute;
  top: -40%;
  right: -15%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(196,112,75,0.2), transparent 70%);
  pointer-events: none;
}
.cta-banner::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(122,139,111,0.15), transparent 70%);
  pointer-events: none;
}
.cta-banner h2 {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 500;
  margin-bottom: 18px;
  position: relative;
  letter-spacing: -0.01em;
}
.cta-banner h2 em { font-style: italic; color: var(--terracotta-light); }
.cta-banner p {
  color: rgba(247,243,238,0.6);
  font-size: 1rem;
  margin-bottom: 40px;
  position: relative;
  max-width: 460px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
}
.btn-white {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 17px 48px;
  background: var(--cream);
  color: var(--espresso);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  border: none;
  transition: all 0.3s var(--ease);
  position: relative;
  cursor: pointer;
}
.btn-white:hover {
  background: var(--terracotta);
  color: var(--white);
}

/* ── FOOTER ── */
.footer {
  background: var(--espresso);
  color: var(--cream);
  padding: 72px 0 44px;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 56px;
}
.footer-brand p {
  color: rgba(247,243,238,0.5);
  font-size: 0.85rem;
  line-height: 1.8;
  margin-top: 18px;
  max-width: 300px;
}
.footer .logo-text { color: var(--cream); }
.footer .logo-sub { color: rgba(247,243,238,0.4); }
.footer .logo-sub a { color: rgba(247,243,238,0.4); }
.footer .logo-sub a:hover { color: var(--terracotta-light); }
.footer-col h4 {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--cream);
  margin-bottom: 22px;
}
.footer-col a {
  display: block;
  color: rgba(247,243,238,0.5);
  font-size: 0.85rem;
  margin-bottom: 14px;
  transition: color 0.2s;
}
.footer-col a:hover { color: var(--terracotta-light); }
.footer-bottom {
  border-top: 1px solid rgba(247,243,238,0.1);
  padding-top: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.footer-bottom p {
  color: rgba(247,243,238,0.3);
  font-size: 0.78rem;
}
.footer-bottom-links { display: flex; gap: 24px; }
.footer-bottom-links a {
  color: rgba(247,243,238,0.3);
  font-size: 0.78rem;
  transition: color 0.2s;
}
.footer-bottom-links a:hover { color: var(--terracotta-light); }

/* ── ANIMATIONS ── */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.7s var(--ease-out);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-visual { display: none; }
  .hero-content { padding: 64px 24px; }
  .story-inner { grid-template-columns: 1fr; gap: 40px; }
  .story-visual { max-height: 400px; }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
}

@media (max-width: 768px) {
  .header-nav { display: none; }
  .header-inner { height: 64px; }
  .hero-content { padding: 48px 16px; }
  .hero h1 { font-size: 2.2rem; }
  .hero-desc { font-size: 0.95rem; }
  .hero-actions { flex-direction: column; align-items: stretch; }
  .btn-primary, .btn-secondary { text-align: center; justify-content: center; }
  .trust-inner { gap: 28px; }
  .trust-item { flex: 1; min-width: 140px; }
  .stats-row { gap: 14px; }
  .stat-card { padding: 28px 22px; min-width: 130px; }
  .stat-num { font-size: 2rem; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .card-img-wrap { height: 170px; }
  .card-body { padding: 16px; }
  .card-title { font-size: 0.9rem; min-height: auto; }
  .card-price { font-size: 1rem; }
  .features-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
  .feature-card { padding: 32px 18px; }
  .cta-banner { padding: 56px 24px; }
  .footer-grid { grid-template-columns: 1fr; gap: 28px; }
  .footer-bottom { flex-direction: column; text-align: center; }
  .container { padding: 0 16px; }
  .filter-bar { gap: 8px; }
  .filter-btn { padding: 9px 20px; font-size: 0.72rem; }
  .story-section { padding: 60px 0; }
  .story-stats { gap: 28px; }
}

@media (max-width: 480px) {
  .products-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .card-img-wrap { height: 140px; }
  .card-body { padding: 12px; }
  .card-tag { font-size: 0.6rem; padding: 4px 10px; }
  .card-cta { width: 30px; height: 30px; font-size: 0.75rem; }
  .stat-card { min-width: 110px; padding: 22px 16px; }
  .stat-num { font-size: 1.6rem; }
  .logo-text { font-size: 1.1rem; }
  .btn-shop { padding: 9px 20px; font-size: 0.75rem; }
}
`;

const JS = `
function filterCategory(id, el) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.product-card').forEach((c, i) => {
    if (id === 'all' || c.dataset.cat == id) {
      c.style.display = '';
      c.style.opacity = '0'; c.style.transform = 'translateY(16px)';
      setTimeout(() => { c.style.transition = 'all .45s cubic-bezier(0.25,0.46,0.45,0.94)'; c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, i * 50);
    } else { c.style.display = 'none'; }
  });
}
window.addEventListener('scroll', () => { document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20); });
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
`;

function main() {
    const config = loadJSON('config.json') || {};
    const categories = loadJSON('categories.json') || [];
    const products = loadJSON('products.json') || [];
    const meta = loadJSON('meta.json') || {};

    if (!products.length) { console.error('❌ 没有商品数据'); process.exit(1); }

    const siteUrl = meta.siteUrl || process.env.SITE_URL;
    const siteName = SITE_TITLE;
    const GITHUB_PAGES_URL = process.env.GITHUB_PAGES_URL;

    if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

    function shortCatName(name) {
        return name
            .replace(/谷歌美国电话\/?/i, '')
            .replace(/GoogleVoice\s*\/?\s*GV靓号/i, 'GV靓号')
            .replace(/谷歌邮箱\s*\/?\s*油管\s*\/?\s*Google\s*\/?\s*Gmail/i, '谷歌邮箱')
            .replace(/苹果id\s*\/?\s*Apple\s*id\s*\/?\s*AppStore/i, '苹果ID')
            .replace(/服务类/i, '服务类')
            .trim() || name;
    }

    const activeCats = categories.filter(c => products.some(p => p.category_id === c.id));
    const catBtns = activeCats
        .sort((a, b) => (b.sort || 0) - (a.sort || 0))
        .map(c => `<div class="filter-btn" onclick="filterCategory(${c.id}, this)">${esc(shortCatName(c.name))}</div>`)
        .join('\n            ');

    const cards = products.filter(p => p.active !== 0).sort((a, b) => (b.sort||0) - (a.sort||0)).map((p, i) => {
        const cat = categories.find(c => c.id === p.category_id);
        const catName = cat ? shortCatName(cat.name) : '';
        const img = p.image_url ? fixImg(p.image_url, siteUrl) : '';
        const variants = p.variants || [];
        const minPrice = variants.length ? Math.min(...variants.map(v => v.price)) : 0;
        const tags = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean);
        const cleanTag = t => t.replace(/b[12]#[0-9a-fA-F]{3,6}/g, '').replace(/#[0-9a-fA-F]{3,6}$/g, '').replace(/\s+/g, ' ').trim();
        const tagLabel = cleanTag(tags[0] || '');

        return `
            <a class="product-card reveal" href="${siteUrl}/product?id=${p.id}" target="_blank" rel="noopener" data-cat="${p.category_id}">
                <div class="card-img-wrap">
                    ${img ? `<img src="${esc(img)}" alt="${esc(p.name)}" loading="lazy">` : ''}
                    ${tagLabel ? `<div class="card-tag">${esc(tagLabel)}</div>` : ''}
                </div>
                <div class="card-body">
                    <div class="card-cat">${esc(catName)}</div>
                    <div class="card-title">${esc(p.name)}</div>
                    <div class="card-footer">
                        <div class="card-price"><span class="from">起</span><span class="amount">¥${minPrice.toFixed(2)}</span></div>
                        <div class="card-cta">→</div>
                    </div>
                </div>
            </a>`;
    }).join('\n');

    const heroImg = products[0]?.image_url ? fixImg(products[0].image_url, siteUrl) : '';
    const storyImg = products[1]?.image_url ? fixImg(products[1].image_url, siteUrl) : '';

    const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", "name": siteName, "description": SEO_DESC, "url": GITHUB_PAGES_URL, "potentialAction": { "@type": "SearchAction", "target": `${siteUrl}/product?id={search_term_string}`, "query-input": "required name=search_term_string" } };
    const itemListLd = { "@context": "https://schema.org", "@type": "ItemList", "itemListElement": products.filter(p => p.active !== 0).map((p, i) => ({ "@type": "ListItem", "position": i + 1, "item": { "@type": "Product", "name": p.name, "url": `${siteUrl}/product?id=${p.id}`, "image": p.image_url ? fixImg(p.image_url, siteUrl) : '', "offers": { "@type": "Offer", "price": p.variants?.length ? Math.min(...p.variants.map(v => v.price)) : 0, "priceCurrency": "CNY" } } })) };

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(siteName)}${SEO_TITLE_SUFFIX ? ' · ' + esc(SEO_TITLE_SUFFIX) : ''}</title>
    <meta name="description" content="${esc(SEO_DESC)}">
    <meta name="keywords" content="${esc(SEO_KEYWORDS)}">
    <meta name="author" content="${esc(SEO_AUTHOR)}">
    <meta name="robots" content="${esc(SEO_ROBOTS)}">
    <meta name="googlebot" content="${esc(SEO_ROBOTS)}">
    ${SEO_CANONICAL ? `<link rel="canonical" href="${esc(SEO_CANONICAL)}">` : ''}
    <meta property="og:type" content="${esc(SEO_OG.type || 'website')}">
    <meta property="og:url" content="${esc(SEO_OG.url || GITHUB_PAGES_URL)}">
    <meta property="og:title" content="${esc(siteName)}">
    <meta property="og:description" content="${esc(SEO_DESC)}">
    ${heroImg ? `<meta property="og:image" content="${esc(heroImg)}">` : ''}
    <meta property="og:locale" content="${esc(SEO_OG.locale || 'zh_CN')}">
    <meta property="og:site_name" content="${esc(SEO_OG.siteName || siteName)}">
    <meta name="twitter:card" content="${esc(SEO_TWITTER.card || 'summary_large_image')}">
    <meta name="twitter:title" content="${esc(siteName)}">
    <meta name="twitter:description" content="${esc(SEO_DESC)}">
    ${heroImg ? `<meta name="twitter:image" content="${esc(heroImg)}">` : ''}
    <script type="application/ld+json">${JSON.stringify({...SEO_JSON_LD, ...jsonLd})}</script>
    <script type="application/ld+json">${JSON.stringify(itemListLd)}</script>
    ${SEO_FAVICON ? `<link rel="icon" href="${esc(SEO_FAVICON)}">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
    <style>${CSS}</style>
</head>
<body>

<div class="announcement-bar">
    全场自动发货 · 即买即用 · 品质保障 — <a href="${siteUrl}" target="_blank" rel="noopener">立即选购</a>
</div>

<header class="header" id="header">
    <div class="header-inner">
        <div class="logo-area">
            <div class="logo-mark">
                <img src="${esc(fixImg(meta.siteLogo || '', siteUrl))}" alt="${esc(siteName)}">
            </div>
            <div class="nav-brand-text">
                <div class="logo-text">${esc(siteName)}</div>
                <div class="logo-sub">新商城网址：<a href="${siteUrl}" target="_blank" rel="noopener">${esc(siteUrl)}</a></div>
            </div>
        </div>
        <nav class="header-nav">
            <a href="#products">全部商品</a>
            <a href="#story">关于我们</a>
            <a href="#features">服务保障</a>
            <a href="${siteUrl}" target="_blank" rel="noopener">帮助中心</a>
        </nav>
        <div class="header-actions">
            <a href="${siteUrl}" target="_blank" rel="noopener" class="btn-shop">进入商城</a>
        </div>
    </div>
</header>

<section class="hero">
    <div class="hero-inner">
        <div class="hero-content">
            <div class="hero-eyebrow">甄选每一枚账号</div>
            <h1>让每一个数字账号<br>都值得 <em>信赖</em></h1>
            <p class="hero-desc">我们用心甄选每一枚账号，从 Gmail 到 Google Voice，从 Apple ID 到专属服务——品质可靠，安全可用，只为给你最好的选择。</p>
            <div class="hero-actions">
                <a href="${siteUrl}" target="_blank" rel="noopener" class="btn-primary">立即选购</a>
                <a href="#products" class="btn-secondary">浏览商品</a>
            </div>
        </div>
        <div class="hero-visual">
            ${heroImg ? `<img src="${esc(heroImg)}" alt="${esc(siteName)}">` : ''}
            <div class="hero-visual-overlay"></div>
        </div>
    </div>
</section>

<div class="trust-bar">
    <div class="trust-inner">
        <div class="trust-item">
            <div class="trust-icon">⚡</div>
            <div class="trust-text"><h4>即时发货</h4><p>付款即发，无需等待</p></div>
        </div>
        <div class="trust-item">
            <div class="trust-icon">🛡️</div>
            <div class="trust-text"><h4>品质保障</h4><p>质保期内免费更换</p></div>
        </div>
        <div class="trust-item">
            <div class="trust-icon">💎</div>
            <div class="trust-text"><h4>源头直供</h4><p>一手资源，无中间差价</p></div>
        </div>
        <div class="trust-item">
            <div class="trust-icon">🎯</div>
            <div class="trust-text"><h4>靓号可选</h4><p>支持自选号码</p></div>
        </div>
    </div>
</div>

<section class="stats-section">
    <div class="container">
        <div class="stats-row">
            <div class="stat-card reveal">
                <div class="stat-num">${categories.length}</div>
                <div class="stat-label">商品分类</div>
            </div>
            <div class="stat-card reveal">
                <div class="stat-num">${products.filter(p=>p.active!==0).length}</div>
                <div class="stat-label">精选商品</div>
            </div>
            <div class="stat-card reveal">
                <div class="stat-num">${products.reduce((s,p) => s + (p.variants?.length||0), 0)}</div>
                <div class="stat-label">可选规格</div>
            </div>
            <div class="stat-card reveal">
                <div class="stat-num">24h</div>
                <div class="stat-label">自动发货</div>
            </div>
        </div>
    </div>
</section>

<section class="filter-section" id="products">
    <div class="container">
        <div class="section-header">
            <div class="section-eyebrow">Curated Collection</div>
            <h2 class="section-title">全部商品</h2>
            <p class="section-desc">精心甄选的优质数字账号，满足你的每一种需求</p>
        </div>
        <div class="filter-bar">
            <div class="filter-btn active" onclick="filterCategory('all', this)">全部</div>
            ${catBtns}
        </div>
    </div>
</section>

<section class="products-section">
    <div class="container">
        <div class="products-grid">
            ${cards}
        </div>
    </div>
</section>

<section class="story-section" id="story">
    <div class="story-inner">
        <div class="story-content">
            <div class="story-eyebrow">Our Story</div>
            <h2 class="story-title">用心甄选，<br>只为值得信赖</h2>
            <p class="story-text">每一个账号背后，都是我们对品质的坚持。从源头筛选到最终交付，层层把关，确保每一枚到达你手中的账号都安全可靠。我们相信，好的数字资产，值得被认真对待。</p>
            <div class="story-stats">
                <div class="story-stat-item">
                    <div class="story-stat-num">100%</div>
                    <div class="story-stat-label">自动发货</div>
                </div>
                <div class="story-stat-item">
                    <div class="story-stat-num">7天</div>
                    <div class="story-stat-label">质保周期</div>
                </div>
                <div class="story-stat-item">
                    <div class="story-stat-num">24h</div>
                    <div class="story-stat-label">在线服务</div>
                </div>
            </div>
        </div>
        <div class="story-visual">
            ${storyImg ? `<img src="${esc(storyImg)}" alt="${esc(siteName)}">` : ''}
            <div class="story-visual-accent"></div>
        </div>
    </div>
</section>

<section class="features-section" id="features">
    <div class="container">
        <div class="section-header">
            <div class="section-eyebrow">Why Choose Us</div>
            <h2 class="section-title">我们的承诺</h2>
            <p class="section-desc">品质与服务，是我们不变的坚持</p>
        </div>
        <div class="features-grid">
            <div class="feature-card reveal">
                <div class="feature-icon"><span>⚡</span></div>
                <h3>全自动发货</h3>
                <p>付款后系统自动发货，24小时不间断运行，即买即用，无需等待。</p>
            </div>
            <div class="feature-card reveal">
                <div class="feature-icon"><span>🛡️</span></div>
                <h3>品质保障</h3>
                <p>每个账号均经过严格筛选与验证，质保期内首登问题可免费更换。</p>
            </div>
            <div class="feature-card reveal">
                <div class="feature-icon"><span>💎</span></div>
                <h3>源头直供</h3>
                <p>一手资源直接供应，去除中间环节，让你以最优价格获得优质账号。</p>
            </div>
            <div class="feature-card reveal">
                <div class="feature-icon"><span>🎯</span></div>
                <h3>靓号可选</h3>
                <p>支持自选号码模式，AAA 型、特殊组合，总有一款符合你的心意。</p>
            </div>
        </div>
    </div>
</section>

<section class="cta-section">
    <div class="container">
        <div class="cta-banner reveal">
            <h2>找到你心仪的 <em>账号</em> 了吗？</h2>
            <p>全场自动发货，品质保障，安全可靠。立即前往商城，开启你的选择。</p>
            <a href="${siteUrl}" target="_blank" rel="noopener" class="btn-white">前往商城选购</a>
        </div>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-brand">
                <div class="logo-area">
                    <div class="logo-mark">
                        <img src="${esc(fixImg(meta.siteLogo || '', siteUrl))}" alt="${esc(siteName)}">
                    </div>
                    <div class="nav-brand-text">
                        <div class="logo-text">${esc(siteName)}</div>
                        <div class="logo-sub">新商城网址：<a href="${siteUrl}" target="_blank" rel="noopener">${esc(siteUrl)}</a></div>
                    </div>
                </div>
                <p>用心甄选每一枚数字账号，品质可靠，安全可用。从 Gmail 到 Google Voice，从 Apple ID 到专属服务——只为给你最好的选择。</p>
            </div>
            <div class="footer-col">
                <h4>商品</h4>
                ${activeCats.map(c => `<a href="${siteUrl}" target="_blank" rel="noopener">${esc(shortCatName(c.name))}</a>`).join('\n                ')}
            </div>
            <div class="footer-col">
                <h4>服务</h4>
                <a href="${siteUrl}" target="_blank" rel="noopener">帮助中心</a>
                <a href="${siteUrl}" target="_blank" rel="noopener">售后保障</a>
                <a href="${siteUrl}" target="_blank" rel="noopener">关于我们</a>
            </div>
            <div class="footer-col">
                <h4>联系</h4>
                <a href="${siteUrl}" target="_blank" rel="noopener">在线客服</a>
                <a href="${siteUrl}" target="_blank" rel="noopener">商城首页</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© ${new Date().getFullYear()} ${esc(siteName)} · 所有商品均为虚拟数字商品</p>
            <div class="footer-bottom-links">
                <a href="${siteUrl}" target="_blank" rel="noopener">商城原址</a>
                <a href="${siteUrl}" target="_blank" rel="noopener">服务条款</a>
            </div>
        </div>
    </div>
</footer>

<script>${JS}</script>
</body>
</html>`;

    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
    console.log(`✅ dist/index.html (${(Buffer.byteLength(html)/1024).toFixed(1)}KB)`);
    console.log(`   商品: ${products.filter(p=>p.active!==0).length} 个`);
    console.log(`   分类: ${activeCats.length} 个`);
    console.log(`   风格: Verve Coffee 温暖手工风 · 奶油色调 · 衬线标题 · 编辑式排版`);
    console.log(`   链接: 全部指向 ${siteUrl}/product?id=xxx`);
}

main();
