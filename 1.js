// === BAGIAN BAGUS ===
// Bertanggung jawab atas Data, Variabel Global, dan API

// 1. Daftar Kota
const citiesEastJava = [
    "Bangkalan", "Banyuwangi", "Batu", "Blitar", "Bojonegoro", "Bondowoso",
    "Gresik", "Jember", "Jombang", "Kediri", "Lamongan", "Lumajang",
    "Madiun", "Magetan", "Malang", "Mojokerto", "Nganjuk", "Ngawi",
    "Pacitan", "Pamekasan", "Pasuruan", "Ponorogo", "Probolinggo",
    "Sampang", "Sidoarjo", "Situbondo", "Sumenep", "Surabaya",
    "Trenggalek", "Tuban", "Tulungagung"
];

// 2. Global State (Variabel yang dipakai bersama)
let currentCity = 'Tulungagung';
const COUNTRY = 'Indonesia';
let prayerTimes = {};
let selectedDateObj = new Date(); // Default hari ini

// 3. Referensi Elemen DOM (Supaya file lain bisa pakai)
const elHijri = document.getElementById('hijri-date');
const elList = document.getElementById('prayer-list');
const elNextName = document.getElementById('next-prayer-name');
const elCountdown = document.getElementById('countdown');
const elClock = document.getElementById('realtime-clock');
const elLoader = document.getElementById('loading-indicator');
const elCitySelector = document.getElementById('city-selector');
const elDateSelector = document.getElementById('date-selector');
const elTodayView = document.getElementById('today-view');
const elOtherDateView = document.getElementById('other-date-view');
const elSelectedDateDisplay = document.getElementById('selected-date-display');

// 4. Fungsi Fetch Data API
async function fetchJadwal() {
    elLoader.classList.remove('hidden');
    
    // Memanggil helper format tanggal dari Moyo.js (pastikan Moyo diload)
    const dateStr = formatDateForAPI(selectedDateObj);
    const API_URL = `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${currentCity}&country=${COUNTRY}&method=20`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if(data.code === 200) {
            const timings = data.data.timings;
            const dateInfo = data.data.date;

            // Update Info Tanggal Hijriyah
            elHijri.textContent = `${dateInfo.hijri.day} ${dateInfo.hijri.month.en} ${dateInfo.hijri.year} H`;

            // Simpan data sholat ke variabel global
            prayerTimes = {
                'Subuh': timings.Fajr,
                'Dzuhur': timings.Dhuhr,
                'Ashar': timings.Asr,
                'Maghrib': timings.Maghrib,
                'Isya': timings.Isha
            };

            // Panggil fungsi UI dari Febi.js
            renderList();
            updateViewMode(); 
        } else {
            alert("Gagal mengambil data jadwal.");
        }
    } catch (error) {
        console.error(error);
        elList.innerHTML = `<div class="bg-red-50 text-red-600 p-3 rounded-xl text-center text-sm">Gagal koneksi ke API.<br>Cek internet anda.</div>`;
    } finally {
        elLoader.classList.add('hidden');
    }
}