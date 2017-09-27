import Poliline from './Poliline.js';
import Point2D from './Point2D.js';

export default class Poligon extends Poliline{
    constructor(canvas,points,colorStroke,colorFill,depth){
        super(canvas,points,colorStroke,colorFill,depth);

        this.fillColor = colorFill;
    }

    draw(){
        super.draw();

        if(this.nodes.length >= 3) {
            let context = this.canvas.getContext('2d');
            context.moveTo(this.nodes[0].point.x, this.nodes[0].point.y);
            context.lineTo(this.nodes[this.nodes.length-1].point.x, this.nodes[this.nodes.length-1].point.y);
            context.fillStyle = this.fillColor;
            context.fill();
            context.stroke();
        }
    }
    //epsilon - min border depth
    contains(point,epsilon){
        let rect = this.getSeletionRect();
        if(point.x < rect.x || point.y < rect.y || point.x > rect.x + rect.width|| point.y > rect.y + rect.height){
            return false;
        }
        let result = false;
        let j = this.nodes.length-1;
        for (let i = 0; i < this.nodes.length; j = i++) {
            if ( ((this.nodes[i].point.y>point.y) != (this.nodes[j].point.y>point.y)) &&
                (point.x < (this.nodes[j].point.x-this.nodes[i].point.x) * (point.y-this.nodes[i].point.y) / (this.nodes[j].point.y-this.nodes[i].point.y) + this.nodes[i].point.x) )
                result = ! result;
        }
        return result;
    }
}