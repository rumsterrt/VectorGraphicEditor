import Shape from './Shape.js';
import Point2D from './Point2D.js';

export default class Line extends Shape{
    constructor(canvas,point1,point2,colorStroke,depth){
        super(canvas,[point1 || new Point2D(),point2 || new Point2D()],colorStroke,null,depth);
    }

    draw(){
        let context = this.canvas.getContext('2d');
        context.beginPath();
        context.strokeStyle = this.strokeColor;
        context.moveTo(this.nodes[0].point.x, this.nodes[0].point.y);
        context.lineTo(this.nodes[1].point.x, this.nodes[1].point.y);
        context.stroke();
    }

    contains(point,epsilon){
        let rect = this.getSeletionRect();
        if(epsilon) {
            rect.width = rect.width > epsilon ? rect.width : epsilon;
        }
        return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height;
    }
}