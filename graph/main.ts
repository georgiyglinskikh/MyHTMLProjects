const canvas = <HTMLCanvasElement>(document.getElementById("canvas"));
const context = canvas.getContext("2d");

const expressionElement = <HTMLInputElement>(document.getElementById("expression"));

var expression: string;

expressionElement.addEventListener("keyup", (event: KeyboardEvent) => {
    if (event.key != "ArrowLeft" && event.key != "ArrowRight")
        calculate();
});

var scale: number = 1;

window.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key == "ArrowUp")
        scale = +(scale + 0.1).toFixed(1);
    if (event.key == "ArrowDown" && scale > 0.1)
        scale = +(scale - 0.1).toFixed(1);

    if (event.key == "ArrowUp" || event.key == "ArrowDown")
        calculate();
});

var width = canvas.width;

const scaled = (x: number) => x * scale;

calculate();

function clear() {
    context.fillStyle = "#FFF";
    context.fillRect(0, 0, width, canvas.height);
}

function drawLine(x0: number, y0: number, x1: number, y1: number, color: string) {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
    context.closePath();
}

function fillRect(x: number, y: number, color: string) {
    context.fillStyle = color;
    context.fillRect(x, y, 1, 1);
}

function evalX(x: number): number {
    let y: number;
    eval(expression);
    return y;
}

function evalXY(x: number, y: number): boolean {
    return eval(expression);
}

function calculate() {
    try {
        expression = expressionElement.value;

        clear();
        
        for (let row = 0; row <= 10; row++)
            drawLine(0, scaled((row - 5) * 100) + width / 2, width, scaled((row - 5) * 100) + width / 2, "#4CAF50");

        for (let column = 0; column <= 10; column++)
            drawLine(scaled((column - 5) * 100) + width / 2, 0, scaled((column - 5) * 100) + width / 2, width, "#4CAF50");

        if (typeof (eval(expression)) == "boolean") {
            for (let x = -(width / scale) / 2; x < (width / scale) / 2; x += 1 / scale) {
                for (let y = -(width / scale) / 2; y < (width / scale) / 2; y += 1 / scale) {
                    let z = <boolean>evalXY(x, y);
                    if (z) {
                        fillRect(scaled(x) + width / 2, -scaled(y) + width / 2, "#388E3C");
                    }
                }
            }
        } else {
            for (let x = -(width / scale) / 2; x < (width / scale) / 2; x += 1 / scale) {
                drawLine(
                    scaled(x) + width / 2,
                    -scaled(<number>evalX(x)) + width / 2,
                    scaled(x + 1 / scale) + width / 2,
                    -scaled(<number>evalX(x + 1 / scale)) + width / 2,
                    "#388E3C"
                );
            }
        }

        expressionElement.style.setProperty("color", "#388E3C");
    }
    catch (e) {
        expressionElement.style.setProperty("color", "#D32F2F");
    }
}