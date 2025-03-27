import { ctx } from "../../storage/context.js"
//import { intersect } from "./intersectFunctions.js"
//import { levels } from "./levels.js"

class GameObject {
    constructor(x,y,label=null,draw_mode=null){
        this.x = x
        this.y = y
        this.label = label
        this.draw_mode = 'stroke'
    }

    setX(new_val){
        this.x = new_val
        return this
    }

    setY(new_val){
        this.y = new_val
        return this
    }

    setLabel(new_val){
        this.label = new_val
        return this
    }

    setDrawingMode(new_val){
        this.draw_mode = new_val
        return this
    }

    draw(context){this.draw_label(context)}

    draw_label(context){ this.label !== null ? this.label.setX(this.x).setY(this.y).draw(context) : -1 }
}

class Label extends GameObject {
    constructor(x_o, y_o, label, x=null, y=null){
        super(x=-100,y=-100,label,null)
        this.x_o = x_o
        this.y_o = y_o
    }

    setX_O(new_val){
        this.x_o = new_val
        return this
    }

    setY_O(new_val){
        this.y_o = new_val
        return this
    }

    draw(context) {
        context.strokeText(this.label, this.x + this.x_o, this.y + this.y_o)
    }
}

class Point extends GameObject {
    constructor(x, y, label=null,draw_mode=null){
        super(x,y,label,draw_mode)
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        context.fill(); 
    }

    to_str_eval(){
        return "new Point(" + this.x + "," + this.y + ")"
    }
}

class Line extends GameObject {
    constructor(p1, p2, label = null, draw_mode=null){
        super(p1.x, p1.y, label, draw_mode)
        this.p1 = p1
        this.p2 = p2
    }

    draw(context){
        context.beginPath()
        context.moveTo(this.p1.x, this.p1.y)
        context.lineTo(this.p2.x, this.p2.y)
        context.stroke()
    }

    to_str_eval(){
        return "new Line(" + this.p1.to_str_eval() + "," + this.p2.to_str_eval() + ")"
    }
}

class Circle extends GameObject {
    constructor(x, y, radius, label=null,draw_mode=null){
        super(x,y,label,draw_mode)
        this.r = radius
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fill(); 
    }
}

class Polygon extends GameObject {
    constructor(x, y, vertices, label=null, draw_mode=null){
        super(x,y,label,draw_mode)
        this.vertices = vertices
    }

    setVertices(new_val) {
        this.vertices = new_val
        return this
    }

    addVertex(new_val) {
        this.vertices.push(new_val)
        return this
    }

    draw(context) {
        context.beginPath()
        context.moveTo(this.vertices[0].x, this.vertices[0].y)
        for (let index = 1; index < this.vertices.length; index++) {
            context.lineTo(this.vertices[index].x, this.vertices[index].y)
        }
        context.lineTo(this.vertices[0].x, this.vertices[0].y)
        context.stroke()
        

        this.draw_label(context)
    }
}

class Triangle extends Polygon {
    constructor(x, y, p1, p2, p3, label = null, draw_mode = null) {
        super(x, y, [p1,p2,p3], label, draw_mode)
        this.p1 = p1
        this.p2 = p2
        this.p3 = p3
    }

    setP1(new_val){
        this.p1 = new_val
        this.vertices[0] = new_val
        return this
    }

    setP2(new_val){
        this.p2 = new_val
        this.vertices[1] = new_val
        return this
    }

    setP3(new_val){
        this.p3 = new_val
        this.vertices[2] = new_val
        return this
    }

    setVertices(new_val){
        this.p1 = new_val[0]
        this.p2 = new_val[1]
        this.p3 = new_val[2]
        return this
    }
}

////// will be changed //////

class Rectangle extends GameObject {

    constructor (x, y, width, height, label = null, draw_mode = null){
        super(x, y, label, draw_mode);
        this.w = width
        this.h = height
    }

    setW(new_val){
        this.w = new_val
        return this
    }

    setH(new_val){
        this.h = new_val
        return this
    }

    draw(context){
        if(this.draw_mode == "stroke") {
            context.strokeRect(this.x, this.y, this.w, this.h);
        } else {
            context.fillRect(this.x, this.y, this.w, this.h);
        }
        
        this.draw_label(context)
    }
}

class Button extends Rectangle {
    constructor(x, y, label = "button", active = false, width = 100, height = 30, draw_mode = null) {
        super(x, y, width, height, label, draw_mode)
        this.active = active
    }

    setActive(new_val){
        this.active = new_val
        return this
    }

    draw(context){
        context.fillStyle = this.active ? "pink" : "white";
        context.fillRect(this.x, this.y, this.w, this.h);
        context.strokeRect(this.x, this.y, this.w, this.h);
        context.fillStyle = "black"   
        this.draw_label(context)
    }
}

class Square extends Rectangle {
    constructor(x, y, width, label = null, draw_mode = null){
        super(x, y, width, width, label, draw_mode)
    }     
}

class Tile extends Square {
    constructor (x, y, width, label = null, draw_mode = null, data = {id: null}) {
        super(x, y, width, label, draw_mode);
        this.data = data;
    }   

    getData () {
        return this.data;
    }
}

