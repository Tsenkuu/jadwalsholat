// === BAGIAN ISMOYO ===
// Bertanggung jawab atas Logika Waktu, Format Tanggal, dan Countdown

let countdownInterval;

// Helper: Format Date ke DD-MM-YYYY untuk API
function formatDateForAPI(date) {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

// Helper: Format Date ke YYYY-MM-DD untuk Input HTML
function formatDateForInput(date) {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${y}-${m}-${d}`;
}

// Helper: Cek apakah tanggal yang dipilih adalah Hari Ini
function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

// Update Jam Realtime
function updateRealtimeClock() {
  const now = new Date();
  if (elClock)
    elClock.textContent = now.toLocaleTimeString("id-ID", { hour12: false });
}

// Logic untuk menentukan sholat berikutnya
function updateNextPrayerLogic() {
  if (!isToday(selectedDateObj)) return; // Hanya jalan jika hari ini

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeMin = currentHours * 60 + currentMinutes;

  let foundNext = false;
  let nextName = "Subuh";
  let nextTimeStr = "";

  // Mengakses prayerTimes dari Bagus.js
  const prayers = Object.entries(prayerTimes);

  // Reset highlight (memanipulasi DOM sedikit, tapi logicnya disini)
  document
    .querySelectorAll(".prayer-item")
    .forEach((el) => el.classList.remove("active"));

  for (let i = 0; i < prayers.length; i++) {
    const [name, timeStr] = prayers[i];
    const [h, m] = timeStr.split(":").map(Number);
    const prayerTimeMin = h * 60 + m;

    if (prayerTimeMin > currentTimeMin) {
      nextName = name;
      nextTimeStr = timeStr;
      foundNext = true;

      // Highlight list item yang sesuai
      const activeEl = document.querySelector(
        `.prayer-item[data-name="${name}"]`
      );
      if (activeEl) activeEl.classList.add("active");
      break;
    }
  }

  // Jika lewat Isya, target besok Subuh
  if (!foundNext && prayers.length > 0) {
    nextName = "Subuh";
    nextTimeStr = prayerTimes["Subuh"];

    const activeEl = document.querySelector(`.prayer-item[data-name="Subuh"]`);
    if (activeEl) activeEl.classList.add("active");
  }

  if (elNextName) elNextName.textContent = nextName;

  if (nextTimeStr) {
    startCountdown(nextTimeStr, foundNext);
  }
}

// Logic Hitung Mundur
function startCountdown(targetTimeStr, isTargetToday) {
  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const now = new Date();
    const target = new Date();
    const [h, m] = targetTimeStr.split(":").map(Number);

    target.setHours(h, m, 0, 0);

    if (!isTargetToday) {
      // Target besok
      target.setDate(target.getDate() + 1);
    }

    const diff = target - now;

    if (diff <= 0) {
      clearInterval(countdownInterval);
      updateNextPrayerLogic(); // Cari jadwal baru
      return;
    }

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (elCountdown) {
      elCountdown.textContent = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  }, 1000);
}
