// 캔버스
const $cvs = document.getElementById('oscillator');
const cctx = $cvs.getContext('2d');

window.requestAnimationFrame(draw);

// 그리기 함수
const offset = { x: 400, y: 100 };
const drawLineOffset = 200;
const scaler = 200;
const period = 360;
let deg = 0;
const amplitudes = [(1 / (1 * Math.PI)),
                    (1 / (3 * Math.PI)),
                    (1 / (5 * Math.PI)),
                    (1 / (7 * Math.PI)),
                    (1 / (9 * Math.PI))];
const path = [];
const drawCount = 200;

function draw() {
  window.requestAnimationFrame(draw);

  // 초기화
  cctx.clearRect(0, 0, $cvs.width, $cvs.height);

  const v = { x: 0, y: 0 };

  for (let n = 0; n < amplitudes.length; n++) {
    cctx.beginPath();
    cctx.strokeStyle = 'lightgray';
    const radius = scaler * amplitudes[n];
    cctx.arc(offset.x + v.x, offset.y + v.y, Math.abs(radius), 0, 2 * Math.PI);
    cctx.stroke();

    cctx.beginPath();
    cctx.strokeStyle = 'black';
    cctx.moveTo(offset.x + v.x, offset.y + v.y);
    v.x += scaler * amplitudes[n] * Math.cos((2 * n + 1) * 2 * Math.PI * deg / period);
    v.y += scaler * amplitudes[n] * Math.sin((2 * n + 1) * 2 * Math.PI * deg / period);
    cctx.lineTo(offset.x + v.x, offset.y + v.y);
    cctx.stroke();
  }

  cctx.beginPath();
  cctx.strokeStyle = 'silver';
  cctx.moveTo(offset.x + v.x, offset.y + v.y);
  cctx.lineTo(drawLineOffset, offset.y + v.y);
  cctx.stroke();

  if (path.length === drawCount) path.shift();
  path.push({ x: drawLineOffset, y: v.y });

  cctx.beginPath();
  cctx.strokeStyle = 'blue';
  for (let i = 0; i < path.length; i++) {
    if (i === 0) cctx.moveTo(path[path.length - 1].x, offset.y + path[path.length - 1].y);
    else cctx.lineTo(path[path.length - 1 - i].x - i, offset.y + path[path.length - 1 - i].y);
  }
  cctx.stroke();
  
  if (deg === period - 1) {
    deg = 0;
  } else {
    deg++;
  }
}