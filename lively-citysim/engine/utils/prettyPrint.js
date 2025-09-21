class PrettyPrint {
    static p2dArray(mat) {
        let output = ""
        for (let i = 0; i < mat.length; i++) {
            output += mat[i].filter(i => i > 0).join("-") + "\n"
        }
        console.log(output);
    }

    static pGameGrid(gd) {
        let output = ""
        for (let x = 0; x < gd.gWidth; x++) {
            let row = [];
            for (let y = 0; y < gd.gHeight; y++) {
                row.push(gd.grid[`${x},${y}`] === null ? " " : 1)
            }
            output += row.join("-") + "\n"
        }
        console.log(output);
    }

    static p2dArray(a) {
        let output = ""
        for (let x = 0; x < a.length; x++) {
            let row = [];
            for (let y = 0; y < a[x].length; y++) {
                row.push(a[x][y] === 0 ? "-" : 1)
            }
            output += row.join("-") + "\n"
        }
        console.log(output);
    }
}

export { PrettyPrint }