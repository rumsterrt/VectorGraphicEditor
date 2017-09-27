import Shape from './Shape.js';
import Point2D from './Point2D.js';

export default class Poliline extends Shape{
    constructor(canvas,points,color,depth){
        super(canvas,points,color,null,depth);
    }

    draw(){
        if(this.nodes.length >= 2) {
            let context = this.canvas.getContext('2d');
            context.beginPath();
            context.strokeStyle = this.strokeColor;
            context.moveTo(this.nodes[0].point.x, this.nodes[0].point.y);
            for (let i = 1; i < this.nodes.length; i++) {
                context.lineTo(this.nodes[i].point.x, this.nodes[i].point.y);
            }
            context.stroke();
        }
    }
    //epsilon - min border depth
    contains(point,epsilon){
        let rect = null;
        for(let i = 1;i<this.nodes.length;i++){
            rect = Point2D.getRect([this.nodes[i-1].point,this.nodes[i].point]);
            if(epsilon) {
                rect.width = rect.width > epsilon ? rect.width : epsilon;
            }
            if(point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height){
                return true;
            }
        }
        return false;
    }
}