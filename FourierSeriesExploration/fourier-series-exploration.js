const $toTheTopBtn = document.getElementById('to-the-top');
const height = document.querySelector('html').scrollTop;

const upwardEasingInOut = (initial, t) => {
  return initial - height / (1 + Math.E ** (-t + 10));
}

$toTheTopBtn.addEventListener('click', (e) => {
  const current = window.scrollY;

  let count = 0;
  const ti = setInterval(() => {
    if (count < 30) {
      window.scrollTo(0, upwardEasingInOut(current, 0.67 * count));
      count++;
    } else if (count === 30) {
      window.scrollTo(0, Math.ceil(upwardEasingInOut(current, 20)));
      clearInterval(ti);
    }
  }, 30);
});