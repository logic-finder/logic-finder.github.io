// DOM 요소 참조
const $voiceShower = document.getElementById('voice-shower');
const $takeVoice = document.getElementById('take-voice');
const $takeDefaultVoice = document.getElementById('take-default-voice');
const $dataShower = document.getElementById('data-shower');
const $approxWaveShower = document.getElementById('approx-wave-shower');
const $approxVoiceShower = document.getElementById('approx-voice-shower');

// getUserMedia 관련
let getUserMediaFlag = false;

// 오디오 관련
let actx;
let analyser;
let audioData;
let dataSize;
let takenAudioData;
let sliceFrom;
let sliceTo;

// 내 목소리 파형
const raw = '{"length": 512,"0":126,"1":121,"2":121,"3":124,"4":129,"5":135,"6":140,"7":147,"8":153,"9":156,"10":152,"11":141,"12":125,"13":112,"14":106,"15":108,"16":113,"17":120,"18":127,"19":132,"20":138,"21":142,"22":141,"23":136,"24":126,"25":115,"26":106,"27":103,"28":105,"29":111,"30":117,"31":121,"32":123,"33":124,"34":124,"35":120,"36":112,"37":103,"38":97,"39":95,"40":96,"41":98,"42":101,"43":106,"44":112,"45":117,"46":117,"47":113,"48":105,"49":98,"50":93,"51":91,"52":91,"53":92,"54":93,"55":95,"56":97,"57":101,"58":105,"59":108,"60":106,"61":101,"62":96,"63":95,"64":97,"65":100,"66":100,"67":97,"68":94,"69":94,"70":99,"71":104,"72":106,"73":105,"74":104,"75":105,"76":108,"77":111,"78":112,"79":110,"80":108,"81":105,"82":105,"83":107,"84":110,"85":113,"86":114,"87":115,"88":116,"89":120,"90":123,"91":125,"92":124,"93":121,"94":120,"95":121,"96":123,"97":124,"98":124,"99":126,"100":128,"101":131,"102":133,"103":134,"104":134,"105":134,"106":134,"107":134,"108":134,"109":133,"110":132,"111":131,"112":131,"113":134,"114":137,"115":139,"116":141,"117":142,"118":143,"119":142,"120":142,"121":139,"122":136,"123":131,"124":128,"125":128,"126":131,"127":134,"128":137,"129":139,"130":140,"131":141,"132":142,"133":141,"134":137,"135":132,"136":126,"137":122,"138":123,"139":127,"140":132,"141":135,"142":135,"143":134,"144":134,"145":135,"146":134,"147":130,"148":125,"149":121,"150":120,"151":121,"152":124,"153":129,"154":132,"155":134,"156":134,"157":133,"158":131,"159":129,"160":128,"161":127,"162":125,"163":124,"164":123,"165":124,"166":125,"167":128,"168":130,"169":131,"170":132,"171":132,"172":131,"173":129,"174":129,"175":129,"176":130,"177":129,"178":129,"179":128,"180":129,"181":132,"182":134,"183":135,"184":134,"185":133,"186":131,"187":131,"188":131,"189":132,"190":134,"191":134,"192":134,"193":134,"194":137,"195":140,"196":142,"197":142,"198":141,"199":138,"200":136,"201":135,"202":137,"203":138,"204":137,"205":135,"206":134,"207":137,"208":142,"209":147,"210":148,"211":147,"212":146,"213":144,"214":144,"215":144,"216":144,"217":142,"218":138,"219":136,"220":137,"221":141,"222":145,"223":149,"224":150,"225":150,"226":150,"227":150,"228":150,"229":148,"230":145,"231":142,"232":142,"233":144,"234":146,"235":146,"236":146,"237":147,"238":150,"239":153,"240":153,"241":149,"242":145,"243":143,"244":141,"245":141,"246":142,"247":143,"248":143,"249":142,"250":144,"251":148,"252":153,"253":152,"254":142,"255":130,"256":123,"257":123,"258":127,"259":130,"260":132,"261":134,"262":139,"263":147,"264":154,"265":155,"266":148,"267":134,"268":119,"269":108,"270":106,"271":110,"272":115,"273":119,"274":124,"275":129,"276":136,"277":141,"278":141,"279":135,"280":125,"281":115,"282":108,"283":105,"284":105,"285":108,"286":111,"287":115,"288":119,"289":122,"290":121,"291":116,"292":110,"293":106,"294":104,"295":101,"296":98,"297":96,"298":98,"299":103,"300":110,"301":115,"302":116,"303":112,"304":104,"305":98,"306":95,"307":95,"308":94,"309":91,"310":88,"311":88,"312":94,"313":101,"314":107,"315":110,"316":107,"317":103,"318":100,"319":99,"320":99,"321":98,"322":95,"323":89,"324":87,"325":89,"326":96,"327":103,"328":107,"329":109,"330":110,"331":111,"332":113,"333":113,"334":110,"335":105,"336":102,"337":102,"338":104,"339":105,"340":107,"341":110,"342":115,"343":120,"344":123,"345":123,"346":122,"347":120,"348":120,"349":121,"350":123,"351":124,"352":123,"353":122,"354":122,"355":126,"356":133,"357":137,"358":136,"359":132,"360":128,"361":129,"362":134,"363":139,"364":139,"365":135,"366":131,"367":131,"368":135,"369":141,"370":144,"371":143,"372":140,"373":138,"374":138,"375":140,"376":142,"377":140,"378":136,"379":131,"380":130,"381":133,"382":138,"383":141,"384":141,"385":140,"386":140,"387":140,"388":139,"389":136,"390":132,"391":129,"392":128,"393":128,"394":129,"395":131,"396":133,"397":135,"398":136,"399":136,"400":135,"401":132,"402":129,"403":125,"404":123,"405":123,"406":125,"407":126,"408":126,"409":126,"410":128,"411":131,"412":133,"413":133,"414":130,"415":127,"416":125,"417":125,"418":125,"419":125,"420":125,"421":125,"422":125,"423":126,"424":129,"425":131,"426":132,"427":131,"428":128,"429":126,"430":126,"431":128,"432":129,"433":130,"434":130,"435":130,"436":132,"437":134,"438":136,"439":135,"440":133,"441":131,"442":129,"443":128,"444":129,"445":130,"446":132,"447":134,"448":136,"449":138,"450":140,"451":142,"452":143,"453":142,"454":140,"455":137,"456":135,"457":134,"458":134,"459":134,"460":134,"461":135,"462":137,"463":139,"464":143,"465":147,"466":148,"467":147,"468":146,"469":145,"470":144,"471":141,"472":139,"473":137,"474":136,"475":137,"476":139,"477":142,"478":145,"479":149,"480":150,"481":151,"482":152,"483":152,"484":151,"485":146,"486":141,"487":138,"488":140,"489":145,"490":147,"491":146,"492":145,"493":147,"494":152,"495":157,"496":156,"497":151,"498":145,"499":140,"500":137,"501":139,"502":143,"503":147,"504":147,"505":144,"506":143,"507":146,"508":152,"509":152,"510":143,"511":129}';
const parsed = JSON.parse(raw);
const arrayfied = Array.from(parsed);

