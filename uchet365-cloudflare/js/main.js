/* ============================================================
   УЧЕТ-365 — Main JavaScript
   Public website logic
   ============================================================ */

'use strict';

const WHATSAPP_NUMBER = '77054950999';

let _activeCode = null;

const header = document.getElementById('site-header');
const burgerBtn = document.getElementById('burger-btn');
const mainNav = document.getElementById('main-nav');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

if (burgerBtn && mainNav) {
  burgerBtn.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    burgerBtn.classList.toggle('open', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      burgerBtn.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const animatedItems = document.querySelectorAll('[data-aos]');
if (animatedItems.length) {
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.aosDelay || '0', 10);
        setTimeout(() => entry.target.classList.add('aos-visible'), delay);
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedItems.forEach((el) => aosObserver.observe(el));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function applySiteSettings() {
  if (!window.SiteDataStore) return;

  try {
    const [contentResult, imageResult] = await Promise.all([
      window.SiteDataStore.getContentMap(),
      window.SiteDataStore.getImageMap()
    ]);

    const contentMap = contentResult.map || {};
    const imageMap = imageResult.map || {};

    document.querySelectorAll('[data-content-key]').forEach((el) => {
      const key = el.dataset.contentKey;
      const value = contentMap[key];
      if (typeof value !== 'string') return;

      if (el.dataset.contentMultiline === 'true') {
        el.innerHTML = escapeHtml(value).replace(/\n/g, '<br />');
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-image-key]').forEach((img) => {
      const key = img.dataset.imageKey;
      const image = imageMap[key];
      if (!image || !image.url) return;
      img.src = image.url;
      if (image.alt) img.alt = image.alt;
    });

    if (imageMap.hero_background && imageMap.hero_background.url) {
      document.documentElement.style.setProperty(
        '--hero-bg-image',
        `url("${imageMap.hero_background.url.replace(/"/g, '\\"')}")`
      );
    }
  } catch (error) {
    console.error('applySiteSettings:', error);
  }
}

async function fetchCodesLeft() {
  try {
    const res = await fetch('/api/codes-left');
    if (!res.ok) throw new Error('Network error');
    const json = await res.json();
    return Number(json.count || 0);
  } catch (error) {
    console.error('fetchCodesLeft:', error);
    return 0;
  }
}

async function claimConsultationCode() {
  const res = await fetch('/api/claim-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(json.error || 'Не удалось получить код');
    err.status = res.status;
    throw err;
  }
  return json;
}

async function updateCodesCounter() {
  const countEl = document.getElementById('codes-left-count');
  if (!countEl) return;

  const n = await fetchCodesLeft();
  countEl.textContent = n;
  countEl.style.color = n > 5 ? '#6ef0a0' : n > 0 ? '#ffd166' : '#ff6b6b';

  if (n === 0) {
    showNoCodes();
  }
}

function showNoCodes() {
  const wrapper = document.getElementById('consult-btn-wrapper');
  const noMsg = document.getElementById('no-codes-msg');
  const revealEl = document.getElementById('code-reveal-box');

  if (wrapper) wrapper.style.display = 'none';
  if (revealEl) revealEl.style.display = 'none';
  if (noMsg) noMsg.style.display = 'flex';
}

function showCodeReveal(code) {
  const wrapper = document.getElementById('consult-btn-wrapper');
  const noMsg = document.getElementById('no-codes-msg');
  const revealEl = document.getElementById('code-reveal-box');
  const codeDisp = document.getElementById('code-display');

  if (wrapper) wrapper.style.display = 'none';
  if (noMsg) noMsg.style.display = 'none';
  if (codeDisp) codeDisp.textContent = code;
  if (revealEl) {
    revealEl.style.display = 'block';
    revealEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

window.resetCodeBox = function () {
  const wrapper = document.getElementById('consult-btn-wrapper');
  const revealEl = document.getElementById('code-reveal-box');

  _activeCode = null;

  if (wrapper) wrapper.style.display = 'block';
  if (revealEl) revealEl.style.display = 'none';
};

window.goToWhatsApp = function () {
  if (!_activeCode) return;
  const msg = `Здравствуйте, хочу получить бесплатную консультацию\nкод: "${_activeCode}"`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener');
};

window.getConsultation = async function () {
  const btn = document.getElementById('consult-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Загрузка...';
  }

  try {
    const result = await claimConsultationCode();

    if (!result || !result.code) {
      showNoCodes();
      return;
    }

    _activeCode = result.code;
    await updateCodesCounter();
    showCodeReveal(_activeCode);
  } catch (error) {
    console.error('getConsultation:', error);
    if (error.status === 404) {
      showNoCodes();
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fab fa-whatsapp"></i> Получить бесплатную консультацию';
    }
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  await applySiteSettings();
  await updateCodesCounter();
});
