import { ctx } from "../engine/utils/context.js";

class Renderer {
    constructor(root, engine) {
        onresize = (event) => this.resize();
        for (let i = 0; i < ctx.consts.MAX_LAYERS; i++) {
            ctx.layers[i] = document.createElement('canvas');
            ctx.layers[i].id = `canvas_${i}`
            ctx.layers[i].style.zIndex = i+10;
            ctx.layers[i].style.position = "absolute";
            ctx.layers[i].width = root.clientWidth
            ctx.layers[i].height = root.clientHeight
            console.log(typeof ctx.layers[i]);
            root.appendChild(ctx.layers[i]);
            ctx.layers[i].getContext("2d").fillStyle = `rgb(${Math.floor(255 - 42.5 * i)},${Math.floor(255 - 42.5 * i)},0)`;
            ctx.layers[i].getContext("2d").fillRect(
                (root.clientWidth / ctx.consts.MAX_LAYERS) * i,
                (root.clientHeight / ctx.consts.MAX_LAYERS) * i, 
                root.clientWidth / ctx.consts.MAX_LAYERS, 
                root.clientHeight / ctx.consts.MAX_LAYERS
            );
        }
    }


    resize() {
        if(ctx.PreviousTimeStamp === 0) {
            ctx.PreviousTimeStamp = Date.now()
        }
        if(Date.now() - ctx.PreviousTimeStamp > 1000) {
            console.log("resize");
            ctx.PreviousTimeStamp = Date.now();
        }
    }

    draw() {
        
    }
}

export {Renderer};