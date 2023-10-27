let inactivityTimer;
const inactivityTimeout = 300000

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(logout, inactivityTimeout);
}

function logout() {
    window.location.href = "/logout";
  console.log('Logged out due to inactivity');
}

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keydown', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);

resetInactivityTimer();

