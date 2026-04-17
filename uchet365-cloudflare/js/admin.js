/* ============================================================
   УЧЕТ-365 — Admin panel logic
   Protected by ADMIN_TOKEN
   ============================================================ */

'use strict';

const ADMIN_TOKEN_KEY = 'uchet365_admin_token';

function getAdminToken() {
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY) || sessionStorage.getItem(ADMIN_TOKEN_KEY) || '';
  } catch (error) {
    return '';
  }
}

function setAdminToken(token, remember = true) {
  const value = String(token || '').trim();
  try {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    if (!value) return;
    if (remember) {
      localStorage.setItem(ADMIN_TOKEN_KEY, value);
    } else {
      sessionStorage.setItem(ADMIN_TOKEN_KEY, value);
    }
  } catch (error) {
    console.error(error);
  }
}

function notify(msg, type = 'info') {
  const el = document.getElementById('adm-notify');
  el.innerHTML = `<div class="adm-alert ${type}"><i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>${msg}</div>`;
  setTimeout(() => {
    if (el) el.innerHTML = '';
  }, 4500);
}

function fmtDate(ts) {
  if (!ts) return '—';
  const d = new Date(Number(ts));
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function modeBadge(mode) {
  if (!mode) return '';
  if (mode === 'server-protected') {
    return '<span class="badge badge-mode">Защищённая серверная база</span>';
  }
  if (mode === 'server') {
    return '<span class="badge badge-mode">Серверная база</span>';
  }
  return '<span class="badge badge-mode local">Локальный режим</span>';
}

function getAuthHeaders() {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiRequest(url, options = {}) {
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...getAuthHeaders(),
    ...(options.headers || {})
  };

  const res = await fetch(url, {
    ...options,
    headers
  });

  const contentType = res.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await res.json().catch(() => ({}))
    : await res.text().catch(() => '');

  if (!res.ok) {
    const err = new Error(payload && payload.error ? payload.error : `HTTP ${res.status}`);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}

async function verifyAdminAccess(showSuccess = true) {
  const tokenInput = document.getElementById('admin-token');
  const remember = document.getElementById('remember-token');
  const manualToken = tokenInput ? tokenInput.value.trim() : '';

  if (manualToken) {
    setAdminToken(manualToken, remember ? remember.checked : true);
  }

  if (!getAdminToken()) {
    updateAdminStatus(false, 'Введите пароль администратора');
    notify('Сначала введите пароль администратора.', 'error');
    return false;
  }

  try {
    const result = await apiRequest('/api/admin/status');
    updateAdminStatus(true, result && result.message ? result.message : 'Доступ подтверждён');
    if (showSuccess) notify('Доступ к админ-панели подтверждён.', 'success');
    return true;
  } catch (error) {
    updateAdminStatus(false, error.message || 'Нет доступа');
    notify('Пароль неверный или сервер ещё не настроен.', 'error');
    return false;
  }
}

function updateAdminStatus(ok, text) {
  const badge = document.getElementById('admin-auth-status');
  if (!badge) return;
  badge.className = `badge ${ok ? 'badge-mode' : 'badge-mode local'}`;
  badge.textContent = text;
}

async function loadCodes() {
  const container = document.getElementById('table-container');
  container.innerHTML = '<div class="spinner"></div>';

  try {
    const json = await apiRequest('/api/admin/codes');
    const rows = json.data || [];

    const free = rows.filter((r) => !r.used).length;
    const used = rows.filter((r) => r.used).length;
    document.getElementById('stat-free').textContent = free;
    document.getElementById('stat-used').textContent = used;
    document.getElementById('stat-total').textContent = rows.length;

    if (rows.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><p>Кодов пока нет. Добавьте первый.</p></div>';
      return;
    }

    let html = `<table>
      <thead>
        <tr>
          <th>#</th>
          <th>Код</th>
          <th>Статус</th>
          <th>Заметка</th>
          <th>Использован</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>`;

    rows.forEach((r, i) => {
      const badgeClass = r.used ? 'badge-used' : 'badge-free';
      const badgeText = r.used ? 'Использован' : 'Свободен';
      html += `<tr>
        <td style="color:var(--c-muted);font-size:.82rem;">${i + 1}</td>
        <td><span class="code-mono">${escHtml(r.code)}</span></td>
        <td><span class="badge ${badgeClass}">${badgeText}</span></td>
        <td style="color:var(--c-muted);font-size:.88rem;">${escHtml(r.note || '—')}</td>
        <td style="font-size:.83rem;color:var(--c-muted);">${fmtDate(r.used_at)}</td>
        <td>
          ${r.used
            ? `<button class="btn-danger" onclick="restoreCode('${r.id}')"><i class="fas fa-undo"></i> Вернуть</button>`
            : `<button class="btn-danger" onclick="deleteCode('${r.id}')"><i class="fas fa-trash"></i> Удалить</button>`}
        </td>
      </tr>`;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  } catch (error) {
    console.error(error);
    if (error.status === 401) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-lock"></i><p>Требуется пароль администратора.</p></div>';
    } else {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><p>Ошибка загрузки данных.</p></div>';
    }
  }
}

async function addSingleCode() {
  const codeInput = document.getElementById('new-code');
  const noteInput = document.getElementById('new-note');
  const code = codeInput.value.trim();
  if (!code) {
    notify('Введите код.', 'error');
    return;
  }

  try {
    await apiRequest('/api/admin/codes', {
      method: 'POST',
      body: JSON.stringify({ code, note: noteInput.value.trim() || 'Добавлен вручную' })
    });
    codeInput.value = '';
    noteInput.value = '';
    notify(`Код «${escHtml(code)}» успешно добавлен.`, 'success');
    loadCodes();
  } catch (error) {
    console.error(error);
    notify(error.message || 'Ошибка при добавлении кода.', 'error');
  }
}

async function addBulkCodes() {
  const textarea = document.getElementById('bulk-codes');
  const raw = textarea.value.trim();
  if (!raw) {
    notify('Введите хотя бы один код.', 'error');
    return;
  }

  const codes = raw.split(/[\n,]+/).map((c) => c.trim()).filter(Boolean);
  if (!codes.length) {
    notify('Не удалось распознать коды.', 'error');
    return;
  }

  let added = 0;
  for (const code of codes) {
    try {
      await apiRequest('/api/admin/codes', {
        method: 'POST',
        body: JSON.stringify({ code, note: 'Массовое добавление' })
      });
      added += 1;
    } catch (error) {
      console.error(error);
    }
  }

  textarea.value = '';
  notify(`Добавлено ${added} из ${codes.length} кодов.`, added > 0 ? 'success' : 'error');
  loadCodes();
}

async function deleteCode(id) {
  if (!confirm('Удалить этот код? Действие необратимо.')) return;
  try {
    await apiRequest(`/api/admin/codes/${id}`, { method: 'DELETE' });
    notify('Код удалён.', 'success');
    loadCodes();
  } catch (error) {
    console.error(error);
    notify(error.message || 'Ошибка удаления.', 'error');
  }
}

async function restoreCode(id) {
  if (!confirm('Вернуть этот код в статус «Свободен»?')) return;
  try {
    await apiRequest(`/api/admin/codes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ used: false, used_at: null })
    });
    notify('Код восстановлен как свободный.', 'success');
    loadCodes();
  } catch (error) {
    console.error(error);
    notify(error.message || 'Ошибка восстановления.', 'error');
  }
}

async function loadSiteContentEditor() {
  const wrap = document.getElementById('content-editor');
  wrap.innerHTML = '<div class="spinner"></div>';

  try {
    const result = await window.SiteDataStore.getRecords('content', { admin: true });
    document.getElementById('content-mode-badge-wrap').innerHTML = modeBadge(result.mode);

    wrap.innerHTML = result.records.map((item) => `
      <div class="editor-card">
        <div class="editor-card-head">
          <div>
            <div class="editor-card-title">${escHtml(item.label || item.key)}</div>
            <div class="editor-card-key">${escHtml(item.key)}</div>
          </div>
        </div>
        <label class="field-label" for="content-${escHtml(item.key)}">Текст</label>
        <textarea
          id="content-${escHtml(item.key)}"
          class="admin-textarea"
          data-content-edit-key="${escHtml(item.key)}"
          data-content-edit-label="${escHtml(item.label || item.key)}"
        >${escHtml(item.value || '')}</textarea>
      </div>
    `).join('');
  } catch (error) {
    wrap.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><p>Не удалось загрузить текстовую базу.</p></div>';
    console.error(error);
  }
}

async function saveAllContent() {
  const fields = Array.from(document.querySelectorAll('[data-content-edit-key]'));
  if (!fields.length) {
    notify('Нет данных для сохранения.', 'error');
    return;
  }

  try {
    const records = fields.map((field) => ({
      key: field.dataset.contentEditKey,
      label: field.dataset.contentEditLabel,
      value: field.value
    }));
    await window.SiteDataStore.saveContentBatch(records);
    notify('Текстовая база сайта сохранена.', 'success');
    await loadSiteContentEditor();
  } catch (error) {
    console.error(error);
    notify(error.message || 'Ошибка при сохранении текстовой базы.', 'error');
  }
}

function bindImagePreviewInputs() {
  document.querySelectorAll('[data-image-url-input]').forEach((input) => {
    input.addEventListener('input', () => {
      const preview = document.getElementById(`preview-${input.dataset.imageUrlInput}`);
      const text = document.getElementById(`preview-text-${input.dataset.imageUrlInput}`);
      if (!preview) return;

      if (input.value.trim()) {
        preview.src = input.value.trim();
        preview.style.display = 'block';
        if (text) text.style.display = 'none';
      } else {
        preview.removeAttribute('src');
        preview.style.display = 'none';
        if (text) text.style.display = 'block';
      }
    });
  });
}

async function loadImagesEditor() {
  const wrap = document.getElementById('images-editor');
  wrap.innerHTML = '<div class="spinner"></div>';

  try {
    const result = await window.SiteDataStore.getRecords('images', { admin: true });
    document.getElementById('images-mode-badge-wrap').innerHTML = modeBadge(result.mode);

    wrap.innerHTML = result.records.map((item) => {
      const hasImage = Boolean(item.url);
      return `
        <div class="image-editor-card">
          <div class="image-preview">
            <img id="preview-${escHtml(item.key)}" src="${hasImage ? escHtml(item.url) : ''}" alt="${escHtml(item.alt || item.label || item.key)}" style="display:${hasImage ? 'block' : 'none'};" />
            <span id="preview-text-${escHtml(item.key)}" style="display:${hasImage ? 'none' : 'block'};">Вставьте ссылку на изображение</span>
          </div>
          <div class="image-fields">
            <div>
              <div class="editor-card-title">${escHtml(item.label || item.key)}</div>
              <div class="editor-card-key">${escHtml(item.key)}</div>
            </div>
            <div>
              <label class="field-label" for="image-url-${escHtml(item.key)}">Ссылка на изображение</label>
              <input
                id="image-url-${escHtml(item.key)}"
                class="admin-input"
                type="url"
                value="${escHtml(item.url || '')}"
                data-image-url-input="${escHtml(item.key)}"
                data-image-edit-key="${escHtml(item.key)}"
                data-image-edit-label="${escHtml(item.label || item.key)}"
                placeholder="https://..."
              />
            </div>
            <div>
              <label class="field-label" for="image-alt-${escHtml(item.key)}">Подпись alt</label>
              <input
                id="image-alt-${escHtml(item.key)}"
                class="admin-input"
                type="text"
                value="${escHtml(item.alt || '')}"
                data-image-alt-input="${escHtml(item.key)}"
                placeholder="Описание изображения"
              />
            </div>
          </div>
        </div>
      `;
    }).join('');

    bindImagePreviewInputs();
  } catch (error) {
    wrap.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><p>Не удалось загрузить базу фотографий.</p></div>';
    console.error(error);
  }
}

async function saveAllImages() {
  const urlFields = Array.from(document.querySelectorAll('[data-image-edit-key]'));
  if (!urlFields.length) {
    notify('Нет изображений для сохранения.', 'error');
    return;
  }

  try {
    const records = urlFields.map((field) => {
      const key = field.dataset.imageEditKey;
      const altField = document.querySelector(`[data-image-alt-input="${key}"]`);
      return {
        key,
        label: field.dataset.imageEditLabel,
        url: field.value,
        alt: altField ? altField.value : ''
      };
    });
    await window.SiteDataStore.saveImageBatch(records);
    notify('База фотографий сохранена.', 'success');
    await loadImagesEditor();
  } catch (error) {
    console.error(error);
    notify(error.message || 'Ошибка при сохранении базы фотографий.', 'error');
  }
}

async function initAdminPanel() {
  const savedToken = getAdminToken();
  const tokenInput = document.getElementById('admin-token');
  if (tokenInput && savedToken) {
    tokenInput.value = savedToken;
  }

  const ok = await verifyAdminAccess(false);
  if (!ok) {
    document.getElementById('table-container').innerHTML = '<div class="empty-state"><i class="fas fa-lock"></i><p>Введите пароль администратора и нажмите «Подключить».</p></div>';
    document.getElementById('content-editor').innerHTML = '<div class="empty-state"><i class="fas fa-lock"></i><p>Нет доступа к защищённой базе.</p></div>';
    document.getElementById('images-editor').innerHTML = '<div class="empty-state"><i class="fas fa-lock"></i><p>Нет доступа к защищённой базе.</p></div>';
    return;
  }

  await Promise.all([
    loadCodes(),
    loadSiteContentEditor(),
    loadImagesEditor()
  ]);
}

document.addEventListener('DOMContentLoaded', () => {
  const tokenInput = document.getElementById('admin-token');
  const connectBtn = document.getElementById('connect-admin-btn');
  const clearBtn = document.getElementById('clear-admin-btn');
  const refreshBtn = document.getElementById('refresh-all-btn');

  if (connectBtn) {
    connectBtn.addEventListener('click', async () => {
      const ok = await verifyAdminAccess(true);
      if (ok) {
        await Promise.all([
          loadCodes(),
          loadSiteContentEditor(),
          loadImagesEditor()
        ]);
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      setAdminToken('');
      if (tokenInput) tokenInput.value = '';
      updateAdminStatus(false, 'Пароль очищен');
      notify('Пароль администратора очищен в браузере.', 'info');
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      await initAdminPanel();
      notify('Панель обновлена.', 'success');
    });
  }

  if (tokenInput) {
    tokenInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const ok = await verifyAdminAccess(true);
        if (ok) {
          await Promise.all([
            loadCodes(),
            loadSiteContentEditor(),
            loadImagesEditor()
          ]);
        }
      }
    });
  }

  const newCode = document.getElementById('new-code');
  if (newCode) {
    newCode.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addSingleCode();
    });
  }

  initAdminPanel();
});

window.addSingleCode = addSingleCode;
window.addBulkCodes = addBulkCodes;
window.deleteCode = deleteCode;
window.restoreCode = restoreCode;
window.saveAllContent = saveAllContent;
window.saveAllImages = saveAllImages;
window.loadSiteContentEditor = loadSiteContentEditor;
window.loadImagesEditor = loadImagesEditor;
