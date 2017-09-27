import Command from "./Command.js";

export default class CreateShapeCommand extends Command{
    constructor(shapes,shapeList){
        super();

        this.shapes = shapes;
        this.shapeList = shapeList;
    }

    execute(){
        for(let i = 0;i<this.shapes.length;i++) {
            this.shapeList.push(this.shapes[i]);
        }
    }

    unexecute(){
        for(let i = 0;i<this.shapes.length;i++) {
            this.shapeList.pop();
        }
    }
}