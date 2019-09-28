var canvas = <HTMLCanvasElement>(document.getElementById("canvas"));
var context = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

function clear() {
    context.fillStyle = "#FFF";
    context.fillRect(0, 0, width, height);
}

function drawLine(x0: number, y0: number, x1: number, y1: number, color: string) {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
    context.closePath();
}

const toRad = (angle: number): number => angle * Math.PI / 180;

function displayTime() {
    clear();
    let now = new Date();
    let sec = now.getSeconds();
    drawLine(width / 2, height / 2, Math.cos(toRad(sec * 6 - 90)) * width / 2 + width / 2,
        Math.sin(toRad(sec * 6 - 90)) * height / 2 + height / 2, "#000");
    let min = now.getMinutes();
    drawLine(width / 2, height / 2, Math.cos(toRad(min * 6 - 90)) * width / 3 + width / 2,
        Math.sin(toRad(min * 6 - 90)) * height / 3 + height / 2, "#000");
    let hour = now.getHours();
    drawLine(width / 2, height / 2, Math.cos(toRad(hour * 30 - 90)) * width / 4 + width / 2,
        Math.sin(toRad(hour * 30 - 90)) * height / 4 + height / 2, "#000");
}

setInterval(displayTime, 1);