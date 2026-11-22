// Uji di browser: muat lewat `fetch('/uji.js')`? Tidak; salin ke hasil/uji.js lalu: eval(await (await fetch('/uji.js')).text()); await runUji()
async function runUji() {
  const out = []; const ok = (n, c, extra) => out.push((c ? 'LULUS ' : 'GAGAL ') + n + (c ? '' : ' :: ' + (extra ?? '')));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const hs = () => location.hash;
  const on = () => document.querySelectorAll('[data-screen].on').length;
  if (typeof App === 'undefined') { ok('App ada', false); return out.join('\n'); }
  const C = CONTENT;
  // Task 2
  App.setLang('id');
  App.go('#xyz'); ok('hash ngawur -> #intro', hs() === '#intro', hs());
  App.go('#seksi/tidak-ada'); ok('seksi ngawur -> #intro', hs() === '#intro', hs());
  App.go('#isi'); App.go('#profil'); history.back(); await wait(300);
  ok('Back -> #isi', hs() === '#isi', hs());
  ok('tepat satu layar aktif', on() === 1, on());
  App.go('#seksi/magang'); await wait(200); App.setLang('en'); await wait(100);
  ok('ganti bahasa tetap di seksi', hs() === '#seksi/magang', hs());
  ok('judul seksi EN', document.querySelector('[data-screen=seksi] h1').textContent.trim() === C.en.sections[1].title, document.querySelector('[data-screen=seksi] h1').textContent);
  App.setLang('id');
  // Task 3
  App.go('#intro'); await wait(4500); ok('intro tidak lanjut sendiri', hs() === '#intro', hs());
  document.querySelector('[data-screen=intro]').click(); await wait(300);
  ok('klik intro -> #profil', hs() === '#profil', hs());
  App.go('#intro'); ok('tahun berjalan di intro', document.querySelector('[data-screen=intro]').textContent.includes(String(new Date().getFullYear())));
  App.go('#profil'); await wait(300);
  const pr = document.querySelector('[data-screen=profil]');
  ok('profil: foto, nama, tautan kontak', !!pr.querySelector('img[src*="foto-profil"]') && pr.textContent.includes('Hafizah') && !!pr.querySelector('a[href^="mailto:"]') && !!pr.querySelector('a[href*="linkedin.com"]'));
  ok('profil: tidak menyebut Syahri', !/syahri/i.test(document.body.textContent));
  // Task 4
  App.go('#isi'); await wait(300);
  const cards = [...document.querySelectorAll('[data-card]')].map(c => c.dataset.card);
  ok('6 kartu berurutan', cards.join() === 'pendidikan,magang,organisasi,sertifikasi,teknis,personal', cards.join());
  document.querySelector('[data-card=magang]').click(); await wait(1500);
  ok('klik kartu -> seksi', hs() === '#seksi/magang', hs());
  App.go('#isi'); await wait(500); const h0 = history.length;
  const k = document.querySelector('[data-card=pendidikan]'); k.click(); await wait(50); k.click(); await wait(1500);
  ok('klik ganda -> satu seksi', hs() === '#seksi/pendidikan' && history.length - h0 <= 1, hs() + ' ' + (history.length - h0));
  // Task 5
  for (const s of C.id.sections) {
    App.go('#seksi/' + s.id); await wait(400);
    const b = document.querySelector('[data-screen=seksi] .sec-body');
    ok('seksi ' + s.id + ' terisi', b && b.children.length >= 1, b && b.children.length);
  }
  App.go('#seksi/sertifikasi'); await wait(500);
  const cc = document.querySelector('[data-cert]'); ok('kartu sertifikat ada', !!cc);
  cc.click(); await wait(300); const m = document.getElementById('modal');
  ok('modal terbuka + placeholder tanpa gambar rusak', m.classList.contains('open') && !m.querySelector('img[src*="cert-"]') && m.textContent.includes(C.id.tx.noPhoto.slice(0, 20)));
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); await wait(300);
  ok('Esc menutup modal', !m.classList.contains('open'));
  for (const id of ['pendidikan', 'magang', 'organisasi']) { App.go('#seksi/' + id); await wait(500);
    const sk = document.querySelector('[data-screen=seksi] .scroll'); for (let y = 0; y <= sk.scrollHeight; y += 400) { sk.scrollTop = y; await wait(120); } await wait(400);  // gambar lazy baru dimuat saat terlihat
    const bad = [...document.querySelectorAll('[data-screen=seksi] img')].filter(i => !i.naturalWidth); ok('gambar ' + id + ' utuh', bad.length === 0, bad.map(i => i.src).join()); }
  App.go('#seksi/pendidikan'); await wait(300);
  ok('seksi pertama: tanpa Sebelumnya', !document.querySelector('[data-prev]') || document.querySelector('[data-prev]').hidden);
  App.go('#seksi/personal'); await wait(300);
  ok('seksi terakhir: tanpa Berikutnya', !document.querySelector('[data-next]') || document.querySelector('[data-next]').hidden);
  // Task 6: lebar layar lewat iframe; cek batas elemen (scrollWidth tak bisa gagal karena overflow-x:hidden)
  for (const w of [320, 360, 768, 1280]) for (const h of ['#profil', '#isi', '#seksi/magang', '#seksi/sertifikasi']) {
    const f = document.createElement('iframe'); f.style.cssText = 'position:fixed;left:-9999px;top:0;height:800px;width:' + w + 'px;border:0'; f.src = './index.html' + h; document.body.appendChild(f);
    await wait(1800); const d = f.contentDocument;
    const off = [...d.querySelectorAll('[data-screen].on *')].filter(e => !e.closest('.blob') && !e.classList.contains('blob') && e.getBoundingClientRect().width > 0 && (e.getBoundingClientRect().right > w + 1 || e.getBoundingClientRect().left < -1));
    ok('elemen di dalam layar ' + w + ' ' + h, off.length === 0, off.slice(0, 3).map(e => e.tagName + '.' + e.className).join()); f.remove(); }
  return out.join('\n');
}

