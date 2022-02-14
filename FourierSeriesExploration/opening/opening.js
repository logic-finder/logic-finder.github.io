const $et = document.getElementById('example-text');
let changeCounter = 0;

const $exampleText = new Proxy($et, {
  set(target, prop, val) {
    changeCounter++;

    if (changeCounter === 2) {
      target[prop] = `${val} (근데 두 번씩이나 바꾸다니 호기심이 많으시군요!)`;
    } else {
      target[prop] = val;
    }
    
    return true;
  }
});