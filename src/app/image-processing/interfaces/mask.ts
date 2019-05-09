export class MaskPixel {
  x: number;
  y: number;
  value? = 1;
}

export class Mask {

  pixels: MaskPixel[];

  constructor(pixels?: MaskPixel[]) {
    this.pixels = pixels || <MaskPixel[]>[{x: 0, y: 0}];
  }

}