// Tes perbaikan setelah review akhir
async function runUjiPerbaikan() {
  const out = []; const ok = (n, c, extra) => out.push((c ? 'LULUS ' : 'GAGAL ') + n + (c ? '' : ' :: ' + (extra ?? '')));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  App.setLang('id'); App.go('#profil'); await wait(300);
  // 2. modal: fokus, inert, kembali fokus
  App.go('#seksi/sertifikasi'); await wait(500);
  const c0 = document.querySelector('[data-cert]'); c0.focus(); c0.click(); await wait(300);
  const m = document.getElementById('modal');
  ok('fokus pindah ke dalam modal', m.contains(document.activeElement), document.activeElement && document.activeElement.tagName);
  ok('latar inert saat modal terbuka', document.getElementById('stage').inert === true);
  ok('modal punya aria-labelledby', !!m.getAttribute('aria-labelledby') && !!document.getElementById(m.getAttribute('aria-labelledby')));
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); await wait(300);
  ok('fokus kembali ke kartu sertifikat', document.activeElement === c0, document.activeElement && document.activeElement.outerHTML.slice(0, 40));
  ok('latar tidak inert setelah ditutup', document.getElementById('stage').inert === false);
  // 3. fokus pindah ke layar baru
  App.go('#isi'); await wait(400);
  document.querySelector('[data-card=teknis]').focus(); document.querySelector('[data-card=teknis]').click(); await wait(1500);
  const sc = document.querySelector('[data-screen].on');
  ok('fokus berada di layar baru', sc.contains(document.activeElement), document.activeElement && document.activeElement.tagName);
  App.go('#isi'); await wait(700);
  const cs = getComputedStyle(document.getElementById('barMenu'));
  ok('tombol menu tak bisa difokus saat tersembunyi di #isi', cs.visibility === 'hidden', cs.visibility);
  // 4. performa
  const css = await (await fetch('style.css')).text();
  const morph = /@keyframes morph\{[\s\S]*?\}\s*\}/.exec(css);
  ok('animasi morph hanya transform (tanpa border-radius)', !!morph && !/border-radius/.test(morph[0]), morph && morph[0].slice(0, 80));
  ok('layar tidak menganimasikan filter', !/\.screen\{[^}]*transition:[^;}]*filter/.test(css));
  const rin = /@keyframes rIn\{from\{[^}]*\}to\{[^}]*\}\}/.exec(css); ok('rIn tanpa blur', !!rin && !/blur/.test(rin[0]), rin && rin[0]);
  ok('HP: tanpa backdrop-filter', /@media \(max-width:820px\)\{[\s\S]*backdrop-filter:none/.test(css));
  // 8. kontak terlihat
  App.go('#profil'); await wait(300);
  ok('domisili terlihat di profil (tanpa tooltip)', document.querySelector('[data-screen=profil]').textContent.includes('Jakarta'));
  return out.join('\n');
}

