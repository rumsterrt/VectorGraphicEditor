import Shape from './Shape.js';
import Point2D from './Point2D.js';

export default class Ellipse extends Shape{
    constructor(canvas,point1,point2,colorStroke,colorFill,depth){
        super(canvas,[point1 || new Point2D(),point2 || new Point2D()],colorStroke,colorFill,depth);
    }

    draw(){
        let context = this.canvas.getContext('2d');
        context.beginPath();
        let centerX = this.nodes[0].point.x + (this.nodes[1].point.x - this.nodes[0].point.x)/2;
        let centerY = this.nodes[0].point.y + (this.nodes[1].point.y - this.nodes[0].point.y)/2;
        let radiusX = Math.abs(this.nodes[1].point.x - this.nodes[0].point.x)/2;
        let radiusY = Math.abs(this.nodes[1].point.y - this.nodes[0].point.y)/2;
        for (var i = 0 * Math.PI; i < 2 * Math.PI; i += 0.01 ) {
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
        context.fill();
    }

    contains(point,epsilon){
        let centerX = this.nodes[0].point.x + (this.nodes[1].point.x - this.nodes[0].point.x)/2;
        let centerY = this.nodes[0].point.y + (this.nodes[1].point.y - this.nodes[0].point.y)/2;
        let radiusX = Math.abs(this.nodes[1].point.x - this.nodes[0].point.x)/2;
        let radiusY = Math.abs(this.nodes[1].point.y - this.nodes[0].point.y)/2;
        if(epsilon){
            radiusX = radiusX > epsilon/2?radiusX:epsilon/2;
            radiusY = radiusY > epsilon/2?radiusY:epsilon/2;
        }
        let diffX = point.x - centerX;
        let diffY = point.y - centerY;
        return (diffX * diffX)/(radiusX * radiusX) + (diffY * diffY)/(radiusY * radiusY) <= 1;
    }
}