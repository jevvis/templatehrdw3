// Isi CV Hafizah, diangkat dari TEMPLATE 2/hasil/index.html (renderVals). Jangan ubah teks di sini tanpa mengubah CV.
(function () {
  const TX = {
      id: {
        hire: 'Hubungi Saya', hello: 'HELLO, SAYA', aboutBtn: 'Tentang Saya', viewExp: 'Lihat Pengalaman', aboutTitle: 'TENTANG SAYA', findMe: 'Temukan saya di',
        aboutText: 'Lulusan Profesi Apoteker dari Universitas Indonesia dengan pengalaman praktik dalam pelayanan farmasi klinis di rumah sakit, apotek, dan puskesmas. Memiliki kompetensi dalam pengkajian dan skrining resep, dispensing, Pelayanan Informasi Obat (PIO), konseling, serta edukasi obat. Didukung oleh pengalaman tambahan di sektor industri dan regulasi farmasi, sehingga memiliki pemahaman mengenai siklus obat dari produksi hingga pelayanan ke pasien. Berorientasi pada pelayanan kefarmasian yang berpusat pada pasien (patient-oriented care) dengan mengutamakan ketepatan terapi, patient safety, dan kualitas pelayanan.',
        secEdu: 'PENDIDIKAN', secInt: 'PENGALAMAN MAGANG', secOrg: 'PENGALAMAN ORGANISASI', secCert: 'SERTIFIKASI, LISENSI, & PELATIHAN', secTech: 'KEMAMPUAN TEKNIS', secPers: 'KEMAMPUAN PERSONAL & SOFTWARE',
        gpaLabel: 'IPK / 4.00', persTitle: 'Kemampuan Personal', swTitle: 'Kemampuan Software',
        contactTitle: 'Mari bekerja sama', thanks: 'Terima kasih! Pesan kamu sudah terkirim.', phName: 'Nama kamu', phEmail: 'Email', phMsg: 'Pesan singkat', send: 'Kirim Pesan',
        toTop: 'Kembali ke atas', langLabel: 'Pilih bahasa', detail: 'Lihat detail', close: 'Tutup', prev: 'Sebelumnya', next: 'Berikutnya', issuedBy: 'Diterbitkan oleh', holder: 'Atas nama',
        noPhoto: 'Foto dokumen asli akan ditampilkan di sini setelah diunggah.'
      },
      en: {
        hire: 'Contact Me', hello: "HELLO, I'M", aboutBtn: 'About Me', viewExp: 'View Experience', aboutTitle: 'ABOUT ME', findMe: 'Find me on',
        aboutText: 'Pharmacist graduate of Universitas Indonesia with practical experience in clinical pharmacy services at hospitals, community pharmacies, and community health centers (puskesmas). Competent in prescription review and screening, dispensing, Drug Information Services (PIO), counseling, and patient drug education. Supported by additional experience in the pharmaceutical industry and regulatory affairs, giving an understanding of the drug cycle from production to patient care. Oriented toward patient-centered pharmaceutical care, prioritizing therapeutic accuracy, patient safety, and service quality.',
        secEdu: 'EDUCATION', secInt: 'INTERNSHIP EXPERIENCE', secOrg: 'ORGANIZATIONAL EXPERIENCE', secCert: 'CERTIFICATIONS, LICENSES, & TRAINING', secTech: 'TECHNICAL SKILLS', secPers: 'PERSONAL & SOFTWARE SKILLS',
        gpaLabel: 'GPA / 4.00', persTitle: 'Personal Skills', swTitle: 'Software Skills',
        contactTitle: "Let's work together", thanks: 'Thank you! Your message has been sent.', phName: 'Your name', phEmail: 'Email', phMsg: 'Short message', send: 'Send Message',
        toTop: 'Back to top', langLabel: 'Choose language', detail: 'View details', close: 'Close', prev: 'Previous', next: 'Next', issuedBy: 'Issued by', holder: 'Holder',
        noPhoto: 'The photo of the original document will be shown here once uploaded.'
      }
  };
    const ID = {
      marquee: ['Skrining Resep', 'Pelayanan Informasi Obat', 'Konseling Pasien', 'Pemantauan Terapi Obat', 'Patient Safety', 'Dispensing', 'Rekonsiliasi Obat', 'Farmasi Klinis'],
      stats: ['IPK Sarjana Farmasi', 'IPK Profesi Apoteker'],
      edu: [['Profesi Apoteker', 'Universitas Indonesia'], ['Sarjana Farmasi', 'Universitas Indonesia']],
      internships: [
        ['Mei – Juli 2026', 'Clinical Pharmacy Intern', 'RSUP Dr. Kariadi — Semarang, Jawa Tengah', [
          'Melaksanakan rotasi di depo rawat jalan, rawat inap, IGD, kamar operasi, dan gudang farmasi untuk memahami alur pelayanan serta pengelolaan perbekalan farmasi di rumah sakit.',
          'Berpartisipasi dalam pelayanan obat mulai dari penerimaan resep, skrining resep, penyiapan, pemeriksaan ulang, dispensing, konseling, hingga penyerahan obat pulang di bawah supervisi apoteker.',
          'Berpartisipasi dalam rekonsiliasi obat, visite, dan pengkajian pasien secara langsung bersama tim.',
          'Melaksanakan Pemantauan Terapi Obat (PTO) pada pasien yang ditugaskan, termasuk pasien stroke iskemik dan stroke hemoragik, di bawah supervisi apoteker.',
          'Mengkaji ketepatan indikasi, dosis, respons terapi, potensi medication error, serta masalah terkait obat (MTO) sebagai bagian dari kegiatan pelayanan farmasi klinis.',
          'Berpartisipasi dalam pelayanan konseling pasien ARV di instalasi rawat jalan serta memberikan informasi terkait penggunaan obat.',
          'Memperoleh pengalaman dalam penerapan sistem distribusi obat 1 × 24 jam dan unit dose pada pelayanan rawat inap.',
          'Melakukan konseling obat pulang dan memberikan informasi obat kepada pasien sesuai kebutuhan pelayanan.',
          'Memperoleh pengalaman dalam pengelolaan obat untuk kebutuhan tindakan operasi terjadwal maupun emergensi.']],
        ['Oktober – November 2025', 'Community Pharmacy Intern', 'Apotek Kimia Farma Cikokol — Tangerang, Banten', [
          'Melaksanakan skrining resep, dispensing, pemberian informasi obat, dan pelayanan swamedikasi.',
          'Mendukung pelayanan Program Rujuk Balik (PRB) BPJS melalui verifikasi administrasi dan penyiapan obat.']],
        ['September – Oktober 2025', 'Primary Care Pharmacy Intern', 'Puskesmas Cengkareng — Jakarta Barat, DKI Jakarta', [
          'Melakukan skrining resep, konseling, dan pemantauan terapi obat pada pasien puskesmas.',
          'Mendukung pengelolaan sediaan farmasi meliputi perencanaan, pengadaan, penyimpanan, hingga pemusnahan.',
          'Melaksanakan stok opname untuk mendukung pengendalian persediaan serta pemantauan obat kedaluwarsa.']],
        ['April – Mei 2026', 'Regulatory Affairs Intern', 'Kementerian Kesehatan RI (Ditjen Farmalkes)', [
          'Mempelajari regulasi peredaran alat kesehatan di Indonesia, termasuk alur perizinan, registrasi, registrasi ulang, dan evaluasi dokumen pendukung.']],
        ['Desember 2025 – Januari 2026', 'Pharmaceutical Industry Intern', 'PT Bio Farma (Persero) — Bandung, Jawa Barat', [
          'Terlibat dalam proses produksi sediaan solid meliputi penimbangan, granulasi basah, dan pencetakan, serta melakukan Line Clearance dan In-Process Control (IPC).',
          'Mendukung pengujian Quality Control (QC) meliputi kadar, disolusi, keseragaman bobot, kekerasan, friabilitas, pH, dan Loss on Drying (LOD).',
          'Mempelajari proses preformulasi, optimasi R&D, serta sistem penunjang kritis industri meliputi HVAC, pengolahan air, dan cleanroom.']],
        ['2024 – 2025', 'Asisten Dosen Praktikum Farmakologi', 'Universitas Indonesia — Depok, Jawa Barat', [
          'Membimbing dan menjelaskan prosedur kegiatan praktikum kepada mahasiswa dari 6 kelas reguler.',
          'Menyiapkan bahan dan peralatan praktikum serta memastikan kebutuhan kegiatan tersedia sebelum pelaksanaan.',
          'Melaksanakan pre-test dan evaluasi hasil praktikum mahasiswa sebagai bagian dari proses pembelajaran.']]
      ],
      orgs: [
        ['2024 – 2025', 'Staf Kementerian Keuangan', 'BEM Universitas Indonesia', [
          'Menjalankan fungsi budgeting dan controlling dalam pengelolaan keuangan organisasi.',
          'Menyusun pelaporan keuangan secara transparan dan akuntabel untuk mendukung pertanggungjawaban organisasi.']],
        ['2022 – 2023', 'Bendahara', 'Himpunan Mahasiswa Jurusan Farmasi', [
          'Menyusun rencana pengeluaran dan mengelola perputaran dana organisasi selama satu periode kepengurusan.',
          'Menyusun laporan pertanggungjawaban keuangan sebagai bentuk akuntabilitas pengelolaan dana organisasi.']]
      ],
      certs: [
        ['SERTIFIKAT', 'Certificate in Customer Feedback Management', 'Badan Nasional Sertifikasi Profesi (BNSP)', 'Sertifikat kompetensi di bidang Customer Feedback Management yang diterbitkan oleh Badan Nasional Sertifikasi Profesi (BNSP).'],
        ['LISENSI', 'Surat Tanda Registrasi (STR) Apoteker', 'Konsil Kesehatan Indonesia', 'Surat Tanda Registrasi (STR) adalah bukti registrasi apoteker yang diterbitkan oleh Konsil Kesehatan Indonesia sebagai dasar untuk menjalankan praktik kefarmasian.'],
        ['SERTIFIKAT', 'Sertifikat Kompetensi Apoteker', 'Kolegium Farmasi Indonesia', 'Sertifikat kompetensi apoteker yang diterbitkan oleh Kolegium Farmasi Indonesia sebagai pengakuan kompetensi profesi apoteker.']
      ],
      technical: ['Pelayanan Informasi Obat (PIO)', 'Skrining resep dan evaluasi rasionalitas terapi', 'Dispensing dan peracikan obat (compounding)', 'Konseling dan edukasi pasien terkait penggunaan obat', 'Pemantauan Terapi Obat (PTO)', 'Evaluasi efektivitas dan keamanan terapi obat', 'Identifikasi Drug Related Problems (DRP)', 'Monitoring Efek Samping Obat', 'Implementasi patient safety dalam penggunaan obat', 'Pengkajian penggunaan obat pasien', 'Evaluasi ketepatan penggunaan obat', 'Pemantauan respons pasien terhadap terapi', 'Pelayanan kefarmasian berbasis kebutuhan pasien', 'Dokumentasi pelayanan kefarmasian'],
      personal: ['Disiplin', 'Tanggung Jawab', 'Ramah', 'Sopan', 'Empati', 'Teliti', 'Komunikatif', 'Adaptif', 'Kerja Tim', 'Cepat Belajar'],
      contactLabels: ['EMAIL', 'DOMISILI', 'LINKEDIN']
    };
    const EN = {
      marquee: ['Prescription Screening', 'Drug Information Services', 'Patient Counseling', 'Therapeutic Drug Monitoring', 'Patient Safety', 'Dispensing', 'Medication Reconciliation', 'Clinical Pharmacy'],
      stats: ['Bachelor of Pharmacy GPA', 'Pharmacist Profession GPA'],
      edu: [['Pharmacist Profession Program', 'Universitas Indonesia'], ['Bachelor of Pharmacy', 'Universitas Indonesia']],
      internships: [
        ['May – July 2026', 'Clinical Pharmacy Intern', 'RSUP Dr. Kariadi — Semarang, Central Java', [
          'Completed rotations in the outpatient, inpatient, emergency (IGD), operating room, and pharmacy warehouse depots to understand service flow and pharmaceutical supply management in a hospital.',
          'Took part in medication services from prescription receipt, prescription screening, preparation, double-checking, dispensing, and counseling through to discharge medication hand-over, under pharmacist supervision.',
          'Took part in medication reconciliation, ward rounds (visite), and direct patient assessment together with the team.',
          'Carried out Therapeutic Drug Monitoring (PTO) on assigned patients, including ischemic and hemorrhagic stroke patients, under pharmacist supervision.',
          'Assessed the appropriateness of indication, dose, therapeutic response, potential medication errors, and drug-related problems (MTO) as part of clinical pharmacy activities.',
          'Took part in ARV patient counseling at the outpatient installation and provided information on medication use.',
          'Gained experience in applying the 1 × 24-hour drug distribution system and unit dose in inpatient care.',
          'Provided discharge medication counseling and drug information to patients according to service needs.',
          'Gained experience in managing medications for scheduled and emergency surgical procedures.']],
        ['October – November 2025', 'Community Pharmacy Intern', 'Apotek Kimia Farma Cikokol — Tangerang, Banten', [
          'Performed prescription screening, dispensing, drug information services, and self-medication (swamedikasi) services.',
          'Supported the BPJS Referral-Back Program (PRB) through administrative verification and medication preparation.']],
        ['September – October 2025', 'Primary Care Pharmacy Intern', 'Puskesmas Cengkareng — West Jakarta, DKI Jakarta', [
          'Performed prescription screening, counseling, and drug therapy monitoring for community health center patients.',
          'Supported pharmaceutical supply management including planning, procurement, storage, and disposal.',
          'Carried out stock opname to support inventory control and monitoring of expired drugs.']],
        ['April – May 2026', 'Regulatory Affairs Intern', 'Ministry of Health RI (Ditjen Farmalkes)', [
          'Studied regulations on the distribution of medical devices in Indonesia, including the licensing flow, registration, re-registration, and evaluation of supporting documents.']],
        ['December 2025 – January 2026', 'Pharmaceutical Industry Intern', 'PT Bio Farma (Persero) — Bandung, West Java', [
          'Involved in solid dosage production including weighing, wet granulation, and compression, and carried out Line Clearance and In-Process Control (IPC).',
          'Supported Quality Control (QC) testing including assay, dissolution, weight uniformity, hardness, friability, pH, and Loss on Drying (LOD).',
          'Studied preformulation, R&D optimization, and critical industry support systems including HVAC, water treatment, and cleanrooms.']],
        ['2024 – 2025', 'Pharmacology Practicum Teaching Assistant', 'Universitas Indonesia — Depok, West Java', [
          'Guided and explained practicum procedures to students from 6 regular classes.',
          'Prepared practicum materials and equipment and ensured all activity needs were available before sessions.',
          "Conducted pre-tests and evaluated students' practicum results as part of the learning process."]]
      ],
      orgs: [
        ['2024 – 2025', 'Staff of the Ministry of Finance', 'BEM Universitas Indonesia', [
          'Carried out budgeting and controlling functions in managing organizational finances.',
          'Prepared transparent and accountable financial reports to support organizational accountability.']],
        ['2022 – 2023', 'Treasurer', 'Pharmacy Student Association (Himpunan Mahasiswa Jurusan Farmasi)', [
          'Prepared expenditure plans and managed organizational funds during one term of the board.',
          'Prepared financial accountability reports as a form of accountability in managing organizational funds.']]
      ],
      certs: [
        ['CERTIFICATE', 'Certificate in Customer Feedback Management', 'National Professional Certification Agency (BNSP)', 'A competency certificate in Customer Feedback Management issued by the National Professional Certification Agency (BNSP).'],
        ['LICENSE', 'Pharmacist Registration Certificate (STR)', 'Indonesian Health Council', 'The Registration Certificate (STR) is proof of pharmacist registration issued by the Indonesian Health Council, the basis for practicing pharmacy.'],
        ['CERTIFICATE', 'Pharmacist Competency Certificate', 'Indonesian Pharmacy Collegium', 'A pharmacist competency certificate issued by the Indonesian Pharmacy Collegium as recognition of professional pharmacist competence.']
      ],
      technical: ['Drug Information Services (PIO)', 'Prescription screening and therapy rationality evaluation', 'Dispensing and compounding', 'Patient counseling and education on medication use', 'Therapeutic Drug Monitoring (PTO)', 'Evaluation of drug therapy effectiveness and safety', 'Drug Related Problems (DRP) identification', 'Adverse drug reaction monitoring', 'Patient safety implementation in medication use', 'Patient medication use review', 'Evaluation of medication-use appropriateness', 'Monitoring patient response to therapy', 'Patient-needs-based pharmaceutical care', 'Pharmaceutical care documentation'],
      personal: ['Disciplined', 'Responsible', 'Friendly', 'Polite', 'Empathetic', 'Meticulous', 'Communicative', 'Adaptable', 'Teamwork', 'Fast Learner'],
      contactLabels: ['EMAIL', 'LOCATION', 'LINKEDIN']
    };
  const NAV = {
    id: ['Pendidikan', 'Magang', 'Organisasi', 'Sertifikasi', 'Teknis', 'Personal'],
    en: ['Education', 'Internships', 'Organization', 'Certificates', 'Technical', 'Personal']
  };
  const SEC_TITLE = {
    id: ['Pendidikan', 'Pengalaman Magang', 'Pengalaman Organisasi', 'Sertifikasi, Lisensi & Pelatihan', 'Kemampuan Teknis', 'Personal & Software'],
    en: ['Education', 'Internship Experience', 'Organizational Experience', 'Certifications, Licenses & Training', 'Technical Skills', 'Personal & Software']
  };
  const IDS = ['pendidikan', 'magang', 'organisasi', 'sertifikasi', 'teknis', 'personal'];
  const UI = {
    id: { toc: 'DAFTAR ISI', hello: 'Halo, saya', about: 'Tentang Saya', edu: 'Pendidikan', skills: 'Keahlian', back: 'Daftar Isi', next: 'Berikutnya', prev: 'Sebelumnya', start: 'Mulai', profile: 'Profil', lang: 'Bahasa', close: 'Tutup', detail: 'Lihat detail', explore: 'Lihat Daftar Isi', intro: 'PORTOFOLIO' },
    en: { toc: 'TABLE OF CONTENT', hello: 'Hello, I am', about: 'About Me', edu: 'Education', skills: 'Skills', back: 'Contents', next: 'Next', prev: 'Previous', start: 'Start', profile: 'Profile', lang: 'Language', close: 'Close', detail: 'View details', explore: 'See Contents', intro: 'PORTFOLIO' }
  };
  const EDU = {
    id: [{ year: '2025 — 2026', title: ID.edu[0][0], school: ID.edu[0][1], gpa: '4.00', img: 'assets/foto/edu-profesi.jpg' }, { year: '2021 — 2025', title: ID.edu[1][0], school: ID.edu[1][1], gpa: '3.94', img: 'assets/foto/edu-sarjana.jpg' }],
    en: [{ year: '2025 — 2026', title: EN.edu[0][0], school: EN.edu[0][1], gpa: '4.00', img: 'assets/foto/edu-profesi.jpg' }, { year: '2021 — 2025', title: EN.edu[1][0], school: EN.edu[1][1], gpa: '3.94', img: 'assets/foto/edu-sarjana.jpg' }]
  };
  const intImgs = ['exp-kariadi', 'exp-kimiafarma', 'exp-puskesmas', 'exp-kemenkes', 'exp-biofarma', 'exp-farmakologi'];
  const orgImgs = ['exp-bem', 'exp-hmj'];
  const certFiles = ['cert-bnsp', 'cert-str', 'cert-kompetensi'];
  const item = (arr, imgs) => arr.map(([period, role, org, points], i) => ({ period, role, org, img: 'assets/foto/' + imgs[i] + '.jpg', points }));
  const build = (L, D) => ({
    tx: TX[L], ui: UI[L],
    name: 'Hafizah', fullName: 'Hafizah Nurfadillah',
    headline: 'apt. Hafizah Nurfadillah, S.Farm — Licensed Pharmacist | Aspiring Clinical Pharmacist | Patient-Centered Care',
    photo: 'assets/foto-profil.png',
    photo2: 'assets/foto-profil2.png',
    sections: IDS.map((id, i) => ({ id, num: '0' + (i + 1), label: NAV[L][i], title: SEC_TITLE[L][i] })),
    edu: EDU[L],
    internships: item(D.internships, intImgs),
    orgs: item(D.orgs, orgImgs),
    certs: D.certs.map(([kind, title, issuer, desc], i) => ({ kind, title, issuer, desc, imgSrc: 'assets/sertifikat/' + certFiles[i] + '.jpg' })),
    technical: D.technical,
    personal: D.personal,
    software: ['Ms. Office (Word, Excel)', 'Canva'],
    contacts: [
      { label: D.contactLabels[0], value: 'hafizah.nurfadillah@gmail.com', href: 'mailto:hafizah.nurfadillah@gmail.com' },
      { label: D.contactLabels[1], value: 'Jakarta, Indonesia', href: '' },
      { label: D.contactLabels[2], value: 'linkedin.com/in/hafizah-nurfadillah', href: 'https://linkedin.com/in/hafizah-nurfadillah' }
    ]
  });
  window.CONTENT = { id: build('id', ID), en: build('en', EN) };
})();