// voiceShower 캔버스
const vscctx = $voiceShower.getContext('2d');
const vscw = $voiceShower.clientWidth;
const vsch = $voiceShower.height;

function showVoice() {
  window.requestAnimationFrame(showVoice);

  vscctx.clearRect(0, 0, vscw, vsch);

  analyser.getByteTimeDomainData(audioData);

  vscctx.beginPath();
  vscctx.strokeStyle = 'black';

  const interval = vscw / dataSize;
  let x = 0;

  for (let i = 0; i < dataSize; i++) {
    const y = (vsch / 2) - 100 * ((audioData[i] / 128) - 1);

    if (i === 0) vscctx.moveTo(x, y);
    else vscctx.lineTo(x, y);

    x += interval;
  }

  vscctx.stroke();

  vscctx.beginPath();
  vscctx.strokeStyle = 'gray';
  vscctx.moveTo(0, vsch / 2 + 0.5);
  vscctx.lineTo(vscw, vsch / 2 + 0.5);
  vscctx.stroke();
}

// 데이터 취득 및 확인
const dscctx = $dataShower.getContext('2d');
const dscw = $dataShower.width;
const dsch = $dataShower.height;

function drawTakenAudioData() {
  dscctx.clearRect(0, 0, dscw, dsch);

  dscctx.beginPath();
  dscctx.strokeStyle = 'black';
  dscctx.lineWidth = 1;

  const interval = dscw / dataSize;
  let x = 0;
  
  for (let i = 0; i < dataSize; i++) {
    const y = (dsch / 2) - 100 * ((takenAudioData[i] / 128) - 1);

    if (i === 0) dscctx.moveTo(x, y);
    else dscctx.lineTo(x, y);

    x += interval;
  }

  dscctx.stroke();

  dscctx.beginPath();
  dscctx.strokeStyle = 'gray';
  dscctx.moveTo(0, dsch / 2 + 0.5);
  dscctx.lineTo(dscw, dsch / 2 + 0.5);
  dscctx.stroke();

  for (let i = 0; i < 16; i++) {
    dscctx.beginPath();
    dscctx.strokeStyle = 'gray';
    dscctx.moveTo(i * 32 + 0.5, 0);
    dscctx.lineTo(i * 32 + 0.5, dsch);
    dscctx.stroke();

    dscctx.fillText(`${i * 32}`, i * 32, dsch - 10);
  }

  for (let i = 0; i < 16; i++) {
    dscctx.beginPath();
    dscctx.lineWidth = 0.25;
    dscctx.strokeStyle = 'gray';
    dscctx.moveTo(16 + i * 32 + 0.5, 0);
    dscctx.lineTo(16 + i * 32 + 0.5, dsch);
    dscctx.stroke();
  }
}

