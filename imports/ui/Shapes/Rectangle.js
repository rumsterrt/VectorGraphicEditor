import Shape from './Shape.js';
import Point2D from './Point2D.js';

export default class Rectangle extends Shape{
    constructor(canvas,point1,point2,colorStroke,colorFill,depth){
        super(canvas,[point1 || new Point2D(),point2 || new Point2D()],colorFill,colorStroke,depth);
    }

    draw(){
        let context = this.canvas.getContext('2d');
        context.beginPath();
        let width = this.nodes[1].point.x - this.nodes[0].point.x;
        let height = this.nodes[1].point.y - this.nodes[0].point.y;
        context.rect(this.nodes[0].point.x,this.nodes[0].point.y,width,height);
        context.lineWidth = this.depth;
        context.strokeStyle = this.strokeColor;
        context.fillStyle = this.fillColor;
        context.stroke();
        context.fill();
    }

    contains(point){
        let rect = this.getSeletionRect();
        return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height;
    }
}