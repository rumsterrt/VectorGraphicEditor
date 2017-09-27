import ShapeOnClickCreator from "./ShapeOnClickCreator";
import Line from "../../ui/Shapes/Line.js";

export default class LineCreator extends ShapeOnClickCreator{
    constructor(canvas,inputPoint,epsilon,onShapeCreate,color,depth){
        super(canvas,inputPoint,epsilon,onShapeCreate);

        this.color = color || '#000000';
        this.depth = depth || 1;
    }

    getShape(){
        return new Line(this.canvas,this.points[0],this.points[1],this.color,this.depth);
    }

    draw(){
        if(this.points.length >= 2) {
            let context = this.canvas.getContext('2d');
            context.beginPath();
            context.strokeStyle = this.color;
            context.moveTo(this.points[0].x, this.points[0].y);
            context.lineTo(this.points[1].x, this.points[1].y);
            context.stroke();
        }
    }
}