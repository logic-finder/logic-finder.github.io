const $et = document.getElementById('example-text');
let changeCounter = 0;

const $exampleText = new Proxy($et, {
  set(target, prop, val) {
    changeCounter++;

    if (changeCounter === 2) {
      target[prop] = `${val} (I suppose you have a lot of curiosity, since you changed the text twice!)`;
    } else {
      target[prop] = val;
    }
    
    return true;
  }
});