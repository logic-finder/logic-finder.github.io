// || DOM 객체 참조
// input
const $file = document.getElementById('file');
const $speedInput = document.getElementById('speed-input');
const $pitchInput = document.getElementById('pitch-input');
const $timeInput = document.getElementById('time-input');
const $filterInput = document.getElementById('filter-input');

// button
const $preparation = document.getElementById('preparation');
const $reverseProcess = document.getElementById('reverse-process');
const $speedProcess = document.getElementById('speed-process');
const $pitchProcess = document.getElementById('pitch-process');
const $timeProcess = document.getElementById('time-process');
const $filterProcess = document.getElementById('filter-process');

// audio
const $reverse = document.getElementById('reverse');
const $speed = document.getElementById('speed-control');
const $pitch = document.getElementById('pitch-shifter');
const $time = document.getElementById('time-stretcher');
const $filter = document.getElementById('filter');

// 변수 선언
let actx;

// || 오디오 컨텍스트 활성화
function activateAudioContext() {
  actx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 44100 });
  console.log('AudioContext 준비 완료');
}

$preparation.addEventListener('click', activateAudioContext);

// || 프로세싱 스크립트
// 역재생
async function process_reverse() {
  const audioData = await actx.decodeAudioData(await $file.files[0].arrayBuffer());
  const original = audioData.getChannelData(0);
  const audioBuffer = new AudioBuffer({ length: original.length, sampleRate: actx.sampleRate });
  const buffering = audioBuffer.getChannelData(0);

  for (let i = 0; i < audioBuffer.length; i++) {
    buffering[i] = original[original.length - 1 - i];
  }

  const url = window.URL.createObjectURL(audioBufferToWav(audioBuffer));

  $reverse.setAttribute('src', url);
}

$reverseProcess.addEventListener('click', process_reverse);

// 속도 조절
async function process_speed() {
  const audioData = await actx.decodeAudioData(await $file.files[0].arrayBuffer());
  const original = audioData.getChannelData(0);
  const arr = [];
  const step = Number($speedInput.value) ?? 1;

  for (let i = 0; i < original.length; i += step) {
    arr.push(original[Math.floor(i)]);
  }

  const f32Arr = Float32Array.from(arr);
  const audioBuffer = new AudioBuffer({ length: f32Arr.length, numberOfChannels: 1, sampleRate: actx.sampleRate });

  audioBuffer.copyToChannel(f32Arr, 0);

  const url = window.URL.createObjectURL(audioBufferToWav(audioBuffer));

  $speed.setAttribute('src', url);
}

$speedProcess.addEventListener('click', process_speed);

// 낱알 합성 - 재생 시간 유지, 음높이 변경
async function process_pitch() {
  const audioData = await actx.decodeAudioData(await $file.files[0].arrayBuffer());
  const original = audioData.getChannelData(0);
  const arr = [];
  const grainSize = 2000;
  const pitch = Number($pitchInput.value) ?? 1;

  for (let i = 0; i < original.length; i += grainSize) {
    for (let j = 0, k = 0; j < grainSize; j++, k += pitch) {
      arr.push(original[Math.floor(i + k)]);
      if (k >= grainSize - pitch) k = -pitch;
    }
  }

  const f32Arr = Float32Array.from(arr);
  const audioBuffer = new AudioBuffer({ length: f32Arr.length, numberOfChannels: 1, sampleRate: actx.sampleRate });

  audioBuffer.copyToChannel(f32Arr, 0);

  const url = window.URL.createObjectURL(audioBufferToWav(audioBuffer));

  $pitch.setAttribute('src', url);
}

$pitchProcess.addEventListener('click', process_pitch);

