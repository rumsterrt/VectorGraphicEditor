export default class ShapeCreator{
    constructor(canvas,inputPoint,epsilon,onShapeCreate){

        this.handleEvent = function(evt) {
            let rect = evt.target.getBoundingClientRect();
            let position = {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top,
            };
            switch (evt.type) {
                case 'mousedown':
                    this.mousedown(position);
                    break;
                case 'mousemove':
                    this.mousemove(position);
                    break;
                case 'mouseup':
                    this.mouseup(position);
                    break;
            }
        };

        this.canvas = canvas;

        this.epsilon = epsilon;

        this.onShapeCreated = onShapeCreate;

        this.isBusy = true;

        this.points = new Array();

        this.isDrag = true;

        this.mousedown(inputPoint);
    }

    mousedown(evt){

    }

    mousemove(evt){

    }

    mouseup(evt){

    }

    draw(){

    }

    getShape(){

    }
}