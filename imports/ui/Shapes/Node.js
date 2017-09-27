import Point2D from "./Point2D";

export default class Node{
    constructor(point,canvas){
        this.point = point;
        this.canvas = canvas;

        this.isActive = true;
        this.isDrag = false;
        this.side = 3;

        this.onMouseDown = new Array();
        this.onMouseMove = new Array();
        this.onMouseUp = new Array();

        this.lastFixedPos = point;
        this.handleEvent = function(evt) {
            let rect = evt.target.getBoundingClientRect();
            let position = {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top,
            };
            switch (evt.type) {
                case 'mousedown':
                    if(this.isActive && !this.isDrag && this.contains(position) && !Node.isCurrent()){
                        this.lastFixedPos = this.point;
                        Node.setCurrent(this);
                        this.isDrag = true;
                        this.canvas.addEventListener('mousemove', this, false);
                        this.canvas.addEventListener('mouseup', this, false);

                        if(this.onMouseDown&&this.onMouseDown.length>0){
                            this.onMouseDown.forEach((elem)=>{elem(position);})
                        }
                    }
                    break;
                case 'mousemove':
                    if(this.isDrag){
                        this.point = new Point2D(position.x,position.y);

                        if(this.onMouseMove&&this.onMouseMove.length>0){
                            this.onMouseMove.forEach((elem)=>{elem(position);})
                        }
                    }
                    break;
                case 'mouseup':
                    if(this.isDrag){
                        Node.setCurrent(null);

                        if(this.onMouseUp&&this.onMouseUp.length>0){
                            this.onMouseUp.forEach((elem)=>{elem(position);})
                        }
                        this.canvas.removeEventListener('mousemove', this, false);
                        this.canvas.removeEventListener('mouseup', this, false);
                        this.isDrag = false;
                    }
                    break;
            }
        };

        this.canvas.addEventListener('mousedown', this, false);
    }

    static setCurrent(node) {
        this.currentNode = node;
    }

    static isCurrent(){
        if(this.currentNode){
            return this.currentNode!=null;
        }
        return false;
    }

    draw(){
        if(this.isActive) {
            let context = this.canvas.getContext('2d');
            context.beginPath();
            context.rect(this.point.x - this.side, this.point.y - this.side, this.side*2, this.side*2);
            context.strokeStyle = '#000000';
            context.fillStyle = '#6500ec';
            context.stroke();
            context.fill();
        }
    }

    contains(point){
        return point.x<=this.point.x + this.side&& point.x>=this.point.x - this.side&& point.y<=this.point.y + this.side&& point.y>=this.point.y - this.side;
    }
}