// 낱알 합성 - 음높이 유지, 재생 시간 변경
async function process_time() {
  const audioData = await actx.decodeAudioData(await $file.files[0].arrayBuffer());
  const original = audioData.getChannelData(0);
  const arr = [];
  const grainSize = 2000;
  const speed = Number($timeInput.value) ?? 1;
  const L = Math.floor(grainSize / speed);
  
  if (speed > 1) {
    for (let i = 0; i < original.length; i += grainSize) {
      for (let j = 0; j < L; j++) {
        const v = original[i + j];
        arr.push(v);
      }
    }
  } else {
    for (let i = 0; i < original.length; i += grainSize) {
      for (let j = 0, k = 0; j < L; j++, k++) {
        const v = original[i + k];
        arr.push(v);
        if (k === grainSize - 1) k = -1;
      }
    }
  }

  const f32Arr = Float32Array.from(arr);
  const audioBuffer = new AudioBuffer({ length: f32Arr.length, numberOfChannels: 1, sampleRate: actx.sampleRate });

  audioBuffer.copyToChannel(f32Arr, 0);

  const url = window.URL.createObjectURL(audioBufferToWav(audioBuffer));

  $time.setAttribute('src', url);
}

$timeProcess.addEventListener('click', process_time);

// 간단한 필터
async function process_filter() {
  const audioData = await actx.decodeAudioData(await $file.files[0].arrayBuffer());
  const original = audioData.getChannelData(0);
  const num = Number($filterInput.value) ?? 1;
  const arr = new Array(original.length - (num - 1));

  function local_mean(i) {
    let sum = 0;
  
    for (let j = 0; j < num; j++) {
      sum += original[i + j];
    }
  
    return sum / num;
  }
  
  for (let i = 0; i < arr.length; i++) {
    arr[i] = local_mean(i);
  }

  const f32Arr = Float32Array.from(arr);
  const audioBuffer = new AudioBuffer({ length: f32Arr.length, numberOfChannels: 1, sampleRate: actx.sampleRate });

  audioBuffer.copyToChannel(f32Arr, 0);

  const url = window.URL.createObjectURL(audioBufferToWav(audioBuffer));

  $filter.setAttribute('src', url);
}

$filterProcess.addEventListener('click', process_filter);

// || wav 파일 작성
function audioBufferToWav(audioBuffer) {
  const length = audioBuffer.length * 2 + 44; // 샘플 1개가 2바이트를 쓰므로
  const arrayBuffer = new ArrayBuffer(length);
  const dataView = new DataView(arrayBuffer);

  dataView.setUint8(0, 82); // R
  dataView.setUint8(1, 73); // I
  dataView.setUint8(2, 70); // F
  dataView.setUint8(3, 70); // F
  dataView.setUint32(4, length - 8, true); // 청크 크기
  dataView.setUint8(8, 87); // W
  dataView.setUint8(9, 65); // A
  dataView.setUint8(10, 86); // V
  dataView.setUint8(11, 69); // E
  dataView.setUint8(12, 102); // f
  dataView.setUint8(13, 109); // m
  dataView.setUint8(14, 116); // t
  dataView.setUint8(15, 32); // 공백
  dataView.setUint32(16, 16, true); // 청크 크기
  dataView.setUint16(20, 1, true); // 오디오 포맷
  dataView.setUint16(22, 1, true); // 채널 수
  dataView.setUint32(24, audioBuffer.sampleRate, true); // 샘플 레이트
  dataView.setUint32(28, 2 * audioBuffer.sampleRate, true); // 바이트 레이트
  dataView.setUint16(32, 2 , true); // block align
  dataView.setUint16(34, 16, true); // 비트 깊이
  dataView.setUint8(36, 100); // d
  dataView.setUint8(37, 97); // a
  dataView.setUint8(38, 116); // t
  dataView.setUint8(39, 97); // a
  dataView.setUint32(40, length - 44, true); // 소리 데이터 크기

  const audioData = audioBuffer.getChannelData(0);
  let sample;
  
  for (let i = 44, j = 0; i < length; i += 2, j++) {
    sample = audioData[j] * 32768;
    dataView.setInt16(i, sample, true);
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}