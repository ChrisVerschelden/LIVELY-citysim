"use strict";

import { Engine } from "./engine/engine.js";
import { Renderer } from "./renderer/renderer.js";

function app() {
    const renderer = new Renderer(
        document.getElementById("sim"),
        null);
}


window.onload = app();