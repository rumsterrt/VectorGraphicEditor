export default class UnReManager{
    constructor(){
        this.undoStack = new Array();
        this.redoStack = new Array();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new UnReManager();
        }
        return this.instance;
    }

    compute(command){
        command.execute();

        this.undoStack.push(command);
        this.redoStack = new Array();
    }

    undo(level){
        if(this.undoStack.length>0){
            let command = this.undoStack.pop();
            command.unexecute();
            this.redoStack.push(command);
        }
    }

    redo(level){
        if(this.redoStack.length>0){
            let command = this.redoStack.pop();
            command.execute();
            this.undoStack.push(command);
        }
    }
}