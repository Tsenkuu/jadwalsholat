// === BAGIAN BAGUS ===
// Bertanggung jawab Inisialisasi Event Listener dan Menjalankan Aplikasi

function initEventListeners() {
    // Set default input tanggal ke hari ini (pakai helper Moyo)
    elDateSelector.value = formatDateForInput(new Date());

    // Event saat Ganti Kota
    elCitySelector.addEventListener('change', (e) => {
        currentCity = e.target.value; // Update variabel di Bagus.js
        fetchJadwal(); // Ambil data ulang
    });

    // Event saat Ganti Tanggal
    elDateSelector.addEventListener('change', (e) => {
        if(e.target.value) {
            selectedDateObj = new Date(e.target.value); // Update variabel di Bagus.js
            fetchJadwal(); // Ambil data ulang
        }
    });
}

// === MAIN EXECUTION ===
// Ini yang menjalankan semuanya pertama kali

// 1. Isi dropdown kota (Febi)
initCityOptions();

// 2. Pasang event listener (Pixel)
initEventListeners();

// 3. Jalankan jam realtime (Moyo)
setInterval(updateRealtimeClock, 1000);
updateRealtimeClock();

// 4. Ambil data awal (Bagus)
fetchJadwal();

// 5. Cek update sholat tiap menit khusus hari ini (Moyo)
setInterval(() => {
    if(isToday(selectedDateObj)) updateNextPrayerLogic();
}, 60000);

console.log("Aplikasi Jadwal Sholat Siap! - Kelompok 4 Orang");