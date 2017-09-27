import SelectorDecorator from "./SelectorDecorator";
import Point2D from "../Shapes/Point2D";
import ResizeFiguresCommand from "../../api/Command/ResizeFiguresCommand";
import UnReManager from '../../api/Command/UnReManager.js'

export default class SelectorDrag extends SelectorDecorator{
    constructor(selector){
        super(selector);

        this.isDrag = false;
        let prevPoints = new Array();

        let mousedown = (evt) => {
            if(!this.isDrag && !this.isBusy && this.contains(evt)){
                this.isDrag = true;
                this.isBusy = true;
                this.startDrag = evt;
                this.lastOffset = new Point2D(0,0);
                this.canvas.addEventListener('mousemove', this, false);
                this.canvas.addEventListener('mouseup', this, false);

                for (let i = 0; i < this.selectedFigure.length; i++) {
                    prevPoints[i] = (this.selectedFigure[i].nodes.map((node) => {
                        return node.point.clone();
                    }));
                }
            }
        };

        let mousemove = (evt) => {
            if(this.isDrag){
                this.setOffset(new Point2D(evt.x - this.startDrag.x - this.lastOffset.x,evt.y - this.startDrag.y - this.lastOffset.y));
                this.lastOffset = new Point2D(evt.x - this.startDrag.x ,evt.y - this.startDrag.y);
            }
        };

        let mouseup = (evt) => {
            if(this.isDrag){
                this.setOffset(new Point2D(evt.x - this.startDrag.x - this.lastOffset.x,evt.y - this.startDrag.y - this.lastOffset.y));
                this.canvas.removeEventListener('mousemove', this, false);
                this.canvas.removeEventListener('mouseup', this, false);

                let newPoints = new Array();

                for (let i = 0; i < this.selectedFigure.length; i++) {
                    newPoints[i] = (this.selectedFigure[i].nodes.map((node) => {
                        return node.point.clone();
                    }));
                }

                UnReManager.getInstance().compute(new ResizeFiguresCommand(this.selectedFigure, prevPoints,newPoints));
                this.isDrag = false;
                this.isBusy = false;
            }
        };

        this.handleEvent = function (evt) {
            let rect = evt.target.getBoundingClientRect();
            let position = {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top,
            };
            switch (evt.type) {
                case 'mousedown':
                    mousedown(position);
                    break;
                case 'mousemove':
                    mousemove(position);
                    break;
                case 'mouseup':
                    mouseup(position);
                    break;
            }
        };
        this.canvas.addEventListener('mousedown', this, false);
    }

    destroy(){
        super.destroy();
        this.canvas.removeEventListener('mousedown', this, false);
    }
}