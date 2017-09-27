import ShapeCreator from "./ShapeCreator.js";
import Point2D from "../../ui/Shapes/Point2D.js";

export default class ShapeOnClickCreator extends ShapeCreator{
    mousedown(evt){
        this.isDrag = true;
        this.points.push(new Point2D(evt.x,evt.y));
        this.points.push(new Point2D(evt.x,evt.y));

        this.canvas.addEventListener('mousemove', this, false);
        this.canvas.addEventListener('mouseup', this, false);
    }

    mousemove(evt){
        if(this.isDrag){
            this.points[1] = new Point2D(evt.x,evt.y);
        }
    }

    mouseup(evt){
        if(this.isDrag){
            this.points[1] = new Point2D(evt.x,evt.y);

            this.canvas.removeEventListener('mousemove', this, false);

            this.canvas.removeEventListener('mouseup', this, false);

            this.isDrag = false;
            this.isBusy = false;
            this.onShapeCreated(Point2D.distance(this.points[0],this.points[1]) >= this.epsilon?this.getShape():null);
        }
    }
}