# Ledger — plan: TEMPLATE 3/RENCANA.md
Pre-flight: Task 2 consumes CONTENT (Task 1); Tasks 3-5 consume App.go (Task 2). Interfaces konsisten.
Ruling: bukan repo git, jadi tanpa worktree/commit/skrip sdd; progres dicatat di file ini, "tes" dijalankan lewat node dan Chrome — biaya jika salah: tidak ada riwayat versi.
Ruling: bentuk CONTENT mengikuti larik TEMPLATE 2 (internships/orgs/certs) + sections[] terpisah, bukan sections.items — menghindari penulisan ulang teks CV; biaya jika salah: app.js memetakan sendiri.
Task 1: complete (node cek/cek-konten.js → OK; peringatan foto sertifikat)
Task 2: complete (uji.js di Chrome: 45/45 LULUS, termasuk router/bahasa)
Task 3: complete (intro, profil; uji timer/klik/tahun/kontak LULUS; visual desktop+HP sesuai referensi)
Task 4: complete (6 kartu, klik, klik ganda LULUS)
Task 5: complete (6 seksi, modal sertifikat, Esc, gambar utuh, prev/next LULUS)
Task 6: complete (tanpa scroll horizontal di 320/360/768/1280 untuk 4 layar LULUS; reduced-motion belum diuji di OS — diuji lewat kelas .rm)
Ruling: halaman tes memakai iframe untuk lebar layar karena resize jendela tidak mengubah viewport — biaya jika salah: pengujian HP asli tetap perlu mata manusia.
Final: review akhir oleh reviewer terpisah (opus). Temuan Important diperbaiki dalam satu putaran:
Final: fixed intro auto-advance menambah riwayat — 'intro otomatis tidak menambah riwayat' RED→GREEN (App.go(h, replace))
Final: fixed modal sertifikat tanpa focus trap/inert/aria-labelledby/kembali fokus — 4 tes RED→GREEN
Final: fixed fokus tidak pindah saat ganti layar + tombol menu tersembunyi masih bisa difokus — 2 tes RED→GREEN
Final: fixed risiko lag HP (morph border-radius, blur pada layar penuh, backdrop-filter di HP) — 4 tes CSS RED→GREEN
Final: fixed domisili tak terlihat di HP (nilai hanya di tooltip) — RED→GREEN (diturunkan dari Minor ke Important)
Final: suite 13/13 (perbaikan) dan 45/45 (penuh); tes lebar kini cek batas elemen karena scrollWidth tak bisa gagal.
Final: minor (deferred): Enter/Space di intro menangkap tombol ID/EN yang sedang fokus
Final: minor (deferred): judul veil EN terpotong ±18px di lebar 320 (ORGANIZATIONAL, CERTIFICATIONS,)
Final: minor (deferred): Back saat veil 400ms ditimpa navigasi tertunda
Final: minor (deferred): bahasa terpilih tidak disimpan; aria-label layar/menu tetap Indonesia saat EN; animasi masuk diulang saat ganti bahasa
Final: minor (deferred): modal sertifikat tak punya entri riwayat (Back Android menutup modal sekaligus keluar seksi)
Ruling: reviewer menilai temuan 8 (domisili di tooltip) Minor; saya naikkan ke Important karena pengunjung HP tak pernah melihat isinya — biaya jika salah: satu chip lebih panjang.
Ruling: tes memakai kunci cache-bust manual (fetch cache:reload) karena http.server memberi cache heuristik — biaya jika salah: tes lama bisa terbaca baru.
Perubahan (permintaan pemilik): navigasi lewat scroll, layar naik dari bawah. Dirancang di DESAIN.md bagian "Perubahan 2026-10-24".
Perubahan: complete — tes scroll 20/20, tes perbaikan 12/12 (satu tes autoplay dihapus), tes penuh 43/44 + 1 tes gambar-lazy yang diperbaiki (scroll dulu) dan dicek ulang manual 0 gambar rusak; screenshot transisi diperlambat memperlihatkan seksi naik dari bawah.
Ruling: intro tidak lagi lanjut otomatis 4 detik (menggantikan keputusan awal) — pemilik minta "pakai scroll saja"; biaya jika salah: pengunjung yang tak scroll tetap di intro (ada petunjuk "scroll ke bawah", klik, dan Enter).
Ruling: veil blur dihapus, blob jadi gradasi per layar (transform saja) — alasan: layar bertumpuk harus opaque; sekaligus lebih ringan di HP.
Ruling: ambang scroll = akumulasi 60px + jeda 450ms setelah gulir terakhir + kunci 900ms antar perpindahan — agar inersia trackpad tak melompati dua layar; biaya jika salah: terasa lambat atau melompat, mudah disetel di app.js.
Catatan: sentuhan (swipe) lewat touchstart/touchend belum diuji otomatis, hanya App.nav dan wheel/keyboard — perlu dicoba di HP sungguhan.
Foto profil diganti dengan 'Untitled design (13).png' (dipotong ke tepi objek, 1087x1600, 2,1 MB; asli 36 MB tetap di folder TEMPLATE 3); foto lama di cadangan/foto-profil-lama.png. Dicek di desktop dan 375/360 px.
Logo software (Word, Excel, Canva) ditambahkan di chip profil dan seksi Personal; diambil dari ORDER 3 ke hasil/logos.js; tes logo 6/6 LULUS (RED dulu 3 gagal); id gradasi unik lewat logo() di app.js.
Lensa foto profil: hover/sentuh foto mengungkap 'foto profil2.png' sebagian (lingkaran lembut, radius 0→190px/130px HP, transisi 0,7 dtk, mengikuti kursor). Foto kedua dipotong dengan kotak yang SAMA dengan foto pertama (1312,297,5322,6200) agar bertumpuk persis; tablet di kanan terpotong tepi (akibat kotak sama). Tes lensa 13/13 (3 putaran). Bug ditemukan lewat screenshot: @property --r inherits:false membuat foto kedua melihat radius 0 — tes dipertajam (cek radius mask aktual) lalu diperbaiki.
Ruling: foto asli 36–42 MB ('foto profil.png', 'foto profil2.png') tetap di folder TEMPLATE 3, di luar hasil/ — jangan ikut di-deploy.
Ruling: petunjuk kecil "Arahkan kursor ke foto"/"Sentuh fotonya" ditambahkan agar fitur ditemukan; hilang setelah lensa dipakai — biaya jika salah: hapus .ph-hint.
Catatan: sentuh di HP memakai pointer events + touch-action:pan-y; belum diuji di HP sungguhan.
Perbaikan lensa (laporan pemilik: bayangan ganda di belakang kepala saat lensa aktif): foto pertama kini dilubangi dengan lingkaran yang sama (mask radial terbalik) sehingga di dalam lensa hanya foto kedua terlihat. Tes 'foto pertama dilubangi' RED→GREEN; tes lensa 14/14 (2 putaran); dicek visual dengan kursor sungguhan.
