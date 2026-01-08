# jadwalsholat

Aplikasi/perpustakaan sederhana untuk mendapatkan dan menampilkan jadwal sholat berdasarkan lokasi. README ini berisi penjelasan singkat tentang tujuan proyek, cara instalasi, konfigurasi, penggunaan dasar, dan panduan kontribusi.

## Fitur
- Mengambil jadwal sholat (Shubuh, Dzuhur, Ashar, Maghrib, Isya) untuk lokasi tertentu
- Konfigurasi zona waktu dan metode perhitungan
- Mudah diintegrasikan ke aplikasi web atau mobile (sesuaikan implementasi)

## Prasyarat
- Git
- Node.js (opsional, jika proyek menggunakan Node)
- atau bahasa/stack lain yang sesuai dengan implementasi proyek (sesuaikan)

## Instalasi
1. Clone repository:

```bash
git clone https://github.com/Tsenkuu/jadwalsholat.git
cd jadwalsholat
```

2. Pasang dependensi (contoh untuk Node.js):

```bash
npm install
```

3. Siapkan konfigurasi (lihat bagian Konfigurasi)

## Konfigurasi
Buat file `.env` atau sesuaikan file konfigurasi sesuai implementasi aplikasi. Contoh variabel lingkungan:

```
LOCATION=Jakarta,ID
TIMEZONE=Asia/Jakarta
CALCULATION_METHOD=MuslimWorldLeague
API_KEY=
```

- LOCATION: Nama kota atau koordinat (latitude,longitude)
- TIMEZONE: Zona waktu untuk lokasi
- CALCULATION_METHOD: Metode perhitungan jadwal (mis. MuslimWorldLeague, UniversityOfIslamicSciences, dsb.)
- API_KEY: Jika menggunakan layanan pihak ketiga yang membutuhkan kunci API

## Penggunaan
Sesuaikan contoh-perintah berikut dengan implementasi proyek.

Menjalankan aplikasi (contoh Node.js):

```bash
npm start
```

Contoh penggunaan (pseudo-code):

```js
import { getPrayerTimes } from 'jadwalsholat'

const times = await getPrayerTimes({ location: 'Jakarta', date: '2026-01-08' })
console.log(times)
```

## Contoh output

```json
{
  "date": "2026-01-08",
  "location": "Jakarta, ID",
  "times": {
    "fajr": "04:30",
    "dhuhr": "11:45",
    "asr": "15:10",
    "maghrib": "18:00",
    "isha": "19:15"
  }
}
```

## Kontribusi
Terima kasih jika ingin berkontribusi! Silakan buka issue atau kirim pull request dengan deskripsi perubahan. Panduan singkat:
1. Fork repository
2. Buat branch fitur/bugfix: `git checkout -b fitur/nama-fitur`
3. Commit perubahan dan push
4. Buka Pull Request

## Lisensi
Proyek ini dilisensikan di bawah MIT License — lihat file LICENSE jika ada.

## Kontak
Jika ada pertanyaan atau masukan, silakan buka issue di repository atau hubungi pemilik repo.
