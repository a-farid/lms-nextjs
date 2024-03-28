import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextResponse } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function IsExist<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