// Tes navigasi scroll (permintaan: perpindahan lewat scroll, layar naik dari bawah)
async function runUjiScroll() {
  const out = []; const ok = (n, c, extra) => out.push((c ? 'LULUS ' : 'GAGAL ') + n + (c ? '' : ' :: ' + (extra ?? '')));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const hs = () => location.hash, H = innerHeight;
  const scr = n => document.querySelector('[data-screen=' + n + ']'), sc = n => scr(n).querySelector('.scroll');
  const top = n => Math.round(scr(n).getBoundingClientRect().top);
  const wheel = (d, dy) => document.dispatchEvent(new WheelEvent('wheel', { deltaY: d * (dy || 120), bubbles: true, cancelable: true }));
  App.setLang('id'); App.go('#intro'); await wait(1500);
  wheel(-1); ok('intro: scroll ke atas tidak berpindah', hs() === '#intro', hs());
  wheel(1, 8); ok('gulir sangat kecil diabaikan', hs() === '#intro', hs());
  wheel(1); ok('intro: scroll ke bawah -> #profil', hs() === '#profil', hs());
  wheel(1); ok('jeda: gestur kedua langsung diabaikan', hs() === '#profil', hs());
  await wait(1300);
  ok('profil di atas, isi menunggu di bawah layar', top('profil') === 0 && top('isi') >= H - 1, top('profil') + ' ' + top('isi'));
  sc('profil').scrollTop = 99999; await wait(600);
  wheel(1); ok('profil: scroll bawah di ujung -> #isi', hs() === '#isi', hs());
  await wait(1300);
  ok('isi naik dari bawah, profil bergeser ke atas', top('isi') === 0 && top('profil') < 0, top('isi') + ' ' + top('profil'));
  wheel(-1); ok('isi: scroll atas -> #profil', hs() === '#profil', hs());
  await wait(1300);
  ok('mundur: isi turun lagi ke bawah', top('profil') === 0 && top('isi') >= H - 1, top('profil') + ' ' + top('isi'));
  App.go('#isi'); await wait(1300); wheel(1); ok('isi: scroll bawah -> seksi pertama (pendidikan)', hs() === '#seksi/pendidikan', hs()); await wait(1300);
  App.go('#seksi/magang'); await wait(1300);
  sc('seksi').scrollTop = 0; await wait(600);
  wheel(1); ok('seksi: belum di ujung bawah -> tidak pindah', hs() === '#seksi/magang', hs());
  sc('seksi').scrollTop = 99999; await wait(600);
  wheel(1); ok('seksi: ujung bawah -> seksi berikutnya', hs() === '#seksi/organisasi', hs());
  await wait(1300);
  ok('seksi berikutnya naik dari bawah (in-up)', document.querySelector('.sec').classList.contains('in-up'));
  sc('seksi').scrollTop = 0; await wait(600);
  wheel(-1); ok('seksi: ujung atas -> seksi sebelumnya', hs() === '#seksi/magang', hs());
  await wait(1300);
  ok('seksi sebelumnya turun dari atas (in-down)', document.querySelector('.sec').classList.contains('in-down'));
  App.go('#seksi/pendidikan'); await wait(1300); sc('seksi').scrollTop = 0; await wait(600);
  wheel(-1); ok('seksi pertama: scroll atas -> #isi', hs() === '#isi', hs());
  await wait(1300);
  App.go('#seksi/personal'); await wait(1300); sc('seksi').scrollTop = 99999; await wait(600);
  wheel(1); ok('seksi terakhir: scroll bawah tidak pindah', hs() === '#seksi/personal', hs());
  await wait(1000);
  App.go('#seksi/sertifikasi'); await wait(1300);
  document.querySelector('[data-cert]').click(); await wait(300); sc('seksi').scrollTop = 99999; await wait(600);
  wheel(1); ok('modal terbuka: scroll tidak memindah seksi', hs() === '#seksi/sertifikasi', hs());
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); await wait(300);
  App.go('#intro'); await wait(1500);
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
  ok('ArrowDown di intro -> #profil', hs() === '#profil', hs());
  await wait(1300);
  ok('ada 3 titik navigasi', document.querySelectorAll('#dots button').length === 3);
  const cs = getComputedStyle(scr('profil'));
  ok('transisi layar memakai transform (naik dari bawah)', /transform/.test(cs.transitionProperty), cs.transitionProperty);
  return out.join('\n');
}

