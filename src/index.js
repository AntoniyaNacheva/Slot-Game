"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var SlotGame = /** @class */ (function () {
    function SlotGame(config) {
        this.config = config;
    }
    SlotGame.prototype.getSymbol = function (reelIndex, rowIndex) {
        var symbolsCount = Object.keys(this.config.symbols).length;
        var reel = this.config.reels[reelIndex];
        var symbolIndex = reel[rowIndex];
        return (symbolIndex % symbolsCount) + 1;
    };
    SlotGame.prototype.linePayout = function (line) {
        var symbol = -1;
        var count = 0;
        for (var i = 0; i < line.length; i++) {
            var rowIndex = line[i];
            var currentSymbol = this.getSymbol(i, rowIndex);
            if (symbol === -1) {
                symbol = currentSymbol;
                count = 1;
            }
            else if (symbol === currentSymbol) {
                count++;
            }
            else {
                break;
            }
        }
        if (symbol === -1) {
            return 0;
        }
        return this.config.symbols[symbol][count - 1];
    };
    SlotGame.prototype.totalPayout = function () {
        var payout = 0;
        for (var i = 0; i < this.config.lines.length; i++) {
            payout += this.linePayout(this.config.lines[i]);
        }
        return payout;
    };
    SlotGame.prototype.spin = function () {
        var positions = [];
        for (var i = 0; i < this.config.reelsCount; i++) {
            var position = [];
            for (var x = 0; x < this.config.rowsCount; x++) {
                var symbol = this.getSymbol(i, x);
                position.push(symbol);
            }
            positions.push(position);
        }
        var payoutToPrint = this.totalPayout();
        console.table(positions);
        console.log("Payout: ".concat(payoutToPrint));
    };
    return SlotGame;
}());
var slotGame = new SlotGame(config_1.default);
slotGame.spin();
