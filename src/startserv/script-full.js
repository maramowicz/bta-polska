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

function generateBackground() {
    console.log("Generowanie tła...");

    let img = new Image();
    img.src = 'BlockSpriteStripped.webp';

    img.onload = function () {
        let blockSize = 16;
        let blocks = [];

        for (let y = 0; y < img.height; y += blockSize) {
            for (let x = 0; x < img.width; x += blockSize) {
                blocks.push(getImageSlice(img, x, y, blockSize, blockSize));
            }
        }

        let canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let context = canvas.getContext('2d');

        context.imageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;

        let index = 0;
        let zoom = 3;
        perlin.seed();
        context.fillStyle = '#81abff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        let seed = Math.random();
        for (let x = 0; x < window.innerWidth / (blockSize * zoom); x++) {
            mapTop[x] = [];
            mapBottom[x] = [];
            for (let y = 0; y < window.innerHeight / (blockSize * zoom); y++) {
                if (y > (8 + 5 * perlin.get(x * 0.1, seed))) setBlock(x, y, getBlock(1, 1), true);
                else setBlock(x, y, -1, true);
            }
        }
        perlin.seed();
        seed = Math.random();
        for (let x = 0; x < window.innerWidth / (blockSize * zoom); x++) {
            let highest = 9999;
            for (let y = 0; y < window.innerHeight / (blockSize * zoom); y++) {
                if (mapTop[x][y] == 0 && highest == 9999) {
                    highest = y;
                    //dirt with grass
                    setBlock(x, y, getBlock(3, 1), true);
                    //grass
                    if (perlin.get(x*0.01, seed)>0&&Math.random()>0.8) setBlock(x, y-1, getBlock(7, 1), true);

                }
                else if (y > highest&&y < highest+(perlin.get(x * 0.1, seed)+1)*2.5+1) {
                    mapTop[x][y] = getBlock(2, 1);
                }
            }
        }

        //generateOre(0.1, 0.15, getBlock(1, 1), getBlock(16, 26), blockSize, zoom);  
        generateOre(0.1, 0.4, getBlock(1, 1), getBlock(4, 1), blockSize, zoom);  
        generateOre(0.1, 0.45, getBlock(1, 1), getBlock(5, 1), blockSize, zoom);  
        generateOre(0.1, 0.45, getBlock(1, 1), getBlock(6, 1), blockSize, zoom);  

        for (let x = 0; x < window.innerWidth / (blockSize * zoom); x++) {
            for (let y = 0; y < window.innerHeight / (blockSize * zoom); y++) {
                //console.log(map[y][x]);
                context.filter = "brightness(50%)";
                if (mapBottom[x][y] != -1) context.drawImage(blocks[mapBottom[x][y]], x * blockSize * zoom, y * blockSize * zoom, blockSize * zoom, blockSize * zoom);
                context.filter = "brightness(100%)";
                if (mapTop[x][y] != -1) context.drawImage(blocks[mapTop[x][y]], x * blockSize * zoom, y * blockSize * zoom, blockSize * zoom, blockSize * zoom);
            }
        }

        document.body.style.background = 'url(' + canvas.toDataURL() + ') no-repeat center center fixed';
        document.body.style.backgroundSize = 'cover';

        console.log("Tło wygenerowane!");
    };
}

function setBlock(x, y, block, alsoBackground) {
    mapTop[x][y] = block;
    if (alsoBackground) mapBottom[x][y] = block;
}

function getBlock(x, y) {
    return (y-1)*16+x-1;
}

function generateOre(mult, size, from, to, blockSize, zoom) {
    perlin.seed();
    for (let x = 0; x < window.innerWidth / (blockSize * zoom); x++) {
        for (let y = 0; y < window.innerHeight / (blockSize * zoom); y++) {
            if (mapTop[x][y] == from&&perlin.get(x*mult, y*mult) > size) setBlock(x, y, to, false);
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

//generateBackground();

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
        return 6 * Math.pow(x, 5) - 15 * Math.pow(x, 4) + 10 * Math.pow(x,3);
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
//perlin.seed();