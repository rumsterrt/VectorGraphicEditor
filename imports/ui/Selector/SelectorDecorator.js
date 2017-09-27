import Selector from "./Selector";

export default class SelectorDecorator extends Selector{
    constructor(selector){
        super(selector.canvas,selector.selectedFigure,selector.point1,selector.point2);

        this.component = selector;
    }

    update(){
        this.component.update();
    }

    draw(){
        this.component.draw();
    }

    destroy(){
        this.component.destroy();
    }
}