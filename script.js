const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
const FPS = 60;
const G = 9.8;
const totalRain = Math.round((window.innerWidth + window.innerHeight) / 5);
var rainDrops = [];
cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

class Rain {
    constructor() {
        this.r = 5 + Math.random() * 5;
        this.x = Math.random() * (cnv.width - this.r * 2) + this.r;
        this.y = Math.random() * (cnv.height - this.r);
        this.color = 160 + Math.round(Math.random() * 95);
        this.force = Math.random() * (G / 2);
    };

    rainDraw() {
        ctx.strokeStyle = "#0000" + this.color.toString(16);
        ctx.fillStyle = "#0000" + this.color.toString(16);
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.r * 5);
        ctx.lineTo(this.x + this.r, this.y);
        ctx.arc(this.x, this.y, this.r, 0, Math.PI,);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    };

    rainMotion() {
        this.y += G + this.force;
        if (this.y - this.r * 5 > cnv.height) {
            this.r = 5 + Math.random() * 5;
            this.x = Math.random() * (cnv.width - this.r * 2) + this.r;
            this.y = 0 - this.r;
            this.color = 160 + Math.round(Math.random() * 95);
            this.force = Math.random() * (G / 2);
        };
    };
};

(function init() {
    for (let drop = 0; drop < totalRain; drop++) {
        rainDrops.push(new Rain());
    };
    setInterval(main, 1000 / FPS);
}());

function main() {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;

    for (let drop = 0; drop < rainDrops.length; drop++) {
        rainDrops[drop].rainDraw();
        rainDrops[drop].rainMotion();
    };
};