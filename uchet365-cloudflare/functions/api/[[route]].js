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

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

function normalizeRows(kind, rows) {
  const defaults = kind === 'content' ? DEFAULT_CONTENT : DEFAULT_IMAGES;
  const byKey = new Map((rows || []).map((item) => [item.key, item]));

  const merged = defaults.map((item) => {
    const row = byKey.get(item.key) || {};
    return kind === 'content'
      ? {
          id: row.id || null,
          key: item.key,
          label: row.label || item.label,
          value: typeof row.value === 'string' ? row.value : item.value
        }
      : {
          id: row.id || null,
          key: item.key,
          label: row.label || item.label,
          url: typeof row.url === 'string' && row.url ? row.url : item.url,
          alt: typeof row.alt === 'string' && row.alt ? row.alt : item.alt
        };
  });

  for (const row of rows || []) {
    if (!defaults.some((item) => item.key === row.key)) {
      merged.push(row);
    }
  }

  return merged;
}

async function ensureContentSeed(db) {
  const countRow = await db.prepare('SELECT COUNT(*) AS count FROM site_content').first();
  if (Number(countRow?.count || 0) > 0) return;
  for (const item of DEFAULT_CONTENT) {
    await db.prepare('INSERT INTO site_content (key, label, value, created_at, updated_at) VALUES (?, ?, ?, ?, ?)')
      .bind(item.key, item.label, item.value, Date.now(), Date.now())
      .run();
  }
}

async function ensureImagesSeed(db) {
  const countRow = await db.prepare('SELECT COUNT(*) AS count FROM site_images').first();
  if (Number(countRow?.count || 0) > 0) return;
  for (const item of DEFAULT_IMAGES) {
    await db.prepare('INSERT INTO site_images (key, label, url, alt, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(item.key, item.label, item.url, item.alt, Date.now(), Date.now())
      .run();
  }
}

async function getContent(db) {
  await ensureContentSeed(db);
  const rows = await db.prepare('SELECT id, key, label, value FROM site_content ORDER BY id ASC').all();
  return normalizeRows('content', rows.results || []);
}

async function getImages(db) {
  await ensureImagesSeed(db);
  const rows = await db.prepare('SELECT id, key, label, url, alt FROM site_images ORDER BY id ASC').all();
  return normalizeRows('images', rows.results || []);
}

function requireAdmin(request, env) {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) {
    throw new Error('UNAUTHORIZED');
  }
}

async function readJson(request) {
  try {
    return await request.json();
  } catch (error) {
    return {};
  }
}

async function upsertContent(db, records) {
  const now = Date.now();
  for (const item of records) {
    if (!item || !item.key) continue;
    await db.prepare(`
      INSERT INTO site_content (key, label, value, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET
        label = excluded.label,
        value = excluded.value,
        updated_at = excluded.updated_at
    `).bind(
      String(item.key),
      String(item.label || item.key),
      String(item.value ?? ''),
      now,
      now
    ).run();
  }
  return getContent(db);
}

async function upsertImages(db, records) {
  const now = Date.now();
  for (const item of records) {
    if (!item || !item.key) continue;
    await db.prepare(`
      INSERT INTO site_images (key, label, url, alt, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET
        label = excluded.label,
        url = excluded.url,
        alt = excluded.alt,
        updated_at = excluded.updated_at
    `).bind(
      String(item.key),
      String(item.label || item.key),
      String(item.url ?? ''),
      String(item.alt ?? ''),
      now,
      now
    ).run();
  }
  return getImages(db);
}

async function listCodes(db) {
  const rows = await db.prepare(`
    SELECT id, code, note, used, used_at, created_at
    FROM consultation_codes
    ORDER BY created_at ASC, id ASC
  `).all();
  return (rows.results || []).map((row) => ({
    ...row,
    used: Boolean(row.used)
  }));
}

async function addCode(db, code, note) {
  const cleanCode = String(code || '').trim();
  if (!cleanCode) {
    return json({ error: 'Код пустой' }, 400);
  }

  try {
    await db.prepare(`
      INSERT INTO consultation_codes (code, note, used, used_at, created_at)
      VALUES (?, ?, 0, NULL, ?)
    `).bind(cleanCode, String(note || ''), Date.now()).run();
    return json({ ok: true });
  } catch (error) {
    return json({ error: 'Такой код уже существует' }, 409);
  }
}

