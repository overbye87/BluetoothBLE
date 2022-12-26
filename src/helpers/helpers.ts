import { config } from '../config';

export const scale = (n: number): number => Math.round(n * config.scaleFactor);

export const getTrottle = (x: number, y: number): { l: number, r: number } => {
  let limX = x;
  let limY = y;

  const radious = Math.sqrt(x * x + y * y);

  if (radious > 1) {
    const angle = Math.atan2(x, y);
    const angleX = Math.sin(angle);
    const angleY = Math.cos(angle);
    limX = angleX;
    limY = angleY;
  }

  const l = (limY + limX) / Math.sqrt(2);
  const r = (limY - limX) / Math.sqrt(2);

  // console.log(Math.round(l * 100), Math.round(r * 100));

  return {
    l: Math.round(l * 100),
    r: Math.round(r * 100),
  };
};
