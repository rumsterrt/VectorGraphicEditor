import ShapeOnClickCreator from "./ShapeOnClickCreator";
import Rectangle from "../../ui/Shapes/Rectangle.js";

export default class RectangleCreator extends ShapeOnClickCreator{
    constructor(canvas,inputPoint,epsilon,onShapeCreate,colorStroke,colorFill,depth){
        super(canvas,inputPoint,epsilon,onShapeCreate);

        this.strokeColor = colorStroke || '#000000';
        this.fillColor = colorFill || '#000000';
        this.depth = depth || 1;
    }

    getShape(){
        return new Rectangle(this.canvas,this.points[0],this.points[1],this.strokeColor,this.fillColor,this.depth);
    }

    draw(){
        if(this.points.length >= 2) {
            let context = this.canvas.getContext('2d');
            context.beginPath();
            let width = this.points[1].x - this.points[0].x;
            let height = this.points[1].y - this.points[0].y;
            context.rect(this.points[0].x,this.points[0].y,width,height);
            context.lineWidth = this.depth;
            context.strokeStyle = this.strokeColor;
            context.fillStyle = this.fillColor;
            context.stroke();
        }
    }
}