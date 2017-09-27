import ShapeCreator from "./ShapeCreator.js";
import Point2D from "../../ui/Shapes/Point2D.js";
import Poliline from "../../ui/Shapes/Poliline.js";

export default class PolilineCreator extends ShapeCreator {
    constructor(canvas, inputPoint, epsilon, onShapeCreate, color, depth) {
        super(canvas, inputPoint, epsilon, onShapeCreate);

        this.color = color || '#000000';
        this.depth = depth || 1;
    }

    mousedown(evt) {
        if (!this.counter) {
            this.isDrag = true;
            this.points.push(new Point2D(evt.x, evt.y));
            this.points.push(new Point2D(evt.x, evt.y));

            this.canvas.addEventListener('mousedown', this, false);
            this.canvas.addEventListener('mousemove', this, false);
            this.canvas.addEventListener('mouseup', this, false);
        } else {
            if (this.counter == 2) {
                this.counter = 3;

                this.canvas.removeEventListener('mousedown', this, false);

                this.canvas.removeEventListener('mousemove', this, false);

                this.canvas.removeEventListener('mouseup', this, false);

                this.isDrag = false;
                this.isBusy = false;

                if (Point2D.distance(this.points[this.points.length - 2], this.points[this.points.length - 1]) < this.epsilon) {
                    this.points.pop();
                }

                this.onShapeCreated(this.getShape());
            }
        }
    }

    mousemove(evt) {
        if (this.isDrag) {
            this.points[this.points.length - 1] = new Point2D(evt.x, evt.y);

            this.counter = 1;
        }
    }

    mouseup(evt) {
        if (this.isDrag) {
            this.points[this.points.length - 1] = new Point2D(evt.x, evt.y);

            if (this.counter == 1) {
                this.counter = 2;
                this.points.push(new Point2D(evt.x, evt.y));
                this.isDrag = true;
            }
        }
    }


    getShape() {
        return this.points.length >= 2 ? new Poliline(this.canvas, this.points, this.color, this.depth) : null;
    }

    draw() {
        if (this.points.length >= 2) {
            let context = this.canvas.getContext('2d');
            context.beginPath();
            context.strokeStyle = this.color;
            context.moveTo(this.points[0].x, this.points[0].y);
            for (let i = 1; i < this.points.length; i++) {
                context.lineTo(this.points[i].x, this.points[i].y);
            }
            context.stroke();
        }
    }
}