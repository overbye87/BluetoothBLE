import { Buffer } from 'buffer';

export const toBase64 = (input: string) =>
  Buffer.from(input, 'utf-8').toString('base64');

export const fromBase64 = (encoded: string) =>
  Buffer.from(encoded, 'base64').toString('utf-8');

export const base64ToHex = (str: string) =>
  Buffer.from(str, 'base64').toString('hex');
