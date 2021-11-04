const $audio1 = document.querySelector('#audio1');
const $audio2 = document.querySelector('#audio2');
const $playOriginalBtn = document.querySelector('#play-original');
const $stopOriginalBtn = document.querySelector('#stop-original');
const $playAppliedBtn = document.querySelector('#play-applied');
const $stopAppliedBtn = document.querySelector('#stop-applied');

$playOriginalBtn.addEventListener('click', playOriginal);
$stopOriginalBtn.addEventListener('click', stopOriginal);
$playAppliedBtn.addEventListener('click', playApplied);
$stopAppliedBtn.addEventListener('click', stopApplied);

function playOriginal(e) {
  $audio1.play();
}

function stopOriginal(e) {
  $audio1.pause();
  $audio1.currentTime = 0;
}

function playApplied(e) {
  const audioCtx = new AudioContext();

  audioCtx.audioWorklet.addModule('AudioWorkletProcessor.js')
    .then(() => {
      const source = audioCtx.createMediaElementSource($audio2);
      const fanNode = new AudioWorkletNode(audioCtx, 'fan-processor');

      source.connect(fanNode).connect(audioCtx.destination);
      $audio2.play();
    })
    .catch((err) => console.error(err));
}

function stopApplied(e) {
  $audio2.pause();
  $audio2.currentTime = 0;
}