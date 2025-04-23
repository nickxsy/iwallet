import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number = 500) {
  return new Promise(resolve => {
    console.log('sleep');
    setTimeout(resolve, ms);
  });
}
