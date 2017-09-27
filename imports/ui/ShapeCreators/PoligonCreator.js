import PolilineCreator from "./PolilineCreator";
import Poligon from "../../ui/Shapes/Poligon.js";

export default class PoligonCreator extends PolilineCreator{
    constructor(canvas,inputPoint,epsilon,onShapeCreate,colorStroke,colorFill,depth) {
        super(canvas,inputPoint,epsilon,onShapeCreate,colorStroke,depth)

        this.fillColor = colorFill;
    }

    getShape(){
        return this.points.length >= 3?new Poligon(this.canvas,this.points,this.color,this.fillColor,this.depth):null;
    }

    draw() {
        super.draw();

        if(this.points.length >= 3) {
            let context = this.canvas.getContext('2d');
            context.lineTo(this.points[0].x, this.points[0].y);
            context.fillStyle = this.fillColor;
            context.fill();
            context.stroke();
        }
    }
}