import { Slot } from "./Slot";
import config from "../config";

class SlotGame {
  private config: Slot;

  constructor(config: Slot) {
    this.config = config;
  }

  private getSymbol(reelIndex: number, rowIndex: number): number {
    const symbolsCount = Object.keys(this.config.symbols).length;
    const reel = this.config.reels[reelIndex];
    const symbolIndex = reel[rowIndex];

    return (symbolIndex % symbolsCount) + 1;
  }

  private linePayout(line: number[]): number {
    let symbol = -1;
    let count = 0;

    for (let i = 0; i < line.length; i++) {
      const rowIndex = line[i];
      const currentSymbol = this.getSymbol(i, rowIndex);

      if (symbol === -1) {
        symbol = currentSymbol;
        count = 1;
      } else if (symbol === currentSymbol) {
        count++;
      } else {
        break;
      }
    }

    if (symbol === -1) {
      return 0;
    }

    return this.config.symbols[symbol][count - 1];
  }

  private totalPayout(): number {
    let payout = 0;

    for (let i = 0; i < this.config.lines.length; i++) {
      payout += this.linePayout(this.config.lines[i]);
    }

    return payout;
  }

  public spin(): void {
    const positions: number[][] = [];

    for (let i = 0; i < this.config.reelsCount; i++) {
      const position: number[] = [];

      for (let x = 0; x < this.config.rowsCount; x++) {
        const symbol = this.getSymbol(i, x);
        position.push(symbol);
      }

      positions.push(position);
    }

    const payoutToPrint = this.totalPayout();

    console.table(positions);
    console.log(`Payout: ${payoutToPrint}`);
  }
}

const slotGame = new SlotGame(config);
slotGame.spin();