// Tes logo software
async function runUjiLogo() {
  const out = []; const ok = (n, c, extra) => out.push((c ? 'LULUS ' : 'GAGAL ') + n + (c ? '' : ' :: ' + (extra ?? '')));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  App.setLang('id'); App.go('#profil'); await wait(1300);
  const pr = document.querySelector('[data-screen=profil]');
  ok('profil: 3 logo di chip software (Word, Excel, Canva)', pr.querySelectorAll('.chip svg.lg').length === 3, pr.querySelectorAll('.chip svg.lg').length);
  ok('profil: teks Ms. Office dan Canva tetap ada', /Ms\. Office/.test(pr.textContent) && /Canva/.test(pr.textContent));
  App.go('#seksi/personal'); await wait(1300);
  const se = document.querySelector('[data-screen=seksi]');
  ok('personal: 3 logo di chip software', se.querySelectorAll('.chip svg.lg').length === 3, se.querySelectorAll('.chip svg.lg').length);
  const ids = [...document.querySelectorAll('svg [id]')].map(e => e.id);
  ok('id gradasi logo unik', new Set(ids).size === ids.length, ids.join());
  const bad = [...document.querySelectorAll('.chip svg.lg')].filter(s => { const r = s.getBoundingClientRect(); return r.width < 10 || r.height < 10; });
  ok('logo berukuran terlihat', bad.length === 0, bad.length);
  App.setLang('en'); await wait(200);
  ok('EN: logo tetap ada', document.querySelector('[data-screen=seksi]').querySelectorAll('.chip svg.lg').length === 3);
  App.setLang('id');
  return out.join('\n');
}

