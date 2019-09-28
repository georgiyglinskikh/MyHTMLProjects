const canvas = <HTMLCanvasElement>(document.querySelector("#canvas"));
const context = canvas.getContext("2d");

type vector = [number, number];

function line(start: vector, finish: vector, color: string) {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(start[0], start[1]);
    context.lineTo(finish[0], finish[1]);
    context.stroke();
    context.closePath();
}

function rect(position: vector, size: vector, color: string, stroke: boolean = false) {
    if (stroke) {
        context.strokeStyle = color;
        context.strokeRect(position[0], position[1], size[0], size[1]);
    } else {
        context.fillStyle = color;
        context.fillRect(position[0], position[1], size[0], size[1]);
    }
}

type cube = { position: vector, speed: vector, size: vector, jump: number };

const G = 9.81, Scale = 10, FPS = 60;

const A = G / FPS / Scale;

const toCoof = (coord) => {
    if(coord > canvas.width / 2) {
        return 2 * coord - canvas.width;
    } else if(coord < canvas.width / 2) {
        return -(canvas.width - 2 * coord);
    } else {
        return 0;
    }
}

const cube0: cube = { position: [0, 0], speed: [0, 0], size: [10, 10], jump: 0.75 };
const point: vector = [canvas.width / 2, canvas.height / 2];

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            point[1]--;
            break;
        case "a":
            point[0]--;
            break;
        case "s":
            point[1]++;
            break;
        case "d":
            point[0]++;
            break;

    }
})

function update() {
    // Clear canvas
    rect([0, 0], [canvas.width, canvas.height], "#fff");

    // Draw
    rect(cube0.position, cube0.size, "#00f");
    rect(point, [1, 1], "#f00");

    // Update
    var Ax = A * (toCoof(point[0])), Ay = A * (toCoof(point[1]));

    if(cube0.position[0] >= canvas.width - cube0.size[0] || cube0.position[0] < 0) {
        cube0.speed[0] = -cube0.speed[0] * cube0.jump;
    } else {
        cube0.speed[0] += Ax;
    }

    if(cube0.position[1] >= canvas.height - cube0.size[1] || cube0.position[1] < 0) {
        cube0.speed[1] = -cube0.speed[1] * cube0.jump;
    } else {
        cube0.speed[1] += Ay;
    }

    cube0.position[0] += cube0.speed[0];
    cube0.position[1] += cube0.speed[1];
}

var loop = setInterval(update, 1000 / FPS);
