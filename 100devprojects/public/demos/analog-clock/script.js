/* ─── STAR GENERATION ──────────────────────────────────── */
(function generateStars(){
    const container = document.getElementById('stars');
    const count = 120;
    const fragment = document.createDocumentFragment();
    for(let i=0; i<count; i++){
        const star = document.createElement('div');
        const size = Math.random() * 2 + 0.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dur = (Math.random() * 4 + 2).toFixed(1);
        const delay = (Math.random() * -6).toFixed(1);
        const minOp = (Math.random() * 0.1 + 0.05).toFixed(2);
        const maxOp = (Math.random() * 0.5 + 0.3).toFixed(2);

        star.className = 'star';
        star.style.cssText = `left:${x}%; top:${y}%; width:${size}px; height:${size}px; --dur:${dur}s; --delay:${delay}s;--min-op:${minOp}; --max-op:${maxOp};`
        fragment.appendChild(star);
    }
    container.appendChild(fragment);
})();
/* ─── TICK MARKS & NUMBERS ─────────────────────────────── */
(function buildDial(){
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const cx = 150, cy = 150, r = 128;
    const ticksGroup = document.getElementById('ticks');
    const numbersGroup = document.getElementById('numbers');
    const hourLabels = [12,1,2,3,4,5,6,7,8,9,10,11];
    for(let i=0; i<60; i++){
        const angle = (i/60) * 2 * Math.PI - Math.PI / 2;
        const isMajor = i % 5 ===0;
        const innerR = isMajor ? r - 14 : r - 7;
        const outerR = r-2;

        const x1 = cx + Math.cos(angle) * innerR;
        const y1 = cy + Math.sin(angle) * innerR;
        const x2 = cx + Math.cos(angle) * outerR;
        const y2 = cy + Math.sin(angle) * outerR;

        const tick = document.createElementNS(SVG_NS, 'line');
        tick.setAttribute('x1', x1.toFixed(2));
        tick.setAttribute('y1', y1.toFixed(2));
        tick.setAttribute('x2', x2.toFixed(2));
        tick.setAttribute('y2', y2.toFixed(2));
        tick.setAttribute('stroke',       isMajor ? '#b0c4e0' : '#3a4a6a');
        tick.setAttribute('stroke-width', isMajor ? '2'       : '0.8');
        tick.setAttribute('stroke-linecap', 'round');
        ticksGroup.appendChild(tick);

        /* Hour numbers — skip 3 (i===15), replaced by date complication */
        if (isMajor && i !== 15) {
          const numR   = r - 28;
          const nx     = cx + Math.cos(angle) * numR;
          const ny     = cy + Math.sin(angle) * numR;
          const label  = hourLabels[i / 5];

          const text = document.createElementNS(SVG_NS, 'text');
          text.setAttribute('x',            nx.toFixed(2));
          text.setAttribute('y',            ny.toFixed(2));
          text.setAttribute('text-anchor',  'middle');
          text.setAttribute('dominant-baseline', 'central');
          text.setAttribute('fill',         '#c8daf0');
          text.setAttribute('font-size',    '13');
          text.setAttribute('font-family',  'Orbitron, sans-serif');
          text.setAttribute('font-weight',  '400');
          text.textContent = label;
          numbersGroup.appendChild(text);
        }
    }
})();
/* ─── MOUSE PARALLAX ────────────────────────────────────── */
const clockScene = document.querySelector('.clock-scene');
const MAX_TILT = 8;
let mouseX = 0, mouseY = 0;
let tiltX = 0, tiltY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
});
document.addEventListener('mouseleave', () => { mouseX = 0; mouseY = 0; });
document.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    mouseX = (t.clientX / window.innerWidth) * 2 - 1;
    mouseY = (t.clientY / window.innerHeight) * 2 - 1;
}, { passive: true });
document.addEventListener('touchend', () => { mouseX = 0; mouseY = 0; });

function lerp(a, b, t) { return a + (b - a) * t; }

/* ─── CLOCK ENGINE ─────────────────────────────────────── */
const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');
const digTime = document.getElementById('dig-time');
const digDate = document.getElementById('dig-date');
const digDay = document.getElementById('dig-day');
const svgDate = document.getElementById('svg-date');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function padTwo(n){
    return String(n).padStart(2, '0');
}
function updateClock(){
    const now = new Date();
    const hrs = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const ms = now.getMilliseconds();

    const smoothSec = sec + ms / 1000;

    const secDeg = smoothSec * 6;
    const minDeg = (min + smoothSec / 60) * 6;
    const hrDeg = ((hrs % 12) + min / 60 + sec / 3600) * 30;

    hourHand.style.transform = `rotate(${hrDeg}deg)`;
    minuteHand.style.transform = `rotate(${minDeg}deg)`;
    secondHand.style.transform = `rotate(${secDeg}deg)`;

    const h12 = hrs % 12 || 12;
    const ampm = hrs >=12 ? 'PM' : 'AM';
    digTime.textContent = `${padTwo(h12)}:${padTwo(min)}:${padTwo(sec)} ${ampm}`;
    digDate.textContent = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    digDay.textContent = days[now.getDay()];
    svgDate.textContent = padTwo(now.getDate());
}

function loop(){
    updateClock();
    tiltX = lerp(tiltX, -mouseY * MAX_TILT, 0.06);
    tiltY = lerp(tiltY, mouseX * MAX_TILT, 0.06);
    clockScene.style.transform = `rotateX(${tiltX.toFixed(3)}deg) rotateY(${tiltY.toFixed(3)}deg)`;
    requestAnimationFrame(loop);
}

loop();