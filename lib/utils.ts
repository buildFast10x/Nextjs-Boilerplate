import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import configEnv from "@/config"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${configEnv.nextEnv || "http://localhost:3000"
    }${path}`;
}