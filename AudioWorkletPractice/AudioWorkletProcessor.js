class FanProcessor extends AudioWorkletProcessor {
  constructor () {
    super();
    this.deg = 0;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    try {
      for (let channel = 0; channel < output.length; channel++) {
        for (let i = 0; i < output[channel].length; i++) {
          output[channel][i] = input[channel][i] * Math.sin(this.deg * Math.PI / 180);

          if (this.deg < 359) this.deg += 0.05;
          else this.deg = 0;
        }
      }
    } catch {}

    return true;
  }
}

registerProcessor('fan-processor', FanProcessor);