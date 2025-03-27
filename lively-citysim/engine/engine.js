import { ctx } from "../storage/context.js";
import { GO_Set, Square, Tile } from "./models/gameObjects.js";



class Engine {
    constructor (seed, renderer) {
        this.renderer = renderer
        this.grid = this.createGrid()
    }

    createGrid (fit = "screen_size", g_width = 0, g_height = 0) { //fit values : "screen_size" or "fixed_size" //width and height in nb of squares
        if (fit === "screen_size") {
            ctx.gameGrid = GO_Set()
            
            const g_width  = g_width  === 0 ? ctx.root.width  : g_width;
            const g_height = g_height === 0 ? ctx.root.height : g_height;
            
            for (let i = 0; i < g_width; i++) {
                for (let j = 0; j < g_width; j++) {
                    ctx.gameGrid.add(new Tile(i * ctx.consts.GRID_CASE_SIZE , j * ctx.consts.GRID_CASE_SIZE, ctx.GRID_CASE_SIZE, null, "fill", {id: (Math.floor(Math.random() * 9) + 1)}));
                }
            }
        }
    }
}

export {Engine};