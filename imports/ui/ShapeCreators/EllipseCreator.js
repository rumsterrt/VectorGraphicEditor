import ShapeOnClickCreator from "./ShapeOnClickCreator";
import Ellipse from "../../ui/Shapes/Ellipse.js";

export default class EllipseCreator extends ShapeOnClickCreator{
    constructor(canvas,inputPoint,epsilon,onShapeCreate,colorStroke,colorFill,depth){
        super(canvas,inputPoint,epsilon,onShapeCreate);

        this.strokeColor = colorStroke || '#000000';
        this.fillColor = colorFill || '#000000';
        this.depth = depth || 1;
    }

    getShape(){
        return new Ellipse(this.canvas,this.points[0],this.points[1],this.strokeColor,this.fillColor,this.depth);
    }

    draw(){
        if(this.points.length >= 2) {
            let context = this.canvas.getContext('2d');
            context.beginPath();
            let centerX = this.points[0].x + (this.points[1].x - this.points[0].x) / 2;
            let centerY = this.points[0].y + (this.points[1].y - this.points[0].y) / 2;
            let radiusX = Math.abs(this.points[1].x - this.points[0].x) / 2;
            let radiusY = Math.abs(this.points[1].y - this.points[0].y) / 2;
            for (var i = 0 * Math.PI; i < 2 * Math.PI; i += 0.01) {
                let xPos = centerX - (radiusX * Math.sin(i)) * Math.sin(0 * Math.PI) + (radiusX * Math.cos(i)) * Math.cos(0 * Math.PI);
                let yPos = centerY + (radiusY * Math.cos(i)) * Math.sin(0 * Math.PI) + (radiusY * Math.sin(i)) * Math.cos(0 * Math.PI);

                if (i == 0) {
                    context.moveTo(xPos, yPos);
                } else {
                    context.lineTo(xPos, yPos);
                }
            }
            context.lineWidth = this.depth;
            context.strokeStyle = this.strokeColor;
            context.fillStyle = this.fillColor;
            context.stroke();
        }
    }
}