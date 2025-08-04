// window-manager.js
let zCounter = 1000;

export function bringToFront(domElement) {
  zCounter++;
  domElement.style.zIndex = zCounter;
}
// Make every .floating-window draggable with mouse + touch
document.querySelectorAll('.floating-window').forEach(el => {
  let isDown = false, startX, startY, origX, origY;

  // Mouse events
  el.addEventListener('mousedown', e => {
    e.preventDefault();
    isDown = true;
    startX = e.clientX;
    startY = e.clientY;
    origX  = el.offsetLeft;
    origY  = el.offsetTop;
  });

  document.addEventListener('mousemove', e => {
    if (!isDown) return;
    el.style.left = origX + (e.clientX - startX) + 'px';
    el.style.top  = origY + (e.clientY - startY) + 'px';
  });

  document.addEventListener('mouseup', () => {
    isDown = false;
  });

  // Touch events (passive: false so preventDefault() works)
  el.addEventListener('touchstart', e => {
    e.preventDefault();
    const t = e.touches[0];
    isDown = true;
    startX = t.clientX;
    startY = t.clientY;
    origX  = el.offsetLeft;
    origY  = el.offsetTop;
  }, { passive: false });

  document.addEventListener('touchmove', e => {
    if (!isDown) return;
    e.preventDefault();
    const t = e.touches[0];
    el.style.left = origX + (t.clientX - startX) + 'px';
    el.style.top  = origY + (t.clientY - startY) + 'px';
  }, { passive: false });

  document.addEventListener('touchend', () => {
    isDown = false;
  }, { passive: false });
});
