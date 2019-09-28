"use strict";
exports.__esModule = true;
/**
 * @description Simple API to draw on canvas
 */
var draw = /** @class */ (function () {
    /** @description Init canvas and context */
    function draw(canvas) {
        /** @description Standart color */
        this.color = "#000";
        /** @description Do you need to stroke */
        this.stroke = false;
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    }
    /** @description Draw simple rect */
    draw.prototype.rect = function (x, y, width, height, color) {
        if (color === void 0) { color = this.color; }
        if (this.stroke) {
            this.context.fillStyle = color;
            this.context.fillRect(x, y, width, height);
        }
        else {
            this.context.fillStyle = color;
            this.context.fillRect(x, y, width, height);
        }
    };
    /** @description Draw simple line */
    draw.prototype.line = function (x0, y0, x1, y1, color) {
        if (color === void 0) { color = this.color; }
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.stroke();
        this.context.closePath();
    };
    /** @description Draw simple point */
    draw.prototype.point = function (x, y, color) {
        if (color === void 0) { color = this.color; }
        this.context.fillStyle = color;
        this.context.fillRect(x, y, 1, 1);
    };
    return draw;
}());
exports.draw = draw;
