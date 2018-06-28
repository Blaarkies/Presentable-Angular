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
}

export interface JsonAsset {
  low: EntropyExample;
  medium: EntropyExample;
  high: EntropyExample;
}

export enum Routes {
  main,
  decorators,
  compression,
}
