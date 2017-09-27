import Selector from "./Selector";
import Point2D from "../Shapes/Point2D";

export default class SelectorCreate {
    static isCreating = false;

    constructor(canvas,figures, point, depth, color, onSelectorCreate){
        this.point1 = point;
        this.point2 = point;
        this.canvas = canvas;
        this.color = color;
        this.depth = depth;

        let isDrag = true;

        let mousemove = (evt) => {
            if (isDrag) {
                this.point2 = evt;
            }
        };

        let mouseup = (evt) => {
            if (isDrag) {
                this.point2 = evt;

                let selectedF = null;

                if (Point2D.distance(this.point1, this.point2) == 0) {
                    selectedF = figures.filter((figure) => {
                        return figure.contains(this.point1);
                    });
                } else {
                    selectedF = figures.filter((figure) => {
                        return SelectorCreate.isFigureInsideSelector(figure);
                    });
                }

                onSelectorCreate(selectedF == null?null:new Selector(this.canvas,selectedF,this.point1,this.point2,this.color,this.depth));

                isDrag = false;
                SelectorCreate.isCreating = false;

                this.canvas.removeEventListener('mousemove', this, false);
                this.canvas.removeEventListener('mouseup', this, false);
            }
        };

        this.handleEvent = function (evt) {
            let rect = evt.target.getBoundingClientRect();
            let position = {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top,
            };
            switch (evt.type) {
                case 'mousemove':
                    mousemove(position);
                    break;
                case 'mouseup':
                    mouseup(position);
                    break;
            }
        };

        this.canvas.addEventListener('mousemove', this, false);
        this.canvas.addEventListener('mouseup', this, false);
    }

    static create(canvas,figures, point, depth, color, mode,onSelectorCreate) {
        if (this.isCreating) {
            return;
        }
        this.instance =new SelectorCreate(canvas,figures, point, depth, color, mode);

        this.isCreating = true;
    }

    static draw() {
        if (!this.isCreating || !this.instance) {
            return;
        }
        let context = this.instance.canvas.getContext('2d');
        context.beginPath();
        let width = this.instance.point2.x - this.instance.point1.x;
        let height = this.instance.point2.y - this.instance.point1.y;
        context.rect(this.instance.point1.x, this.instance.point1.y, width, height);
        context.lineWidth = this.instance.depth;
        context.strokeStyle = this.instance.color;
        context.stroke();
    }

    static isFigureInsideSelector(figure) {
        if(!this.instance){
            return false;
        }
        let rect = figure.getSeletionRect();
        let seletorRect = Point2D.getRect([this.instance.point1,this.instance.point2]);

        return (seletorRect.x - rect.x) <= 0
            && (seletorRect.y - rect.y) <= 0
            && (seletorRect.x + seletorRect.width - rect.x - rect.width) >= 0
            && (seletorRect.y + seletorRect.height - rect.y - rect.height) >= 0;
    }
}