/** @description Simple API to draw on canvas */
export class draw {
    /** @description Main canvas */ 
    canvas: HTMLCanvasElement;

    /** @description Canvas Context */ 
    context: CanvasRenderingContext2D;


    /** @description Init canvas and context */ 
    constructor(canvas: HTMLCanvasElement) 

    /** @description Standart color */
    color: string;

    /** @description Do you need to stroke */
    stroke: string;

    /** @description Draw simple rect */
    rect(x: number, y: number, width: number, height: number, color: string)

    /** @description Draw simple line */
    line(x0: number, y0: number, x1: number, y1: number, color: string) 

    /** @description Draw simple point */
    point(x: number, y: number, color: string) 
}