$takeVoice.addEventListener('click', (e) => {
  if (getUserMediaFlag) {
    takenAudioData = Array.from(audioData);

    drawTakenAudioData();
  } else {
    throw new Error('마이크가 활성화되지 않았습니다. Microphone is not activated.')
  }
});

$takeDefaultVoice.addEventListener('click', (e) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  actx = new AudioContext({ sampleRate: 44100 });
  analyser = new AnalyserNode(actx, { fftSize: 1024, maxDecibels: -30, minDecibels: -100, smoothingTimeConstant: 0.8 });

  dataSize = analyser.frequencyBinCount;
  audioData = new Uint8Array(dataSize);
  takenAudioData = arrayfied;

  drawTakenAudioData();
});

// 푸리에 계수
function integrate(start, end, division, f) {
  if (division < 1) throw new Error('분할 갯수는 1 미만일 수 없습니다.');

  let sum = 0;
  const STEP = 1 / division;

  for (let t = start; t < end; t += STEP) {
    sum += f(t) * STEP;
  }

  return sum;
}

class Coef {
  constructor(num = 99) {
    this.num = num;
    this.a0 = undefined;
    this.an = [];
    this.bn = [];
    this.w = undefined;
  }

  getA0(f, period, division) {
    this.a0 = (1 / period) * integrate(0, period, division, (t) => f(t));
    this.w = 2 * Math.PI * (1 / period);
  }

  getAn(f, period, division) {
    const w = 2 * Math.PI / period;

    for (let n = 1; n <= this.num; n++) {
      const anValue = (2 / period) * integrate(0, period, division, (t) => f(t) * Math.cos(n * w * t));
      
      this.an.push(anValue);
    }

    this.w = 2 * Math.PI * (1 / period);
  }

  getBn(f, period, division) {
    const w = 2 * Math.PI / period;

    for (let n = 1; n <= this.num; n++) {
      const bnValue = (2 / period) * integrate(0, period, division, (t) => f(t) * Math.sin(n * w * t));

      this.bn.push(bnValue);
    }

    this.w = 2 * Math.PI * (1 / period);
  }

  f(t) {
    let anSum = 0;
    let bnSum = 0;

    for (let i = 0; i < this.num; i++) {
      anSum += this.an[i] * Math.cos((i + 1) * this.w * t);
      bnSum += this.bn[i] * Math.sin((i + 1) * this.w * t);
    }

    const result = this.a0 + anSum + bnSum;

    return result;
  }
}

// 파동 근사
const awscctx = $approxWaveShower.getContext('2d');
const awscw = $approxWaveShower.width;
const awsch = $approxWaveShower.height;

function approxWave(coef) {
  awscctx.clearRect(0, 0, awscw, awsch);

  awscctx.beginPath();
  awscctx.strokeStyle = 'black';

  const range = sliceTo - sliceFrom;
  const interval = awscw / range;
  let x = 0;

  for (let i = 0; i < range; i++) {
    const y = (awsch / 2) - 100 * coef.f(i);

    if (i === 0) awscctx.moveTo(x, y);
    else awscctx.lineTo(x, y);

    x += interval;
  }

  awscctx.stroke();

  awscctx.beginPath();
  awscctx.strokeStyle = 'gray';
  awscctx.moveTo(0, awsch / 2 + 0.5);
  awscctx.lineTo(awscw, awsch / 2 + 0.5);
  awscctx.stroke();
}

// 근사 파동 재현
const avscctx = $approxVoiceShower.getContext('2d');
const avscw = $approxVoiceShower.width;
const avsch = $approxVoiceShower.height;

function showReproducedVoice() {
  window.requestAnimationFrame(showReproducedVoice);

  avscctx.clearRect(0, 0, avscw, avsch);

  analyser.getByteTimeDomainData(audioData);

  avscctx.beginPath();
  avscctx.strokeStyle = 'black';

  const interval = avscw / dataSize;
  let x = 0;

  for (let i = 0; i < dataSize; i++) {
    const y = (avsch / 2) - 100 * ((audioData[i] / 128) - 1);

    if (i === 0) avscctx.moveTo(x, y);
    else avscctx.lineTo(x, y);

    x += interval;
  }

  avscctx.stroke();

  avscctx.beginPath();
  avscctx.strokeStyle = 'gray';
  avscctx.moveTo(0, avsch / 2 + 0.5);
  avscctx.lineTo(avscw, avsch / 2 + 0.5);
  avscctx.stroke();
}