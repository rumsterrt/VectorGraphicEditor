import Command from "./Command.js";

export default class MoveNodeCommand extends Command{
    constructor(node,start,end){
        super();

        this.node = node;
        this.start = start;
        this.end = end;
    }

    execute(){
        this.node.point = this.end;
    }

    unexecute(){
        this.node.point = this.start;
    }
}