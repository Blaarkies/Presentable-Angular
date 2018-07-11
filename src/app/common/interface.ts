export interface InfoCard {
  title: string;
  subtitle: string;
  data: string | Function;
}

export interface EntropyExample {
  text: string;
  artist: string;
  name: string;
  lines?: string[];
  entropyScore?: number;
  entropyFraction?: number;
  charsUsed?: string[];
  charsUsedLength?: number;
  asciiFraction?: number;
}

export interface JsonAsset {
  low: EntropyExample;
  medium: EntropyExample;
  high: EntropyExample;
  asciiImage: AsciiImage
}

export interface AsciiImage {
  width: number;
  text: string;
  lines?: FlaggedText[];
  encoded?: FlaggedText[];
  entropyScore?: number;
  entropyFraction?: number;
}

export interface FlaggedText {
  text: string;
  id: number;
}

export interface HuffmanCode {
  char: string;
  index: string;
  path: string;
  usages: number;
}

export enum Routes {
  main,
  decorators,
  compression,
}

