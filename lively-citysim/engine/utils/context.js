const ctx = {
    consts : {
        MAX_LAYERS : 10,
        MAX_ENTITIES : 1000,
    },
    SecondsPassed : 0,
    PreviousTimeStamp : 0,
    FPS : 0,
    FPSIndicator : document.getElementById("fpsindicator"),
    layers: [],
}

export { ctx }
