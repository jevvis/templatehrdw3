// Pemeriksa data: paritas kunci ID/EN, enam seksi berurutan, path gambar ada.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..', 'hasil');
const win = {}; vm.runInNewContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), { window: win });
const C = win.CONTENT; let bad = 0; const fail = m => { console.log('GAGAL:', m); bad++; };
const keys = (o, p = '') => Array.isArray(o) ? o.flatMap((v, i) => keys(v, p + '[' + i + ']')).concat(p + '.length=' + o.length)
  : o && typeof o === 'object' ? Object.keys(o).flatMap(k => keys(o[k], p + '.' + k)) : [p];
const a = keys(C.id), b = new Set(keys(C.en));
a.filter(k => !b.has(k)).forEach(k => fail('kunci ID tanpa EN: ' + k));
[...b].filter(k => !a.includes(k)).forEach(k => fail('kunci EN tanpa ID: ' + k));
const order = ['pendidikan', 'magang', 'organisasi', 'sertifikasi', 'teknis', 'personal'];
['id', 'en'].forEach(l => { if (C[l].sections.map(s => s.id).join() !== order.join()) fail('urutan seksi ' + l); });
[...C.id.edu.map(e => e.img), ...C.id.internships.map(e => e.img), ...C.id.orgs.map(e => e.img), C.id.photo, C.id.photo2].forEach(p => {
  if (!fs.existsSync(path.join(root, p))) fail('gambar tidak ada: ' + p); });
C.id.certs.forEach(c => { if (!fs.existsSync(path.join(root, c.imgSrc))) console.log('peringatan: foto sertifikat belum ada:', c.imgSrc); });
console.log(bad ? 'GAGAL (' + bad + ')' : 'OK'); process.exit(bad ? 1 : 0);
