# TEMPLATE 3: Portofolio gaya video, isi CV Hafizah

## Tujuan dan alasan
Pemilik proyek (freelancer pembuat portofolio berbasis CV untuk klien) melihat video TikTok berisi portofolio desainer (Syahri Mustofa, dibuat di Canva) yang menurutnya menarik dari sisi **animasi, layout, dan warna sekaligus**. Ia ingin gaya itu ditiru sebagai TEMPLATE 3, diisi dengan **data CV Hafizah yang sama dengan TEMPLATE 2** (apoteker klinis), disimpan di `TEMPLATE/TEMPLATE 3/`. Alasannya: punya pilihan tampilan lain yang bisa ditawarkan ke klien.

Sumber gaya: `C:\Users\MyPC PRO\Downloads\ssstik.io_1792832551101.mp4` (video layar laptop 23 detik, kualitas rendah). Frame hasil ekstraksi ada di folder scratchpad sesi (`tt_frames/`). Isi detail halaman asli tidak terbaca, jadi yang ditiru adalah gaya, bukan konten.

## Yang harus tampil (dari video)
1. **Intro:** latar hitam pekat. Gumpalan "blob" biru bergradasi, blur tebal, bergerak pelan dan berubah bentuk. Tulisan **PORTOFOLIO** putih tebal huruf besar di atasnya, titik biru bercahaya di ujungnya. Teks kecil "Hafizah" kiri bawah, tahun kanan bawah. Setelah beberapa detik atau saat diklik, transisi ke profil.
2. **Profil:** foto Hafizah setengah badan di kiri dengan latar gradasi biru ke hitam. Kanan: sapaan "Halo, saya Hafizah", Tentang Saya, Pendidikan, Keahlian (ikon software), dan deretan tombol sosial/kontak bergaya kaca (glassmorphism).
3. **Daftar isi ("TABLE OF CONTENT"):** judul huruf tebal di kiri, **6 kartu kaca bernomor** di kanan (dipilih pemilik, mockup opsi B): 01 Pendidikan, 02 Magang, 03 Organisasi, 04 Sertifikasi, 05 Teknis, 06 Personal. Blob biru melayang di belakang. Efek kecil: teks sempat bergetar (glitch) saat kartu di-hover.
4. **Transisi:** klik kartu membuat layar blur ke blob biru, lalu muncul judul seksi besar di tengah dengan blob di belakangnya, lalu isi seksi.
5. **Halaman isi seksi:** tidak ada di video, jadi dirancang mengikuti gaya yang sama (latar hitam, kartu kaca, aksen biru).

**Palet:** hitam, biru listrik, putih. **Font:** sans geometris tebal, huruf kapital untuk judul besar.

## Isi
Seluruh teks, foto, dan struktur sama dengan `TEMPLATE/TEMPLATE 2/hasil/` (CV `E:\PROJEK\Portofoliohrdworking\CV_APOTEKER KLINIS.pdf`): pendidikan, magang (rumah sakit, apotek, puskesmas, regulatori, industri), organisasi, sertifikasi, teknis, personal. Foto dipakai ulang dari `TEMPLATE 2/hasil/assets/`. Tombol ID/EN seperti TEMPLATE 2 dan kartu sertifikat yang bisa diklik untuk detail juga dibawa, karena sudah ada dan menjadi bagian isi.

## Tujuan, bukan tujuan, anti-tujuan
- **Tujuan:** terlihat dan terasa seperti video, di desktop dan HP, animasi halus.
- **Bukan tujuan:** menyalin file Canva asli, meniru konten Syahri, membuat backend atau form kontak sungguhan, deploy ke Vercel (belum diminta).
- **Anti-tujuan:** hasil yang terlihat seperti template AI generik; menyalin nama, foto, atau teks Syahri; animasi berat yang membuat HP lag.

## Batasan
- Folder keluaran: `TEMPLATE/TEMPLATE 3/hasil/`, berdiri sendiri (bisa dibuka lewat server statis seperti TEMPLATE 2).
- Pendekatan teknis (pilihan saya, bukan kesepakatan): HTML, CSS, dan JavaScript biasa dalam satu halaman, tanpa framework, supaya ringan dan mudah dikirim ke klien.
- Hormati `prefers-reduced-motion` (animasi dimatikan atau disederhanakan).
- Harus nyaman di layar HP (lebar sekitar 360 px).

