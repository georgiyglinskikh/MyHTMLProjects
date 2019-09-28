/**
 * @description Simple API to draw on canvas
 */
export class draw {
    /** @description Main canvas */ 
    canvas: HTMLCanvasElement;

    /** @description Canvas Context */ 
    context: CanvasRenderingContext2D;


    /** @description Init canvas and context */ 
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    }

    /** @description Standart color */
    color = "#000";

    /** @description Do you need to stroke */
    stroke = false;

    /** @description Draw simple rect */
    rect(x: number, y: number, width: number, height: number, color: string = this.color) {
        if (this.stroke) {
            this.context.fillStyle = color;
            this.context.fillRect(x, y, width, height);
        } else {
            this.context.fillStyle = color;
            this.context.fillRect(x, y, width, height);
        }
    }

    /** @description Draw simple line */
    line(x0: number, y0: number, x1: number, y1: number, color: string = this.color) {
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.stroke();
        this.context.closePath();
    }

    /** @description Draw simple point */
    point(x: number, y: number, color: string = this.color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, 1, 1);
    }
}