// Tes lensa foto profil (hover mengungkap foto kedua sebagian)
async function runUjiLensa() {
  const out = []; const ok = (n, c, extra) => out.push((c ? 'LULUS ' : 'GAGAL ') + n + (c ? '' : ' :: ' + (extra ?? '')));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  App.setLang('id'); App.go('#profil'); await wait(1300);
  const w = document.querySelector('[data-screen=profil] .ph-wrap');
  ok('ada pembungkus foto dengan 2 gambar', !!w && w.querySelectorAll('img').length === 2, w && w.querySelectorAll('img').length);
  if (!w) return out.join('\n');
  const [base, alt] = w.querySelectorAll('img');
  ok('foto kedua = foto-profil2', /foto-profil2/.test(alt.getAttribute('src')) && /foto-profil\.png/.test(base.getAttribute('src')), base.getAttribute('src') + ' ' + alt.getAttribute('src'));
  ok('kedua gambar termuat', base.naturalWidth > 0 && alt.naturalWidth > 0, base.naturalWidth + '/' + alt.naturalWidth);
  const a = base.getBoundingClientRect(), b = alt.getBoundingClientRect();
  ok('kedua gambar persis bertumpuk (ukuran & posisi sama)', Math.abs(a.left - b.left) < 1 && Math.abs(a.top - b.top) < 1 && Math.abs(a.width - b.width) < 1 && Math.abs(a.height - b.height) < 1, JSON.stringify([a.left, a.top, a.width, a.height, b.left, b.top, b.width, b.height]));
  const r0 = () => parseFloat(getComputedStyle(w).getPropertyValue('--r')) || 0;
  ok('awal: lensa tertutup (radius 0), foto pertama saja', r0() === 0 && !w.classList.contains('lens-on'), r0());
  const x = a.left + a.width * .5, y = a.top + a.height * .3;
  base.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: x, clientY: y, pointerType: 'mouse' }));
  ok('kursor di foto: lensa aktif', w.classList.contains('lens-on'));
  const tr = w.getAnimations().filter(an => an.transitionProperty === '--r');
  ok('lensa melebar lewat transisi (bertahap, tidak langsung)', tr.length === 1 && tr[0].effect.getTiming().duration >= 400, tr.length + ' ' + (tr[0] && tr[0].effect.getTiming().duration));
  let full = r0(); for (let i = 0; i < 40 && full < 180; i++) { await wait(60); full = r0(); }
  ok('lensa hanya sebagian foto (radius < lebar foto)', full > 80 && full < a.width, full + ' / ' + a.width);
  const mk = getComputedStyle(alt).webkitMaskImage || getComputedStyle(alt).maskImage;
  const stops = [...mk.matchAll(/(\d+(?:\.\d+)?)px/g)].map(m => parseFloat(m[1]));
  ok('foto kedua: mask radial dengan radius aktual (bukan 0)', /radial-gradient/.test(mk) && Math.max(...stops.slice(2), 0) > 80, mk.slice(0, 120));
  const bm = getComputedStyle(base).webkitMaskImage || getComputedStyle(base).maskImage;
  const bs = [...bm.matchAll(/(\d+(?:\.\d+)?)px/g)].map(m => parseFloat(m[1]));
  ok('foto pertama dilubangi di dalam lensa (tanpa bayangan ganda)', /radial-gradient/.test(bm) && /rgba\(0, 0, 0, 0\)/.test(bm.split('radial-gradient')[1] || '') && Math.max(...bs.slice(2), 0) > 80 && bm.indexOf('rgba(0, 0, 0, 0)') < bm.indexOf('rgb(0, 0, 0)'), bm.slice(0, 140));
  const lx = parseFloat(w.style.getPropertyValue('--lx')); ok('lensa berpusat di kursor', Math.abs(lx - (x - a.left)) < 6, lx + ' vs ' + (x - a.left));
  document.body.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 5, clientY: 5, pointerType: 'mouse' }));
  ok('kursor keluar: lensa menutup', !w.classList.contains('lens-on'));
  let back = r0(); for (let i = 0; i < 40 && back >= 1; i++) { await wait(60); back = r0(); }
  ok('radius kembali 0 (foto pertama utuh)', back < 1, back);
  App.setLang('en'); await wait(300);
  ok('EN: lensa tetap ada', !!document.querySelector('[data-screen=profil] .ph-wrap img + img'));
  App.setLang('id');
  return out.join('\n');
}
