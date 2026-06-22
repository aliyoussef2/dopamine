/* ======================================
   DOPAMINE -- Splash Screen Controller
   js/splash.js
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;

  setTimeout(() => {
    splash.classList.add('fade-out');
    setTimeout(() => splash.remove(), 550);
  }, 3500);
});
