const ctx = {
    consts : {
        MAX_LAYERS : 10,
        MAX_ENTITIES : 1000,
        GRID_CASE_SIZE : 32,
    },
    gameGrid : null,
    root : {
        root: null,
        width : 0,
        height : 0,
    },
    secondsPassed : 0,
    previousTimeStamp : 0,
    fps : 0,
    fpsIndicator : document.getElementById("fpsindicator"),
    layers: [],
}

export { ctx }
