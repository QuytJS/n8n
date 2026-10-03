/* ====== TÙY CHỈNH TẠI ĐÂY ====== */
const CONFIG = {
  name: "Hồng",   // tên cô ấy (hoặc link ?ten=Ten)
  from: ".....",   // tên bạn (hoặc link &tu=Ten)
  msg1: "Sinh nhật vui vẻ, tuổi mới người yêu mới",
  msg2: "Do dự trời tối mất!!!",
  places: ["Cho trời tối luôn", "Không quan tâm", "Đi dạo & ăn tối", "Không rảnh"],
  webhookUrl: "http://localhost:5678/webhook/f6f30659-bb0b-4464-a83e-0506ce23f477"
};
/* ================================ */
const $ = id => document.getElementById(id);
const q = new URLSearchParams(location.search);
const name = q.get('ten') || CONFIG.name, from = q.get('tu') || CONFIG.from;
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
document.title = `Happy Birthday ${name} 🎂`;
$('hello').textContent = `Gửi ${name},`;
$('msg1').textContent = CONFIG.msg1; $('msg2').textContent = CONFIG.msg2;
$('sign').textContent = `— ${from}`;

/* bunting */
const flagCols = ['#dc3a45', '#ffc94d', '#7ddcc4', '#ff7fa0', '#fdf0d6'];
const n = Math.ceil(innerWidth / 58) + 1;
for (let i = 0; i < n; i++) {
  const f = document.createElement('i'); f.className = 'flag';
  f.style.background = flagCols[i % 5]; f.style.animationDelay = (-i * .4) + 's'; $('bunting').appendChild(f);
}

/* title */
const lines = ['Happy', 'Birthday']; const tc = ['#fdf0d6', '#ffc94d', '#7ddcc4', '#ff7fa0', '#fff'];
let k = 0;
lines.forEach(w => {
  const r = document.createElement('span'); r.className = 'row'; r.style.animation = 'none';
  [...w].forEach(ch => {
    const s = document.createElement('span'); s.textContent = ch; s.style.color = tc[k % 5];
    s.style.animationDelay = `${8.4 + k * .13}s,${10.6 + k * .15}s`; k++; r.appendChild(s);
  });
  $('title').appendChild(r);
});

/* balloons & stars */
const bal = [['6%', '58%', '#dc3a45'], ['86%', '52%', '#ffc94d'], ['14%', '12%', '#7ddcc4'], ['78%', '14%', '#ff7fa0'], ['92%', '78%', '#dc3a45']];
bal.forEach(([l, t, c], i) => {
  const b = document.createElement('div'); b.className = 'balloon';
  Object.assign(b.style, { left: l, top: t, background: c, animationDelay: (-i * .8) + 's' }); $('deco').appendChild(b);
});
const st = [['10%', '34%', '22px'], ['30%', '20%', '16px'], ['70%', '28%', '18px'], ['88%', '40%', '24px'], ['22%', '80%', '18px'], ['62%', '84%', '16px'], ['48%', '12%', '14px']];
st.forEach(([l, t, s], i) => {
  const e = document.createElement('span'); e.className = 'star'; e.textContent = '✦';
  Object.assign(e.style, { left: l, top: t, fontSize: s, animationDelay: (-i * .5) + 's' }); $('deco').appendChild(e);
});

/* thêm nền: vòng tròn lớn + đồ chơi bay */
[['-80px', '8%', 300], ['auto', '55%', 220, '-70px'], ['38%', '-110px', 260]].forEach(([l, t, w, r]) => {
  const e = document.createElement('div'); e.className = 'ring'; Object.assign(e.style, { width: w + 'px', height: w + 'px', top: t, left: l });
  if (r) { e.style.right = r; e.style.left = 'auto' } $('deco').appendChild(e);
});
[['🎁', '4%', '78%', '2.6rem'], ['🧁', '82%', '66%', '2.4rem'], ['🍭', '24%', '6%', '2rem'], ['🎀', '66%', '8%', '2rem'], ['🍰', '46%', '88%', '2.4rem'], ['🌸', '94%', '30%', '1.8rem'], ['⭐', '2%', '36%', '1.8rem']].forEach(([c, l, t, f], i) => {
  const e = document.createElement('span'); e.className = 'emo'; e.textContent = c;
  Object.assign(e.style, { left: l, top: t, fontSize: f, animationDelay: (-i * .6) + 's' }); $('deco').appendChild(e);
});

/* hearts */
function heart() {
  if (reduce || document.hidden) return;
  const h = document.createElement('span'); h.className = 'heart'; h.textContent = '♥';
  h.style.left = Math.random() * 100 + 'vw'; h.style.fontSize = (10 + Math.random() * 14) + 'px';
  h.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
  h.style.animationDuration = (6 + Math.random() * 5) + 's';
  document.body.appendChild(h); setTimeout(() => h.remove(), 11500);
}
setInterval(heart, 450);

