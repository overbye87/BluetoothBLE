import { config } from '../config';

export const scale = (n: number): number => Math.round(n * config.scaleFactor);
