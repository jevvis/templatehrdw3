# TEMPLATE 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bangun portofolio satu halaman bergaya video TikTok (intro blob biru, profil, daftar isi 6 kartu kaca, transisi blur) dengan isi CV Hafizah dari TEMPLATE 2.

**Architecture:** HTML + CSS + JS biasa tanpa framework. Satu "layar aktif" pada satu waktu, dipilih oleh URL hash (`#intro`, `#profil`, `#isi`, `#seksi/<id>`). Teks diambil dari `data.js` (kamus ID/EN yang diangkat dari TEMPLATE 2). Blob dibuat dari gradasi CSS/SVG, bukan canvas.

**Tech Stack:** HTML, CSS, JavaScript (ES2020), Python `http.server` untuk pratinjau, Chrome (MCP) untuk verifikasi, Node untuk skrip cek konten.

**Spec:** `E:\PROJEK\Portofoliohrdworking\TEMPLATE\TEMPLATE 3\DESAIN.md` (acuan visual: `TEMPLATE 3/referensi/*.jpg`; sumber isi: `TEMPLATE 2/hasil/index.html`, fungsi `renderVals()`).

## Global Constraints

- Keluaran di `E:\PROJEK\Portofoliohrdworking\TEMPLATE\TEMPLATE 3\hasil\`, berdiri sendiri, tanpa framework dan tanpa build.
- Palet: hitam, biru listrik, putih. Font sans geometris tebal, judul besar huruf kapital (Lexend dari Google Fonts, seperti TEMPLATE 2).
- Isi teks, foto, dan struktur sama dengan TEMPLATE 2; tombol ID/EN dan kartu sertifikat yang bisa diklik ikut dibawa.
- Daftar isi: tepat 6 kartu bernomor: 01 Pendidikan, 02 Magang, 03 Organisasi, 04 Sertifikasi, 05 Teknis, 06 Personal.
- Hormati `prefers-reduced-motion` (animasi mati atau disederhanakan); `?motion=1` memaksa animasi, seperti TEMPLATE 2.
- Nyaman di lebar 360 px; tanpa scroll horizontal; blur berat hanya pada beberapa elemen.
- Dilarang menyalin nama, foto, atau teks Syahri Mustofa.
- Intro lanjut otomatis sekitar 4 detik atau saat diklik; tahun di intro = tahun berjalan; data kontak sama dengan TEMPLATE 2 (tidak mengarang email/LinkedIn).

## Review Focus

1. Hash tidak dikenal atau kosong (`#xyz`, `#seksi/tidak-ada`) → jatuh ke intro, tidak layar kosong.
2. Tombol Back/Forward browser antar layar → berpindah layar yang benar, bukan keluar halaman.
3. Ganti bahasa saat berada di seksi → tetap di seksi yang sama, teks berganti.
4. Klik intro saat timer 4 detik masih jalan → hanya satu perpindahan (timer dibatalkan).
5. Klik kartu dua kali cepat saat transisi → hanya satu seksi terbuka.
6. Foto sertifikat belum ada → kartu tampil placeholder, bukan gambar rusak; modal tetap bisa dibuka.
7. Lebar 320 px → tidak ada teks terpotong atau scroll horizontal.

---

## File Structure

- `hasil/index.html` — kerangka semua layar + `<script src>`; tanpa teks isi hard-coded.
- `hasil/style.css` — palet, blob, kartu kaca, transisi, responsif.
- `hasil/data.js` — `window.CONTENT = { id: {...}, en: {...} }`, diangkat dari TEMPLATE 2.
- `hasil/app.js` — router hash, bahasa, render layar, modal sertifikat.
- `hasil/assets/` — salinan `foto-profil.png`, `foto/`, `sertifikat/` dari TEMPLATE 2.
- `cek/cek-konten.js` — skrip Node pemeriksa data (paritas ID/EN, aset ada).

### Task 1: Isi dan aset

**Files:**
- Create: `hasil/data.js`, `cek/cek-konten.js`, `hasil/assets/*` (salin)
- Test: `cek/cek-konten.js`

