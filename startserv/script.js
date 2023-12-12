document.getElementById('starter').style.display = 'none';

// Gdy użytkownik kliknie przycisk, uruchom funkcję startServer()
document.getElementById('startServerButton').addEventListener('click', function () {
    startServer();
});

function startServer() {
    // Tutaj będzie Twoja logika do uruchomienia serwera.
    console.log('Uruchamianie serwera...');
    document.getElementById('starter').style.display = 'block';
    // Możesz dodać kod uruchamiający serwer, np. przez wysłanie żądania AJAX do backendu.
}

let mapBottom = [];
let mapTop = [];
let canvas = document.createElement('canvas');
let imgWidth;

function generateBackground() {
    console.log("Generowanie tła...");

    let img = new Image();
    img.src = 'BlockSpriteStripped.webp';

    img.onload = function () {
        let blockSize = 16;
        imgWidth = img.width/16;
        let zoom = 3;
        let blocks = [];

        for (let y = 0; y < img.height; y += blockSize) {
            for (let x = 0; x < img.width; x += blockSize) {
                blocks.push(getImageSlice(img, x, y, blockSize, blockSize));
            }
        }

        canvas.width = window.innerWidth / zoom;
        canvas.height = blockSize * 138;
        let context = canvas.getContext('2d');

        context.imageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;

        let index = 0;
        perlin.seed();
        context.fillStyle = '#81abff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        let seed = Math.random();
        for (let x = 0; x < canvas.width / (blockSize); x++) {
            mapTop[x] = [];
            mapBottom[x] = [];
            for (let y = 0; y < canvas.height / (blockSize); y++) {
                if (y > (8 + 5 * perlin.get(x * 0.1, seed))) setBlock(x, y, getBlockID(1, 1), true);
                else setBlock(x, y, -1, true);
            }
        }
        perlin.seed();
        seed = Math.random();
        for (let x = 0; x < canvas.width / (blockSize); x++) {
            let highest = 9999;
            for (let y = 0; y < canvas.height / (blockSize); y++) {
                if (mapTop[x][y] == 0 && highest == 9999) {
                    highest = y;
                    //dirt with grass
                    setBlock(x, y, getBlockID(3, 1), true);
                    //grass
                    if (perlin.get(x * 0.01, seed) > 0 && Math.random() > 0.8) setBlock(x, y - 1, getBlockID(1, 2), true);

                }
                else if (y > highest && y < highest + (perlin.get(x * 0.1, seed) + 1) * 2.5 + 1) {
                    mapTop[x][y] = getBlockID(2, 1);
                }
            }
        }

        //generateOre(0.1, 0.15, getBlockID(1, 1), getBlockID(16, 26), blockSize, zoom);  
        //generateOre(0.15, 0.4, getBlockID(1, 1), getBlockID(4, 1), blockSize, zoom);
        //generateOre(0.2, 0.45, getBlockID(1, 1), getBlockID(5, 1), blockSize, zoom);
        //generateOre(0.2, 0.45, getBlockID(1, 1), getBlockID(6, 1), blockSize, zoom);
        const rangeY = canvas.height / blockSize - 1;
        for (i = 0; i < 10; i++) generate(getBlockID(5, 1), randomIntFromInterval(6, 12), Math.floor(Math.random() * canvas.width / blockSize), Math.floor(Math.random() * rangeY));
        for (i = 0; i < 10; i++) generate(getBlockID(6, 1), randomIntFromInterval(3, 6), Math.floor(Math.random() * canvas.width / blockSize), Math.floor(Math.random() * rangeY/2));
        for (i = 0; i < 1; i++) generate(getBlockID(4, 2), randomIntFromInterval(3, 6), Math.floor(Math.random() * canvas.width / blockSize), Math.floor(Math.random() * rangeY/4));
        for (i = 0; i < 4; i++) generate(getBlockID(3, 2), randomIntFromInterval(3, 5), Math.floor(Math.random() * canvas.width / blockSize), Math.floor(Math.random() * rangeY/8));
        for (i = 0; i < 1; i++) generate(getBlockID(6, 2), randomIntFromInterval(3, 5), Math.floor(Math.random() * canvas.width / blockSize), Math.floor(Math.random() * rangeY/8));
        for (i = 0; i < 1; i++) generate(getBlockID(5, 2), randomIntFromInterval(2, 5), Math.floor(Math.random() * canvas.width / blockSize), Math.floor(Math.random() * rangeY/8)+Math.floor(Math.random() * rangeY/8));
        for (x=0; x < mapTop.length; x++) setBlock(x, mapTop[0].length-1, getBlockID(2, 2));
        for (x=0; x < mapTop.length; x++) if (Math.random() > 0.2) setBlock(x, mapTop[0].length-2, getBlockID(2, 2));
        for (x=0; x < mapTop.length; x++) if (Math.random() > 0.4) setBlock(x, mapTop[0].length-3, getBlockID(2, 2));
        for (x=0; x < mapTop.length; x++) if (Math.random() > 0.6) setBlock(x, mapTop[0].length-4, getBlockID(2, 2));
        for (x=0; x < mapTop.length; x++) if (Math.random() > 0.8) setBlock(x, mapTop[0].length-5, getBlockID(2, 2));


        for (let x = 0; x < canvas.width / (blockSize); x++) {
            for (let y = 0; y < canvas.height / (blockSize); y++) {
                setTimeout(() => {},10);
                //console.log(map[y][x]);
                context.filter = "brightness(50%)";
                if (mapBottom[x][y] != -1) context.drawImage(blocks[mapBottom[x][y]], x * blockSize, y * blockSize, blockSize, blockSize);
                context.filter = "brightness(100%)";
                if (mapTop[x][y] != -1) context.drawImage(blocks[mapTop[x][y]], x * blockSize, y * blockSize, blockSize, blockSize);
            }
        }

        var canvasDataURL = canvas.toDataURL();
        document.body.style.backgroundImage = 'url(' + canvasDataURL + ')';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = '100% auto';

        console.log("Tło wygenerowane!");
    };
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function setBlock(x, y, block, alsoBackground) {
    mapTop[x][y] = block;
    if (alsoBackground) mapBottom[x][y] = block;
}

function getBlockID(x, y) {
    return (y - 1) * imgWidth + x - 1;
}

function getBlockTop(x, y) {
    if (x > 0 && x < mapTop.length && y > 0 && y < mapTop[0].length) return mapTop[x][y]; else return -2;
}
function getBlockBottom(x, y) {
    if (x > 0 && x < mapBottom.length && y > 0 && y < mapBottom[0].length) return mapBottom[x][y]; else return -2;
}

function generateOre(mult, size, from, to, blockSize, zoom) {
    perlin.seed();
    for (let x = 0; x < canvas.width / (blockSize); x++) {
        for (let y = 0; y < canvas.height / (blockSize); y++) {
            if (mapTop[x][y] == from && perlin.get(x * mult, y * mult) > size) setBlock(x, y, to, false);
        }
    }
}


function getImageSlice(img, x, y, width, height) {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let context = canvas.getContext('2d');
    context.drawImage(img, x, y, width, height, 0, 0, width, height);
    return canvas;
}
generateBackground();

//https://github.com/joeiddon/perlin/blob/master/perlin.js

let perlin = {
    rand_vect: function () {
        let theta = Math.random() * 2 * Math.PI;
        return { x: Math.cos(theta), y: Math.sin(theta) };
    },
    dot_prod_grid: function (x, y, vx, vy) {
        let g_vect;
        let d_vect = { x: x - vx, y: y - vy };
        if (this.gradients[[vx, vy]]) {
            g_vect = this.gradients[[vx, vy]];
        } else {
            g_vect = this.rand_vect();
            this.gradients[[vx, vy]] = g_vect;
        }
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    },
    smootherstep: function (x) {
        return 6 * Math.pow(x, 5) - 15 * Math.pow(x, 4) + 10 * Math.pow(x, 3);
    },
    interp: function (x, a, b) {
        return a + this.smootherstep(x) * (b - a);
    },
    seed: function () {
        this.gradients = {};
        this.memory = {};
    },
    get: function (x, y) {
        if (this.memory.hasOwnProperty([x, y]))
            return this.memory[[x, y]];
        let xf = Math.floor(x);
        let yf = Math.floor(y);
        //interpolate
        let tl = this.dot_prod_grid(x, y, xf, yf);
        let tr = this.dot_prod_grid(x, y, xf + 1, yf);
        let bl = this.dot_prod_grid(x, y, xf, yf + 1);
        let br = this.dot_prod_grid(x, y, xf + 1, yf + 1);
        let xt = this.interp(x - xf, tl, tr);
        let xb = this.interp(x - xf, bl, br);
        let v = this.interp(y - yf, xt, xb);
        this.memory[[x, y]] = v;
        return v;
    }
}
perlin.seed();

//yes, I copied and modified Minecraft code for better effect, thanks Notch :)

function generate(id, nOB, sX, sY) {
    f = Math.random() * 3.141593;
    mX = (sX + Math.sin(f) * nOB / 8.0);
    xMin = (sX - Math.sin(f) * nOB / 8.0);
    mY = (sY + Math.floor(Math.random() * 3) + 2);
    yMin = (sY - Math.floor(Math.random() * 3) + 2);
    for (l = 0; l <= nOB; l++) {
        d6 = mX + (xMin - mX) * l / nOB;
        d7 = mY + (yMin - mY) * l / nOB;
        d9 = Math.random() * nOB / 16.0;
        d10 = (Math.sin(l * 3.141593 / nOB) + 1.0) * d9 + 1.0;
        d11 = (Math.sin(l * 3.141593 / nOB) + 1.0) * d9 + 1.0;
        vsX = Math.floor(d6 - d10 / 2.0);
        vsY = Math.floor(d7 - d11 / 2.0);
        veX = Math.floor(d6 + d10 / 2.0);
        veY = Math.floor(d7 + d11 / 2.0);
        for (x = vsX; x <= veX; x++) {
            d12 = (x + 0.5 - d6) / d10 / 2.0;
            if (d12 * d12 < 1.0) for (y = vsY; y <= veY; y++) {
                d13 = (y + 0.5 - d7) / d11 / 2.0;
                if (nOB > 0 && (d12 * d12 + d13 * d13 < 1.0) && (getBlockTop(x, Math.abs(y-mapTop[0].length)) == getBlockID(1, 1))) {
                    nOB--;
                    setBlock(x, Math.abs(y-mapTop[0].length), id);
                }
            }
        }
    }
    return true;
}