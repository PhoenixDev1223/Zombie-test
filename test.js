const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.pathIndex = 0;
    }

    Right = (len, n) => {
        this.x = this.x + 1;
        if (this.x === n) this.x = 0;
        this.pathIndex = this.pathIndex + 1;
        if (this.pathIndex === len) this.pathIndex = 0;
    }

    Left = (len, n) => {
        this.x = this.x - 1;
        if (this.x === -1) this.x = n - 1;
        this.pathIndex = this.pathIndex + 1;
        if (this.pathIndex === len) this.pathIndex = 0;
    }

    Up = (len, n) => {
        this.y = this.y - 1;
        if (this.y === -1) this.y = n - 1;
        this.pathIndex = this.pathIndex + 1;
        if (this.pathIndex === len) this.pathIndex = 0;
    }

    Down = (len, n) => {
        this.y = this.y + 1;
        if (this.y === n) this.y = 0;
        this.pathIndex = this.pathIndex + 1;
        if (this.pathIndex === len) this.pathIndex = 0;
    }

    compare = (x, y) => {
        return this.x === x && this.y === y;
    }
}

let lineIndex = 0;
let n;
let zPos = [];
let cPos = [];
let path;

rl.on('line', (line) => {
    if (lineIndex === 0) n = parseInt(line);
    else if (lineIndex === 1) {
        const poses = line.split(' ');
        const pos = new Point(parseInt(poses[0]), parseInt(poses[1]));
        zPos.push(pos);
    } else if (lineIndex === 2) {
        const poses = line.split(' ');
        for (let i = 0; i < poses.length; i = i + 2) {
            let newPos = new Point(parseInt(poses[i]), parseInt(poses[i + 1]));
            cPos.push(newPos);
        }
    } else {
        path = line;
        rl.close();
    }
    lineIndex++;
});

rl.on("close", () => {
    console.log("Start!");
    var len = zPos.length;
    var index = 0;
    do {
        for (var i = 0; i < path.length; i++) {
            if (path[i] === "R") zPos[index].Right(path.length, n);
            else if (path[i] === "L") zPos[index].Left(path.length, n);
            else if (path[i] === "U") zPos[index].Up(path.length, n);
            else zPos[index].Down(path.length, n);
            if (cPos.length > 0 && zPos[index].compare(cPos[0].x, cPos[0].y)) {
                zPos.push(cPos[0]);
                len++;
                cPos.shift();
            }
        }
        index++;
        if (index === len) {
            console.log("Zombies' Positions:");
            let poses = '';
            zPos.forEach(pos => { poses += "(" + pos.x + "," + pos.y + ") " });
            console.log(poses);
            poses = "";
            console.log("creatures' Positions:");
            cPos.forEach(pos => { poses += "(" + pos.x + "," + pos.y + ") " });
            if (poses !== "") console.log(poses);
            else console.log("none");
            break;
        }
    } while (1);
});