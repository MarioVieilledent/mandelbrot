let ctx;
let rect; // For mouse position
let mousePos = { x: 0.0, y: 0.0 }; // Mouse position
const max_iteration = 75;

const w = 5000;
const h = 5000;

const start = () => {
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    rect = canvas.getBoundingClientRect(); // For mouse position

    // event click
    canvas.addEventListener("click", function (evt) {
        mousePos = getMousePos(canvas, evt);
    }, false);

    ctx.canvas.width = w;
    ctx.canvas.height = h;
    mandelbrot();
};

const mandelbrot = () => {
    let x_min = -2.0;
    let x_max = 0;
    let y_min = -1
    let y_max = 1;

    const start = Date.now();
    
    draw(x_min, y_min, x_max, y_max);

    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
}

const draw = (x_min, y_min, x_max, y_max) => {
    for (let Px = 0; Px < w; Px++) {
        for (let Py = 0; Py < h; Py++) {
            let x0 = Px / w * (x_max - x_min) + x_min; // 2.47 * 400 = 988
            let y0 = Py / h * (y_max - y_min) + y_min; // 2.24 * 400 = 896
            let x = 0;
            let y = 0;
            let iteration = 0;
            while (x * x + y * y <= 4 && iteration < max_iteration) {
                let xtemp = x * x - y * y + x0;
                y = 2 * x * y + y0;
                x = xtemp;
                iteration++;
            }
            let color = 255 - (iteration / max_iteration * 255);
            pix(Px, Py, color);
        }
    }
}

const pix = (x, y, c) => {
    ctx.fillStyle = `rgb(${c}, ${c}, ${c})`;
    ctx.fillRect(x, y, 1, 1);
}

const clear = () => {
    ctx.clearRect(0, 0, w, h);
}

const getMousePos = (canvas, evt) => {
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}