class TileWithSections extends Square{
    constructor(x,y,width) {
        super(x, y, width, null)
        this.s = width
        let o = width / 4
        this.sections = [
            new Polygon(this.x         , this.y         , [
                new Point(this.x, this.y),
                new Point(this.x + o*4, this.y),
                new Point(this.x + o*3, this.y + o),
                new Point(this.x + o, this.y + o),
            ]),//top trapezoid
            new Polygon(this.x + this.s, this.y         ,[
                new Point(this.x + o*4, this.y),
                new Point(this.x + o*3, this.y + o),
                new Point(this.x + o*3, this.y + o*3),
                new Point(this.x + o*4, this.y + o*4),
            ]),//right trapezoid
            new Polygon(this.x + this.w, this.y + this.w,[
                new Point(this.x, this.y + o*4),
                new Point(this.x + o*4, this.y + o*4),
                new Point(this.x + o*3, this.y + o*3),
                new Point(this.x + o, this.y + o*3),
            ]),//bottom trapezoid
            new Polygon(this.x         , this.y + this.w,[
                new Point(this.x, this.y),
                new Point(this.x + o, this.y + o),
                new Point(this.x + o, this.y + o*3),
                new Point(this.x, this.y + o*4),
            ]),//left trapezoid
        ]
    }

    draw_outside(context){
        // let i = 0
        // let colors = ["red", "yellow", "green", 'purple']
        // this.sections.forEach(element => {
        //     context.strokeStyle = colors[i]
        //     element.draw(context)
        //     i++
        // });
        // context.strokeStyle = "black"
        
        if(this.draw_mode == "stroke") {
            context.strokeRect(this.x, this.y, this.s, this.s);
        } else {
            context.fillRect(this.x, this.y, this.s, this.s);
        }

        this.draw_label(context)
    }

    section_collision(pos){
        for (let i = 0; i < this.sections.length; i++) {
            if (intersect(pos, this.sections[i])){
                return i
            }
        }
        return -1
    }

    get_line(num) {
        let o = this.s / 4;
        switch (num) {
            case 0:
                return new Line(new Point(this.x, this.y), new Point(this.x + o*4, this.y))
            case 1:
                return new Line(new Point(this.x + o*4, this.y + 1), new Point(this.x + o*4, this.y + o*4 - 1))
            case 2:
                return new Line(new Point(this.x, this.y + o*4), new Point(this.x + o*4, this.y + o*4))
            case 3:
                return new Line(new Point(this.x, this.y + 1), new Point(this.x, this.y + o*4 - 1))
        }
    }

    draw_section(context, num) {
        context.strokeStyle = "red"
        //console.log(this.sections[num]);
        this.sections[num].draw(context)
        context.strokeStyle = "black"
    }
}

class GO_Set {
    constructor(objects = new Array()){
        this.objects = objects
    }

    in(obj){
        for (let i = 0; i < this.objects.length; i++) if (this.objects[i].x === obj.x && this.objects[i].y === obj.y) return i
        
        return -1
    }

    add(obj){
        if (this.in(obj) === -1) this.objects.push(obj)
    }

    remove(obj){
        let pos = this.in(obj)
        if (pos !== -1) this.objects.splice(pos, 1)
    }

    pop(){
        this.objects.pop()
    }

    to_str_eval(){
        if (this.objects.length < 1) return 'new GO_Set()'

        let result = 'new GO_Set([' + this.objects[0].to_str_eval()
        
        for (let i = 1; i < this.objects.length; i++) result += ',' + this.objects[i].to_str_eval()

        return result + '])'
    }
}

class Tile_img {
    constructor(clipX, clipY, x, y, size, asset_path, rotation) {
        this.clipX = clipX
        this.clipY = clipY
        this.x = x
        this.y = y
        this.size = size
        this.asset_path =  asset_path
        let angle = {0: "0",1: "90",2: "180", 3: "270"}
        this.rotation = angle[rotation]
        this.transform = "rotate(" + this.rotation + "deg)"
    }

    get_img() {
    }

    to_str_eval() {
        return "new Tile(" + this.clipX + "," + this.clipY + "," + this.x + "," + this.y + "," + this.size + ",'" + this.asset_path + "'," + this.rotation + ")"
    }
}

class Level {
    constructor(plateforms,front_layer,middle_layer,back_layer,spawn, exit, tile_size){
        this.plateforms = plateforms
        this.tile_size = tile_size
        this.front_layer = front_layer
        this.middle_layer = middle_layer
        this.back_layer = back_layer
        this.spawn = spawn
        this.exit = exit
    }

    to_str_eval() {
        let result = 'new Level('
        result += this.plateforms.to_str_eval()
        result += ',' + this.front_layer.to_str_eval()
        result += ',' + this.middle_layer.to_str_eval()
        result += ',' + this.back_layer.to_str_eval()
        result += ',' + this.spawn.to_str_eval() + ',' + this.exit.to_str_eval() + "," + this.tile_size + ',' + ')'
        return result
    }
        
}

export { Point, Line, Circle, Label, Polygon, Rectangle, Button, Square, Triangle, TileWithSections, Level, Tile, GO_Set }