**Interfaces:**
- Produces: `window.CONTENT[lang]` dengan `lang ∈ {'id','en'}`; kunci minimal: `name`, `greeting`, `about`, `sections: {pendidikan, magang, organisasi, sertifikasi, teknis, personal}` (tiap seksi: `title`, `items[]`), `skills: string[]`, `contacts: {label, href}[]`, `ui: {back, next, prev, toc, close}`. Bentuk `items[]` mengikuti TEMPLATE 2 (role, org, periode, points[{h,t}], dsb.).
- Produces: `CONTENT.id` dan `CONTENT.en` punya himpunan kunci identik pada semua kedalaman.

- [ ] **Step 1: Tulis `cek/cek-konten.js`** — memuat `data.js` lewat `vm`, lalu menegaskan: (a) `Object.keys` ID = EN secara rekursif; (b) enam kunci `sections` ada dan berurutan seperti Global Constraints; (c) setiap path gambar yang dirujuk data (`foto`, `src`) ada di `hasil/`, kecuali foto sertifikat yang boleh hilang (dicatat sebagai peringatan, bukan gagal). Keluar dengan kode 1 jika gagal.
- [ ] **Step 2: Jalankan** `node cek/cek-konten.js` — Expected: gagal (`data.js` belum ada).
- [ ] **Step 3: Buat `hasil/data.js`** — baca `TEMPLATE 2/hasil/index.html`, angkat kamus ID/EN dari `renderVals()` (internships, orgs, certs, software, teknis, personal, kontak) ke bentuk di Interfaces; salin teks verbatim, jangan ditulis ulang. Salin `assets/` dari TEMPLATE 2, buang `porto-*.jpg` (tidak dipakai).
- [ ] **Step 4: Jalankan** `node cek/cek-konten.js` — Expected: `OK` dan hanya peringatan foto sertifikat.
- [ ] **Step 5: (tidak ada git) Catat** di `RENCANA.md` bahwa Task 1 selesai.

### Task 2: Kerangka, router hash, dan bahasa

**Files:**
- Create: `hasil/index.html`, `hasil/style.css`, `hasil/app.js`

**Interfaces:**
- Produces: `window.App = { go(hash: string): void, setLang(lang: 'id'|'en'): void, lang: string }`. `go('#seksi/magang')` menampilkan hanya `<section data-screen="seksi">` dengan konten seksi itu; hash tidak dikenal → `#intro`. Tiap layar adalah `<section data-screen="intro|profil|isi|seksi" hidden>`.
- Produces: `hashchange` memanggil render; `setLang` merender ulang layar aktif tanpa mengubah hash; bahasa awal dari `?lang=en` atau `id`.

- [ ] **Step 1: Tulis uji di browser** (Chrome MCP `javascript_tool` setelah pratinjau jalan): `App.go('#xyz')` → `location.hash === '#intro'`; `App.go('#seksi/tidak-ada')` → `#intro`; `App.go('#isi')` lalu `history.back()` → kembali ke layar sebelumnya.
- [ ] **Step 2: Jalankan pratinjau** `python -I -m http.server 3200 --directory "…/TEMPLATE 3/hasil"`, buka `http://localhost:3200/` — Expected: uji gagal (App belum ada).
- [ ] **Step 3: Implementasikan** kerangka HTML, `App.go`/`setLang`, dan render placeholder per layar; font Lexend dari Google Fonts.
- [ ] **Step 4: Jalankan ulang uji** — Expected: semua lulus; ganti bahasa di seksi tidak mengubah hash.

### Task 3: Intro dan profil

**Files:**
- Modify: `hasil/index.html`, `hasil/style.css`, `hasil/app.js`

**Interfaces:**
- Consumes: `App.go`, `CONTENT[lang].{name,greeting,about,skills,contacts}`.
- Produces: layar intro (blob biru bergerak, teks PORTOFOLIO + titik biru, "Hafizah" kiri bawah, `© <tahun berjalan>` kanan bawah) yang memanggil `App.go('#profil')` setelah 4000 ms atau saat diklik; timer dibatalkan saat klik atau pindah layar. Layar profil: foto `foto-profil.png` di kiri atas gradasi biru→hitam, sapaan, Tentang Saya, ringkasan satu baris Pendidikan, ikon Ms. Office dan Canva, tombol kontak kaca, tombol ke `#isi`.

