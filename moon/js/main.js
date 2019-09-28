var canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('canvas'));
var canvasContext = canvas.getContext('2d');

const drawLine = (x0, y0, x1, y1, color) => {
    canvasContext.beginPath();
    canvasContext.moveTo(x0, y0);
    canvasContext.strokeStyle = color;
    canvasContext.lineTo(x1, y1);
    canvasContext.stroke();
    canvasContext.closePath();
};

const moonG = 1.67;

const speed = (FPS) => ((1 / FPS) * moonG) / 10;

var isFly = false;

var isFlyLeft, isFlyRight;

document.addEventListener('keydown', (event) => {
    if (event.key == ' ')
        isFly = true;
    if (event.key == 's')
        isFly = false;

    if (event.key == 'a') {
        isFlyRight = false;
        isFlyLeft = true;
    }
    if (event.key == 'd') {
        isFlyRight = true;
        isFlyLeft = false;
    }
    if (event.key == 'w') {
        isFlyRight = false;
        isFlyLeft = false;
    }
});

class Base {
    static finishCoords = [];
    draw() {
        for (let i = 0; i < this.pointsArray.length - 1; i++)
            drawLine(this.pointsArray[i].x, this.pointsArray[i].y, this.pointsArray[i + 1].x, this.pointsArray[i + 1].y, '#f00');
    }
    constructor(baseX) {
        var base = (baseX - baseX % 40);
        this.pointsArray = [
            {
                x: Moon.pointsArray[base / 40].x,
                y: Moon.pointsArray[base / 40].y
            },
            {},
            {
                x: Moon.pointsArray[base / 40 + 1].x,
                y: Moon.pointsArray[base / 40 + 1].y,
            }
        ];
        if (Moon.pointsArray[base / 40].y > Moon.pointsArray[base / 40 + 1].y) {
            this.pointsArray[1] = {
                x: Moon.pointsArray[base / 40].x,
                y: Moon.pointsArray[base / 40 + 1].y
            }
        }
        else {
            this.pointsArray[1] = {
                x: Moon.pointsArray[base / 40 + 1].x,
                y: Moon.pointsArray[base / 40].y
            }
        }
        this.finishCoords = this.pointsArray[0];
    }
}

class Ship {
    update() {
        this.V.y += isFly ? -1 * speed(60) : speed(60);
        if (this.V.x != 0)
            this.V.x += this.V.x > 0 ? -1 * speed(30) : speed(30);

        if (isFlyLeft)
            this.V.x -= speed(29);
        if (isFlyRight)
            this.V.x += speed(29); 

        this.x += this.V.x;
        this.y += this.V.y;
    }
    draw() {
        canvasContext.fillStyle = '#0f0';
        canvasContext.fillRect(this.x, this.y, 20, 15);
    }
    constructor() {
        this.x = 10;
        this.y = 10;
        this.V = { x: 0, y: 0 };
    }
}

class Moon {
    static pointsArray = [];
    generate() {
        for (let i = 0; i <= canvas.width / 40; i++)
            Moon.pointsArray.push({ x: i * 40, y: canvas.height - 90 - Math.random() * 75 })
    }
    update() {
        this.ship.update();
    }
    draw() {
        for (let i = 0; i < Moon.pointsArray.length - 1; i++)
            drawLine(Moon.pointsArray[i].x, Moon.pointsArray[i].y, Moon.pointsArray[i + 1].x, Moon.pointsArray[i + 1].y, '#666');

        this.base.draw();
        this.ship.draw();
    }
    constructor() {
        Moon.pointsArray = [];
        this.generate();
        this.ship = new Ship();
        this.base = new Base(320);
    }
}

class Game {
    run() {
        var interval = setInterval(() => {
            // Updating
            this.moon.update();

            // Clear canvas
            canvasContext.fillStyle = '#000';
            canvasContext.fillRect(0, 0, canvas.width, canvas.height);

            // Drawing
            this.moon.draw();
        }, 1000 / 60);
    }
    constructor() {
        this.moon = new Moon();
    }
}

var game = new Game();
game.run();