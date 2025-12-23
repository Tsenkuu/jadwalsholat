// === BAGIAN FEBI ===
// Bertanggung jawab atas Tampilan (UI) dan Render HTML

// Populate Opsi Kota di Dropdown
function initCityOptions() {
    // Menggunakan citiesEastJava dari Bagus.js
    citiesEastJava.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        if (city === currentCity) option.selected = true;
        elCitySelector.appendChild(option);
    });
}

// Render List Jadwal Sholat
function renderList() {
    elList.innerHTML = '';
    
    // Menggunakan prayerTimes dari Bagus.js
    Object.keys(prayerTimes).forEach(name => {
        const time = prayerTimes[name];
        
        const div = document.createElement('div');
        div.className = `prayer-item flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100`;
        div.dataset.name = name; 
        
        div.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span class="font-semibold text-gray-700">${name}</span>
            </div>
            <span class="font-bold text-gray-900 font-mono text-lg">${time}</span>
        `;
        elList.appendChild(div);
    });
}

// Mengatur Mode Tampilan (Countdown vs Info Tanggal Statis)
function updateViewMode() {
    // Menggunakan fungsi helper isToday dari Moyo.js
    const isCurrentDay = isToday(selectedDateObj);

    if (isCurrentDay) {
        // Tampilkan Mode Countdown
        elTodayView.classList.remove('hidden');
        elOtherDateView.classList.add('hidden');
        updateNextPrayerLogic(); // Panggil logic Moyo
    } else {
        // Tampilkan Mode Info Statis
        elTodayView.classList.add('hidden');
        elOtherDateView.classList.remove('hidden');
        if(countdownInterval) clearInterval(countdownInterval);
        
        // Format tanggal display
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        elSelectedDateDisplay.textContent = selectedDateObj.toLocaleDateString('id-ID', options);

        // Hapus highlight aktif
        document.querySelectorAll('.prayer-item').forEach(el => el.classList.remove('active'));
    }
}