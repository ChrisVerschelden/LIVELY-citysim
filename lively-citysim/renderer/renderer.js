import { ctx } from "../storage/context.js";

class Renderer {
    constructor(engine) {
        this.engine = engine;


        ctx.root.width  = parseInt(getComputedStyle(ctx.root.root).width , 10);
        ctx.root.height = parseInt(getComputedStyle(ctx.root.root).height, 10);

        onresize = (event) => this.resize();
        for (let i = 0; i < ctx.consts.MAX_LAYERS; i++) {
            ctx.layers[i] = document.createElement('canvas');
            ctx.layers[i].id = `canvas_${i}`
            ctx.layers[i].style.zIndex = i+10;
            ctx.layers[i].style.position = "absolute";
            ctx.layers[i].width = ctx.root.width
            ctx.layers[i].height = ctx.root.height

            ctx.root.root.appendChild(ctx.layers[i]);

            ctx.layers[i].getContext("2d").fillStyle = `rgb(${Math.floor(255 - 42.5 * i)},${Math.floor(255 - 42.5 * i)},0)`;
            ctx.layers[i].getContext("2d").fillRect(
                ((ctx.layers[i].width / ctx.consts.MAX_LAYERS) * i) ,
                ((ctx.layers[i].height / ctx.consts.MAX_LAYERS) * i) , 
                ctx.layers[i].width / ctx.consts.MAX_LAYERS,
                ctx.layers[i].height / ctx.consts.MAX_LAYERS
            );
        }
    }


    resize() {
        ctx.previousTimeStamp = Date.now();
        ctx.root.width  = parseInt(getComputedStyle(ctx.root.root).width , 10);
        ctx.root.height = parseInt(getComputedStyle(ctx.root.root).height, 10);
        //console.log("resize " + getComputedStyle(this.root).width + " / " + getComputedStyle(this.root).height);
        for (let i = 0; i < ctx.consts.MAX_LAYERS; i++) {
            ctx.layers[i].width = ctx.root.width;
            ctx.layers[i].height = ctx.root.height;
            ctx.layers[i].getContext("2d").clearRect(0,0,ctx.layers[i].width, ctx.layers[i].width)
        }

        this.draw();
    }

    draw() {
        // for (let i = 0; i < ctx.consts.MAX_LAYERS; i++) {
        //     ctx.layers[i].width = ctx.root.width;
        //     ctx.layers[i].height = ctx.root.height;
        //     ctx.layers[i].getContext("2d").clearRect(0,0,ctx.layers[i].width, ctx.layers[i].width)
        //     ctx.layers[i].getContext("2d").fillStyle = `rgb(${Math.floor(255 - 42.5 * i)},${Math.floor(255 - 42.5 * i)},0)`;
        //     ctx.layers[i].getContext("2d").fillRect(
        //         ((ctx.layers[i].width / ctx.consts.MAX_LAYERS) * i),
        //         ((ctx.layers[i].height / ctx.consts.MAX_LAYERS) * i),
        //         ctx.layers[i].width / ctx.consts.MAX_LAYERS,
        //         ctx.layers[i].height / ctx.consts.MAX_LAYERS
        //     );
        // }

        ctx.gameGrid.forEach(tile => {
            ctx.layers[0].getContext("2d").fillStyle = `rgb(${Math.floor(255 - 42.5 * square.getData().id)},${Math.floor(255 - 42.5 * square.getData().id)},0)`;
            square.draw(ctx.layers[0].getContext("2d"));
        });
    }
}

export {Renderer};