/* chips & date */
function chips(el, items, g) {
  items.forEach((t, i) => {
    const l = document.createElement('label'); l.className = 'chip';
    l.innerHTML = `<input type="radio" name="${g}" value="${t}" ${i ? '' : 'checked'}><span>${t}</span>`; el.appendChild(l);
  });
}
chips($('places'), CONFIG.places, 'place');
const d = new Date(); d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7));
const iso = x => { const z = new Date(x.getTime() - x.getTimezoneOffset() * 6e4); return z.toISOString().slice(0, 10) };
$('date').value = iso(d); $('date').min = iso(new Date());

/* confetti */
const cv = $('fx'), cx = cv.getContext('2d'); let bits = [], raf = null;
function size() { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio }
addEventListener('resize', size); size();
function burst(nn = 140) {
  if (reduce) return;
  const cols = ['#dc3a45', '#ffc94d', '#7ddcc4', '#ff7fa0', '#ffffff'];
  for (let i = 0; i < nn; i++)bits.push({
    x: innerWidth / 2, y: innerHeight * .5, vx: (Math.random() - .5) * 15, vy: -Math.random() * 14 - 3,
    s: Math.random() * 8 + 4, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: cols[i % 5], life: 1
  });
  if (!raf) raf = requestAnimationFrame(tick);
}
function tick() {
  cx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); cx.clearRect(0, 0, innerWidth, innerHeight);
  bits.forEach(b => {
    b.vy += .35; b.x += b.vx; b.y += b.vy; b.vx *= .99; b.r += b.vr; b.life -= .008;
    cx.save(); cx.globalAlpha = Math.max(b.life, 0); cx.translate(b.x, b.y); cx.rotate(b.r);
    cx.fillStyle = b.c; cx.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2); cx.restore();
  });
  bits = bits.filter(b => b.life > 0 && b.y < innerHeight + 40);
  raf = bits.length ? requestAnimationFrame(tick) : null;
  if (!raf) cx.clearRect(0, 0, innerWidth, innerHeight);
}

/* mở thiệp: hiện ngay trên màn hình */
const stage = document.querySelector('.stage');
function openCard() { stage.classList.add('on'); $('card').classList.add('on'); burst(); $('close').focus({ preventScroll: true }) }
function closeCard() { if (!stage.classList.contains('on')) return; stage.classList.remove('on'); $('open').classList.remove('lit') }
$('open').addEventListener('click', () => {
  if ($('open').classList.contains('lit')) return;
  $('open').classList.add('lit');
  setTimeout(openCard, reduce ? 0 : 1100);
});
$('close').addEventListener('click', closeCard);
stage.addEventListener('click', e => { if (e.target === stage) closeCard() });
addEventListener('keydown', e => { if (e.key === 'Escape') closeCard() });

/* nút né */
let dodges = 0; const no = $('no');
function dodge(e) {
  if (dodges >= 6) return; e.preventDefault(); dodges++;
  const box = $('actions').getBoundingClientRect(), b = no.getBoundingClientRect();
  no.style.transform = `translate(${(Math.random() - .5) * Math.min(box.width - b.width, 200)}px,${Math.random() * 40 + 8}px)`;
  if (dodges === 3) no.textContent = 'Bấm thử lần nữa xem';
  if (dodges >= 6) { no.textContent = 'Thôi, mình đồng ý vậy 😄'; no.style.transform = 'none'; no.onclick = () => $('yes').click(); }
}
no.addEventListener('pointerenter', dodge); no.addEventListener('pointerdown', dodge);

/* đồng ý */
$('yes').addEventListener('click', () => {
  const dt = new Date($('date').value + 'T00:00:00');
  const ds = isNaN(dt) ? '' : dt.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' });
  const time = $('time').value || '--:--';
  const place = document.querySelector('input[name=place]:checked')?.value || 'Bất ngờ';

  // Gửi webhook sang n8n qua HTTP GET request
  if (CONFIG.webhookUrl) {
    const params = new URLSearchParams({
      name: name,
      from: from,
      date: ds,
      time: time,
      place: place
    });
    try {
      fetch(`${CONFIG.webhookUrl}?${params.toString()}`, { mode: 'no-cors' });
    } catch (err) {
      console.error('Webhook error:', err);
    }
  }

  $('invite').style.display = 'none';
  $('done').classList.add('on');
  burst(200);
});

/* chú thích polaroid */
$('cap').textContent = `Mèo con gửi hoa cho ${name} 🌷`;

/* đồng hồ mèo: kim quay theo giờ đã chọn */
let ah = 0, am = 0; const near = (p, t) => t + 360 * Math.round((p - t) / 360);
const part = h => h < 11 ? 'buổi sáng' : h < 14 ? 'buổi trưa' : h < 18 ? 'buổi chiều' : h < 22 ? 'buổi tối' : 'khuya';
function setClock() {
  const v = $('time').value; if (!v) return; const [h, m] = v.split(':').map(Number);
  ah = near(ah, (h % 12) * 30 + m * .5); am = near(am, m * 6);
  $('hh').style.transform = `rotate(${ah}deg)`; $('mh').style.transform = `rotate(${am}deg)`;
  $('tod').textContent = `${part(h)} 🐾`;
  const c = $('cc'); c.classList.remove('ding'); void c.getBoundingClientRect(); c.classList.add('ding');
}
$('time').addEventListener('input', setClock); $('time').addEventListener('change', setClock); setClock();
