import { Symbol } from "./Symbol";

export interface Slot {
  reelsCount: number;
  rowsCount: number;
  symbols: Symbol;
  lines: number[][];
  reels: number[][];
}
