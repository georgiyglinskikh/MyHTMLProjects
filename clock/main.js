var canvas = (document.getElementById("canvas"));
var context = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
function clear() {
    context.fillStyle = "#FFF";
    context.fillRect(0, 0, width, height);
}
function drawLine(x0, y0, x1, y1, color) {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
    context.closePath();
}
var toRad = function (angle) { return angle * Math.PI / 180; };
function displayTime() {
    clear();
    var now = new Date();
    var sec = now.getSeconds();
    drawLine(width / 2, height / 2, Math.cos(toRad(sec * 6 - 90)) * width / 2 + width / 2, Math.sin(toRad(sec * 6 - 90)) * height / 2 + height / 2, "#000");
    var min = now.getMinutes();
    drawLine(width / 2, height / 2, Math.cos(toRad(min * 6 - 90)) * width / 3 + width / 2, Math.sin(toRad(min * 6 - 90)) * height / 3 + height / 2, "#000");
    var hour = now.getHours();
    drawLine(width / 2, height / 2, Math.cos(toRad(hour * 30 - 90)) * width / 4 + width / 2, Math.sin(toRad(hour * 30 - 90)) * height / 4 + height / 2, "#000");
}
setInterval(displayTime, 1);
