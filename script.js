let ctx; // Context
const max_iteration = 50; // Iter per pixel
const w = 1250; // Dimension
const h = 1000;
let x_min = -2.0; // Plot
let x_max = 0.5;
let y_min = -1
let y_max = 1;

const start = () => {
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.width = w;
    ctx.canvas.height = h;

    const start = Date.now();
    draw(x_min, y_min, x_max, y_max);
    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
};

const draw = (x_min, y_min, x_max, y_max) => { // Mandelbrot
    for (let Px = 0; Px < w; Px++) {
        for (let Py = 0; Py < h; Py++) {
            let x0 = Px / w * (x_max - x_min) + x_min;
            let y0 = Py / h * (y_max - y_min) + y_min;
            let x = 0;
            let y = 0;
            let iteration = 0;
            while (x * x + y * y <= 4 && iteration < max_iteration) {
                let xtemp = x * x - y * y + x0;
                y = 2 * x * y + y0;
                x = xtemp;
                iteration++;
            }
            let c = 255 - (iteration / max_iteration * 255);
            ctx.fillStyle = `rgb(${c}, ${c}, ${c})`;
            ctx.fillRect(Px, Py, 1, 1);
        }
    }
}