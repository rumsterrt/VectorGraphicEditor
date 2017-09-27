import Shape from '../Shapes/Shape.js';
import Point2D from '../Shapes/Point2D.js';

export default class Selector {
    constructor(canvas, selectedFigure, point1, point2, colorStroke, depth) {
        this.canvas = canvas;
        this._point1 = point1;
        this._point2 = point2;
        this.selectedFigure = selectedFigure;

        this.strokeColor = colorStroke;
        this.depth = depth;
        this.isBusy = false;
    }

    get point1(){
        return this._point1;
    }

    set point1(point){
        this.update();
        this._point1 = point;
    }

    get point2(){
        return this._point2;
    }

    set point2(point){
        this.update();
        this._point2 = point;
    }

    update(){

    }

    draw() {
    }

    contains(point, epsilon) {
        epsilon = epsilon || new Point2D();
        for (let i = 0; i < this.selectedFigure.length; i++) {
            if (this.selectedFigure[i].contains(point, epsilon)) {
                return true;
            }
        }
        return false;
    }

    setOffset(point){
        this.point1 = Point2D.add(this.point1,point);
        this.point2 = Point2D.add(this.point2,point);
        for(let i = 0;i<this.selectedFigure.length;i++) {
            this.selectedFigure[i].setOffset(point);
        }
    }

    destroy(){

    }
}