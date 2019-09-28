var canvas = (document.getElementById("canvas"));
var context = canvas.getContext("2d");
var expressionElement = (document.getElementById("expression"));
var expression;
expressionElement.addEventListener("keyup", function (event) {
    if (event.key != "ArrowLeft" && event.key != "ArrowRight")
        calculate();
});
var scale = 1;
window.addEventListener("keydown", function (event) {
    if (event.key == "ArrowUp")
        scale = +(scale + 0.1).toFixed(1);
    if (event.key == "ArrowDown" && scale > 0.1)
        scale = +(scale - 0.1).toFixed(1);
    if (event.key == "ArrowUp" || event.key == "ArrowDown")
        calculate();
});
var width = canvas.width;
var scaled = function (x) { return x * scale; };
calculate();
function clear() {
    context.fillStyle = "#FFF";
    context.fillRect(0, 0, width, canvas.height);
}
function drawLine(x0, y0, x1, y1, color) {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
    context.closePath();
}
function fillRect(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, 1, 1);
}
function evalX(x) {
    var y;
    eval(expression);
    return y;
}
function evalXY(x, y) {
    return eval(expression);
}
function calculate() {
    try {
        expression = expressionElement.value;
        clear();
        for (var row = 0; row <= 10; row++)
            drawLine(0, scaled((row - 5) * 100) + width / 2, width, scaled((row - 5) * 100) + width / 2, "#4CAF50");
        for (var column = 0; column <= 10; column++)
            drawLine(scaled((column - 5) * 100) + width / 2, 0, scaled((column - 5) * 100) + width / 2, width, "#4CAF50");
        if (typeof (eval(expression)) == "boolean") {
            for (var x = -(width / scale) / 2; x < (width / scale) / 2; x += 1 / scale) {
                for (var y = -(width / scale) / 2; y < (width / scale) / 2; y += 1 / scale) {
                    var z = evalXY(x, y);
                    if (z) {
                        fillRect(scaled(x) + width / 2, -scaled(y) + width / 2, "#388E3C");
                    }
                }
            }
        }
        else {
            for (var x = -(width / scale) / 2; x < (width / scale) / 2; x += 1 / scale) {
                drawLine(scaled(x) + width / 2, -scaled(evalX(x)) + width / 2, scaled(x + 1 / scale) + width / 2, -scaled(evalX(x + 1 / scale)) + width / 2, "#388E3C");
            }
        }
        expressionElement.style.setProperty("color", "#388E3C");
    }
    catch (e) {
        expressionElement.style.setProperty("color", "#D32F2F");
    }
}