async function patchCode(db, id, payload) {
  await db.prepare(`
    UPDATE consultation_codes
    SET used = ?, used_at = ?, note = COALESCE(?, note)
    WHERE id = ?
  `).bind(
    payload.used ? 1 : 0,
    payload.used ? Number(payload.used_at || Date.now()) : null,
    payload.note ?? null,
    Number(id)
  ).run();
  return json({ ok: true });
}

async function deleteCode(db, id) {
  await db.prepare('DELETE FROM consultation_codes WHERE id = ?').bind(Number(id)).run();
  return json({ ok: true });
}

async function getCodesLeft(db) {
  const row = await db.prepare('SELECT COUNT(*) AS count FROM consultation_codes WHERE used = 0').first();
  return Number(row?.count || 0);
}

async function claimCode(db) {
  for (let i = 0; i < 5; i += 1) {
    const row = await db.prepare(`
      SELECT id, code
      FROM consultation_codes
      WHERE used = 0
      ORDER BY created_at ASC, id ASC
      LIMIT 1
    `).first();

    if (!row) {
      return json({ error: 'Свободных кодов больше нет' }, 404);
    }

    const now = Date.now();
    const result = await db.prepare(`
      UPDATE consultation_codes
      SET used = 1, used_at = ?
      WHERE id = ? AND used = 0
    `).bind(now, row.id).run();

    if (result.meta && result.meta.changes === 1) {
      return json({ code: row.code, used_at: now });
    }
  }

  return json({ error: 'Не удалось забронировать код. Попробуйте ещё раз.' }, 409);
}

export async function onRequest(context) {
  const { request, env } = context;

  if (!env.DB) {
    return json({ error: 'База данных не подключена' }, 500);
  }

  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\/?/, '');
  const parts = path.split('/').filter(Boolean);
  const method = request.method.toUpperCase();

  try {
    if (method === 'GET' && parts[0] === 'content' && parts.length === 1) {
      return json({ data: await getContent(env.DB) });
    }

    if (method === 'GET' && parts[0] === 'images' && parts.length === 1) {
      return json({ data: await getImages(env.DB) });
    }

    if (method === 'GET' && parts[0] === 'codes-left' && parts.length === 1) {
      return json({ count: await getCodesLeft(env.DB) });
    }

    if (method === 'POST' && parts[0] === 'claim-code' && parts.length === 1) {
      return await claimCode(env.DB);
    }

    if (parts[0] === 'admin') {
      requireAdmin(request, env);

      if (method === 'GET' && parts[1] === 'status') {
        return json({ ok: true, message: 'Пароль подтверждён' });
      }

      if (method === 'GET' && parts[1] === 'content') {
        return json({ data: await getContent(env.DB) });
      }

      if (method === 'POST' && parts[1] === 'content') {
        const body = await readJson(request);
        return json({ data: await upsertContent(env.DB, body.records || []) });
      }

      if (method === 'GET' && parts[1] === 'images') {
        return json({ data: await getImages(env.DB) });
      }

      if (method === 'POST' && parts[1] === 'images') {
        const body = await readJson(request);
        return json({ data: await upsertImages(env.DB, body.records || []) });
      }

      if (method === 'GET' && parts[1] === 'codes' && parts.length === 2) {
        return json({ data: await listCodes(env.DB) });
      }

      if (method === 'POST' && parts[1] === 'codes' && parts.length === 2) {
        const body = await readJson(request);
        return await addCode(env.DB, body.code, body.note);
      }

      if (method === 'PATCH' && parts[1] === 'codes' && parts[2]) {
        const body = await readJson(request);
        return await patchCode(env.DB, parts[2], body);
      }

      if (method === 'DELETE' && parts[1] === 'codes' && parts[2]) {
        return await deleteCode(env.DB, parts[2]);
      }
    }

    return json({ error: 'Маршрут не найден' }, 404);
  } catch (error) {
    if (error.message === 'UNAUTHORIZED') {
      return json({ error: 'Нет доступа' }, 401);
    }
    return json({ error: error.message || 'Внутренняя ошибка сервера' }, 500);
  }
}
