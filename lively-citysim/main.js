"use strict";

import { Engine } from "./engine/engine.js";
import { Renderer } from "./renderer/renderer.js";
import { ctx } from "./storage/context.js";

function app() {
    ctx.root.root   = document.getElementById("sim");
    console.log( ctx.root.root.clientWidth);
    ctx.root.width  = parseInt(getComputedStyle(ctx.root.root).width, 10); 
    ctx.root.height = parseInt(getComputedStyle(ctx.root.root).height, 10);

    const renderer = new Renderer(new Engine());

    renderer.draw()
}


window.onload = app();