## Diserahkan ke pembuat
Bentuk blob (CSS gradient vs canvas/SVG), durasi dan easing animasi, tata letak halaman isi seksi, ukuran font, urutan kartu di HP, cara menyusun ulang teks panjang dari CV agar muat di gaya kartu kaca.

## Jawaban untuk pembuat (hasil pemeriksaan rancangan)
**Sudah terjawab oleh proyek:**
- **Referensi visual:** frame video disalin ke `TEMPLATE 3/referensi/` (`hi_intro.jpg` intro, `hi_site.jpg` profil, `hi_trans.jpg` transisi; `sheet_2/5/6.jpg` = lembar kontak 8 frame per gambar, urut waktu, 0,5 detik per frame, termasuk daftar isi dan transisi). Jangan bergantung pada file di Downloads atau scratchpad.
- **Data isi:** di `TEMPLATE 2/hasil/index.html`, teks ada di `renderVals()` (kamus `ID`/`EN`) dalam satu file; bisa diambil dari sana, tidak perlu mengekstrak ulang dari PDF.
- **Keahlian (profil):** software di CV hanya Ms. Office (Word, Excel) dan Canva, jadi ikon yang dipakai hanya itu, ditambah kemampuan teknis dari bagian teknis TEMPLATE 2. Tidak ada Photoshop dsb.
- **Foto profil:** `TEMPLATE 2/hasil/assets/foto-profil.png` berukuran 1750×1500 dengan latar transparan (RGBA), sudah berupa cutout, jadi cocok ditaruh di atas gradasi biru-hitam.
- **Tautan kontak:** pakai persis data kontak TEMPLATE 2; yang belum ada di CV (email, LinkedIn) tetap seperti di TEMPLATE 2, tidak dikarang.

**Keputusan saya (pemilik boleh membatalkan):**
- Tombol Pendidikan di profil hanya ringkasan satu baris; isi lengkap ada di kartu 01.
- Alur: intro → profil → daftar isi → seksi. Dari seksi ada tombol Kembali ke daftar isi, dan tombol Berikutnya/Sebelumnya antar seksi. Profil bisa dibuka lagi dari menu. URL hash dipakai agar tombol Back browser dan tautan langsung berfungsi.
- Intro otomatis lanjut setelah sekitar 4 detik atau saat diklik; tidak dilewati pada kunjungan berikutnya.
- Tahun di intro memakai tahun berjalan.
- Teknik blob: gradasi CSS dan SVG (tanpa canvas) agar ringan di HP; blur dibatasi pada beberapa elemen saja. Target: HP Android kelas menengah, Chrome terbaru.

## Catatan
Belum ada keputusan dari pemilik soal: foto sertifikat asli Hafizah (masih placeholder seperti di TEMPLATE 2), email dan LinkedIn Hafizah (tidak ada di CV, tombol kontak memakai data yang sama dengan TEMPLATE 2).

## Perubahan 2026-10-24: navigasi lewat scroll (permintaan pemilik)
Pemilik: "pakai scroll saja untuk perpindahannya, animasinya dari bawah ke atas saat perpindahan, yang dibuka itu ke atas".
- Layar ditumpuk berurutan: intro → profil → daftar isi → seksi. **Scroll ke bawah** (roda mouse, geser ke atas di HP, tombol ↓/PageDown) di batas bawah layar memajukan; **scroll ke atas** di batas atas memundurkan. Di dalam layar yang panjang, scroll biasa dulu sampai ujung.
- Layar yang dibuka **naik dari bawah ke atas** menutupi layar sebelumnya (yang lama bergeser sedikit ke atas); mundur = layar turun kembali. Klik kartu daftar isi membuka seksinya dengan gerak yang sama.
- Di dalam seksi, scroll di ujung bawah → seksi berikutnya (naik dari bawah); di ujung atas → seksi sebelumnya; di seksi pertama → daftar isi; di seksi terakhir tidak ada aksi.
- **Intro tidak lanjut otomatis lagi** (menggantikan keputusan 4 detik): menunggu scroll, ketuk, atau Enter. Ada petunjuk "scroll".
- Setelah satu perpindahan ada jeda ±0,9 detik agar satu gestur tidak melompat dua layar. Tombol dan titik navigasi di kanan tetap ada; URL hash dan tombol Back tetap berfungsi.
- Veil transisi blur dihapus; blob latar kini bagian tiap layar (gradasi + animasi transform, tanpa blur layar penuh).
