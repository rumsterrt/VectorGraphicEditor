import Node from "./Node";
import UnReManager from "../../api/Command/UnReManager";
import MoveNodeCommand from "../../api/Command/MoveNodeCommand";
import Point2D from "./Point2D";

export default class Shape{
    constructor(canvas,points,colorStroke,colorFill,depth){
        this.canvas = canvas;
        this.nodes = new Array();
        for(let i = 0;i<points.length;i++) {
            this.nodes.push(new Node(points[i],canvas));

            this.nodes[i].onMouseUp.push(
                (evt)=>{UnReManager.getInstance().compute(new MoveNodeCommand(this.nodes[i],this.nodes[i].lastFixedPos,new Point2D(evt.x,evt.y)));
                });
        }
        this.strokeColor = colorStroke;
        this.fillColor = colorFill;
        this.depth = depth;
    }

    draw(){

    }

    drawSelection(){
        let context = this.canvas.getContext('2d');
        context.beginPath();
        let rect = this.getSeletionRect();
        context.rect(rect.x,rect.y,rect.width,rect.height);
        context.lineWidth = 1;
        context.strokeStyle = '#000000';
        context.stroke();
    }

    getSeletionRect(){
        let rect = {
            xMin:this.nodes[0].point.x,
            xMax:this.nodes[0].point.x,
            yMin:this.nodes[0].point.y,
            yMax:this.nodes[0].point.y,
        }
        for(let i = 1;i<this.nodes.length;i++){
            if(rect.xMin>this.nodes[i].point.x){
                rect.xMin = this.nodes[i].point.x;
            }
            if(rect.yMin>this.nodes[i].point.y){
                rect.yMin = this.nodes[i].point.y;
            }
            if(rect.xMax<this.nodes[i].point.x){
                rect.xMax = this.nodes[i].point.x;
            }
            if(rect.yMax<this.nodes[i].point.y){
                rect.yMax = this.nodes[i].point.y;
            }
        }
        let width = rect.xMax - rect.xMin;
        let height = rect.yMax - rect.yMin;
        return{
            x: rect.xMin,
            y:rect.yMin,
            width: Math.abs(width)>2?width:Math.sign(width)*2,
            height: Math.abs(height)>2?height:Math.sign(width)*2,
        }
    }

    contains(point,epsilon){
        return false;
    }

    setOffset(point){
        for(let i = 0;i<this.nodes.length;i++){
            this.nodes[i].point.add(point);
        }
    }

    static getRect(shapes){
        if(!shapes||shapes.length == 0){
            return null;
        }
        let rect = shapes[0].getSeletionRect();
        for(let i = 1;i<shapes.length;i++){
            let rectCompare = shapes[i].getSeletionRect();
            if(rect.x>rectCompare.x){
                rect.x = rectCompare.x;
            }
            if(rect.y>rectCompare.y){
                rect.y = rectCompare.y;
            }
            if(rect.x + rect.width<rectCompare.x + rectCompare.width){
                rect.width = rectCompare.x + rectCompare.width - rect.x;
            }
            if(rect.y + rect.height<rectCompare.y + rectCompare.height){
                rect.height = rectCompare.y + rectCompare.height - rect.y;
            }
        }
        return rect;
    }
}