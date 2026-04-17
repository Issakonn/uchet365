/* ============================================================
   УЧЕТ-365 — Shared site content & image storage layer
   Public API for website, protected API for admin panel
   ============================================================ */

(function () {
  'use strict';

  const LS_KEYS = {
    content: 'uchet365_site_content_v2',
    images: 'uchet365_site_images_v2'
  };

  const API = {
    content: '/api/content',
    images: '/api/images',
    adminContent: '/api/admin/content',
    adminImages: '/api/admin/images'
  };

  const DEFAULT_CONTENT = [
    { key: 'hero_badge', label: 'Плашка над главным экраном', value: 'Профессионально. Надёжно. В срок.' },
    { key: 'hero_title_main', label: 'Главный экран — первая строка заголовка', value: 'Ваш бухгалтер —' },
    { key: 'hero_title_accent', label: 'Главный экран — выделенная строка заголовка', value: 'всегда рядом' },
    { key: 'hero_subtitle', label: 'Главный экран — подзаголовок', value: 'Это сильная команда профессионалов, которая будет вас сопровождать\nна каждом этапе вашего бизнеса!' },
    { key: 'about_eyebrow', label: 'Блок «О компании» — верхняя подпись', value: 'О компании' },
    { key: 'about_title', label: 'Блок «О компании» — заголовок', value: 'УЧЕТ-365' },
    { key: 'about_lead', label: 'Блок «О компании» — главный текст', value: 'Мы — сильная команда профессионалов, которая будет сопровождать вас на каждом этапе вашего бизнеса!' },
    { key: 'about_body', label: 'Блок «О компании» — основной абзац', value: 'Наша цель — сделать бухгалтерию прозрачной и понятной для вас, пока вы сосредоточены на развитии своего дела. Работаем честно, чётко в сроки и строго по законодательству.' },
    { key: 'about_exp_num', label: 'Плашка на фото — число', value: '10+' },
    { key: 'about_exp_label', label: 'Плашка на фото — подпись', value: 'лет опыта' },
    { key: 'about_stat_clients_num', label: 'Статистика — клиенты (число)', value: '200+' },
    { key: 'about_stat_clients_desc', label: 'Статистика — клиенты (подпись)', value: 'довольных клиентов' },
    { key: 'about_stat_reports_num', label: 'Статистика — отчёты (число)', value: '100%' },
    { key: 'about_stat_reports_desc', label: 'Статистика — отчёты (подпись)', value: 'сдача отчётов в срок' },
    { key: 'about_stat_services_num', label: 'Статистика — услуги (число)', value: '9' },
    { key: 'about_stat_services_desc', label: 'Статистика — услуги (подпись)', value: 'видов услуг' },
    { key: 'cta_title', label: 'Блок консультации — заголовок', value: 'Первая консультация — бесплатно!' },
    { key: 'cta_subtitle', label: 'Блок консультации — поясняющий текст', value: 'Нажмите кнопку — получите персональный код и свяжитесь с нами в WhatsApp прямо сейчас.' },
    { key: 'contact_schedule_label', label: 'Контакты — подпись режима работы', value: 'Режим работы' },
    { key: 'contact_schedule_value', label: 'Контакты — режим работы', value: 'Пн–Пт: 9:00 – 18:00' },
    { key: 'contact_tagline', label: 'Контакты — текст в правом блоке', value: 'Доверьте бухгалтерию профессионалам,\nа сами занимайтесь бизнесом.' },
    { key: 'map_title', label: 'Блок карты — заголовок', value: 'Мы на карте 2ГИС' },
    { key: 'map_note', label: 'Блок карты — пояснение', value: 'Если мини-карта не откроется на вашем хостинге, используйте кнопку «Открыть в 2ГИС».' }
  ];

  const DEFAULT_IMAGES = [
    {
      key: 'logo_main',
      label: 'Логотип сайта',
      url: 'https://salamalekum.sirv.com/%D0%A1%D1%87%D0%B5%D1%82%20%D0%BA%D1%83%D0%B11%20%D0%BF%D0%BD%D0%B3.png',
      alt: 'Учет-365 логотип'
    },
    {
      key: 'hero_background',
      label: 'Картинка на главном экране',
      url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Фон главного экрана'
    },
    {
      key: 'about_image',
      label: 'Картинка в блоке «О компании»',
      url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Команда профессиональных бухгалтеров'
    },
    {
      key: 'photo_strip_1',
      label: 'Фото-полоса — изображение 1',
      url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Офис'
    },
    {
      key: 'photo_strip_2',
      label: 'Фото-полоса — изображение 2',
      url: 'https://images.pexels.com/photos/5905492/pexels-photo-5905492.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Бухгалтерия'
    },
    {
      key: 'photo_strip_3',
      label: 'Фото-полоса — изображение 3',
      url: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Команда'
    },
    {
      key: 'photo_strip_4',
      label: 'Фото-полоса — изображение 4',
      url: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Документы'
    },
    {
      key: 'photo_strip_5',
      label: 'Фото-полоса — изображение 5',
      url: 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Расчёты'
    }
  ];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function getDefaults(kind) {
    return clone(kind === 'content' ? DEFAULT_CONTENT : DEFAULT_IMAGES);
  }

  function getLocal(kind) {
    try {
      const raw = localStorage.getItem(LS_KEYS[kind]);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.warn('Local read error:', error);
      return [];
    }
  }

  function setLocal(kind, records) {
    try {
      localStorage.setItem(LS_KEYS[kind], JSON.stringify(records));
    } catch (error) {
      console.warn('Local write error:', error);
    }
    return records;
  }

  function getAdminToken() {
    try {
      return localStorage.getItem('uchet365_admin_token') || sessionStorage.getItem('uchet365_admin_token') || '';
    } catch (error) {
      return '';
    }
  }

  async function request(url, options = {}) {
    const headers = {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {})
    };

    if (options.auth) {
      const token = getAdminToken();
      if (!token) {
        const err = new Error('ADMIN_TOKEN_MISSING');
        err.code = 'ADMIN_TOKEN_MISSING';
        throw err;
      }
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json')
      ? await response.json().catch(() => ({}))
      : await response.text().catch(() => '');

    if (!response.ok) {
      const message = typeof payload === 'object' && payload && payload.error
        ? payload.error
        : `HTTP ${response.status}`;
      const err = new Error(message);
      err.status = response.status;
      err.payload = payload;
      throw err;
    }

    return payload;
  }

  function mergeRecords(kind, records) {
    const defaults = getDefaults(kind);
    const byKey = new Map((records || []).map((item) => [item.key, item]));

    const merged = defaults.map((entry) => {
      const existing = byKey.get(entry.key) || {};
      return kind === 'content'
        ? {
            id: existing.id || null,
            key: entry.key,
            label: existing.label || entry.label,
            value: typeof existing.value === 'string' ? existing.value : entry.value
          }
        : {
            id: existing.id || null,
            key: entry.key,
            label: existing.label || entry.label,
            url: typeof existing.url === 'string' && existing.url ? existing.url : entry.url,
            alt: typeof existing.alt === 'string' && existing.alt ? existing.alt : entry.alt
          };
    });

    (records || []).forEach((entry) => {
      if (!defaults.some((item) => item.key === entry.key)) {
        merged.push(entry);
      }
    });

    return merged;
  }

  async function fetchPublicRecords(kind) {
    const url = kind === 'content' ? API.content : API.images;
    const json = await request(url);
    return Array.isArray(json && json.data) ? json.data : [];
  }

  async function fetchAdminRecords(kind) {
    const url = kind === 'content' ? API.adminContent : API.adminImages;
    const json = await request(url, { auth: true });
    return Array.isArray(json && json.data) ? json.data : [];
  }

  async function getRecords(kind, options = {}) {
    const admin = Boolean(options.admin);

    try {
      const records = admin ? await fetchAdminRecords(kind) : await fetchPublicRecords(kind);
      const merged = mergeRecords(kind, records);
      setLocal(kind, merged);
      return { mode: admin ? 'server-protected' : 'server', records: merged };
    } catch (error) {
      const localRecords = getLocal(kind);
      const merged = mergeRecords(kind, localRecords.length ? localRecords : getDefaults(kind));
      setLocal(kind, merged);
      return { mode: 'local', records: merged, error: error.message, status: error.status || 0 };
    }
  }

  async function saveContentBatch(records) {
    const payload = {
      records: (records || []).map((item) => ({
        key: item.key,
        label: item.label || item.key,
        value: item.value == null ? '' : String(item.value)
      }))
    };

    const json = await request(API.adminContent, {
      method: 'POST',
      auth: true,
      body: JSON.stringify(payload)
    });

    const merged = mergeRecords('content', Array.isArray(json && json.data) ? json.data : payload.records);
    setLocal('content', merged);
    return { mode: 'server-protected', records: merged };
  }

  async function saveImageBatch(records) {
    const payload = {
      records: (records || []).map((item) => ({
        key: item.key,
        label: item.label || item.key,
        url: item.url == null ? '' : String(item.url).trim(),
        alt: item.alt == null ? '' : String(item.alt).trim()
      }))
    };

    const json = await request(API.adminImages, {
      method: 'POST',
      auth: true,
      body: JSON.stringify(payload)
    });

    const merged = mergeRecords('images', Array.isArray(json && json.data) ? json.data : payload.records);
    setLocal('images', merged);
    return { mode: 'server-protected', records: merged };
  }

  function recordsToContentMap(records) {
    return (records || []).reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
  }

  function recordsToImageMap(records) {
    return (records || []).reduce((acc, item) => {
      acc[item.key] = item;
      return acc;
    }, {});
  }

  window.SiteDataStore = {
    DEFAULT_CONTENT,
    DEFAULT_IMAGES,
    getRecords,
    getContentMap: async function (options = {}) {
      const result = await getRecords('content', options);
      return {
        mode: result.mode,
        records: result.records,
        map: recordsToContentMap(result.records),
        error: result.error,
        status: result.status
      };
    },
    getImageMap: async function (options = {}) {
      const result = await getRecords('images', options);
      return {
        mode: result.mode,
        records: result.records,
        map: recordsToImageMap(result.records),
        error: result.error,
        status: result.status
      };
    },
    saveContentBatch,
    saveImageBatch,
    getAdminToken
  };
})();