- [ ] **Step 1: Uji** — setelah 4,2 detik tanpa klik `location.hash === '#profil'`; klik intro pada detik ke-1 → `#profil` dan tidak ada perpindahan kedua pada detik ke-5 (Review Focus 4); teks tahun di intro sama dengan `new Date().getFullYear()`.
- [ ] **Step 2: Jalankan** — Expected: gagal.
- [ ] **Step 3: Implementasikan** intro dan profil sesuai `referensi/hi_intro.jpg` dan `hi_site.jpg`; blob = elemen `radial-gradient` + `filter: blur(…)` dengan animasi `transform`/`border-radius` lewat keyframes; matikan animasi di `prefers-reduced-motion`.
- [ ] **Step 4: Jalankan uji dan periksa visual** dengan screenshot Chrome di 1280 px dan 360 px — Expected: lulus; tampilan mirip referensi.

### Task 4: Daftar isi dan transisi

**Files:**
- Modify: `hasil/index.html`, `hasil/style.css`, `hasil/app.js`

**Interfaces:**
- Consumes: `CONTENT[lang].sections`, `App.go`.
- Produces: layar `isi` dengan judul "TABLE OF CONTENT", 6 kartu kaca bernomor (`<a data-card="pendidikan|magang|organisasi|sertifikasi|teknis|personal">`), glitch pada judul kartu saat hover, blob melayang. Klik kartu: `App.go('#seksi/<id>')` setelah transisi blur ke blob (±600 ms) dengan judul seksi besar; klik saat transisi berjalan diabaikan.

- [ ] **Step 1: Uji** — ada tepat 6 `[data-card]` berurutan; klik kartu `magang` → `#seksi/magang`; dua klik dalam 100 ms → hash tetap satu seksi dan riwayat bertambah 1 (Review Focus 5).
- [ ] **Step 2: Jalankan** — Expected: gagal.
- [ ] **Step 3: Implementasikan** daftar isi dan transisi sesuai `referensi/sheet_5.jpg`, `sheet_6.jpg`; kunci `App.busy` selama transisi.
- [ ] **Step 4: Jalankan uji** — Expected: lulus.

### Task 5: Halaman seksi dan sertifikat

**Files:**
- Modify: `hasil/app.js`, `hasil/style.css`, `hasil/index.html`

**Interfaces:**
- Consumes: `CONTENT[lang].sections[id].items`, `App.go`.
- Produces: `renderSection(id: string): HTMLElement` yang menampilkan item (judul poin + kalimat CV seperti TEMPLATE 2) dalam kartu kaca; tombol Kembali ke `#isi`, Sebelumnya/Berikutnya mengikuti urutan 6 seksi (tombol Sebelumnya disembunyikan di seksi pertama, Berikutnya di terakhir). Seksi Sertifikasi: kartu bisa diklik membuka modal detail (`openCert(i)`, tutup dengan Esc/tombol/klik latar); foto tidak ada → placeholder.

- [ ] **Step 1: Uji** — tiap `#seksi/<id>` untuk 6 id merender minimal satu item; di EN, teks judul seksi sama dengan `CONTENT.en.sections[id].title`; modal sertifikat terbuka dan tertutup dengan Esc; tidak ada `<img>` rusak (`naturalWidth > 0`) di halaman Sertifikasi (Review Focus 3, 6).
- [ ] **Step 2: Jalankan** — Expected: gagal.
- [ ] **Step 3: Implementasikan** sesuai Interfaces; gaya mengikuti kartu kaca, aksen biru.
- [ ] **Step 4: Jalankan uji** — Expected: lulus.

### Task 6: Responsif, gerak, dan verifikasi akhir

**Files:**
- Modify: `hasil/style.css`, `hasil/app.js`

- [ ] **Step 1: Uji** pada lebar 320, 360, 768, 1280: `document.documentElement.scrollWidth <= innerWidth` di keempat layar utama dan di satu seksi panjang (Magang) (Review Focus 7).
- [ ] **Step 2: Jalankan** — Expected: perbaiki yang gagal sampai lulus.
- [ ] **Step 3: Periksa `prefers-reduced-motion`**: dengan emulasi reduced-motion, intro tidak beranimasi dan tetap lanjut ke profil; dengan `?motion=1` animasi jalan.
- [ ] **Step 4: Tinjau visual** semua layar di 1280 px dan 360 px terhadap `referensi/`, bandingkan dengan DESAIN.md bagian "Yang harus tampil"; catat penyimpangan.
- [ ] **Step 5: Jalankan ulang** `node cek/cek-konten.js` dan semua uji Task 2–5 — Expected: semua lulus. Laporkan ke pemilik dengan URL pratinjau.
