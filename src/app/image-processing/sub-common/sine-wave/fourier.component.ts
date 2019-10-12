export class FourierComponent {

  frequency: number;
  magnitude: number;
  phase: number;


  constructor(frequency: number, magnitude: number, phase: number) {
    this.frequency = frequency;
    this.magnitude = magnitude;
    this.phase = phase;
  }
}
