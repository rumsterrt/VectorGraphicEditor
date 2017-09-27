import Command from "./Command.js";

export default class ResizeFiguresCommand extends Command{
    constructor(figures,startPoints,endPoints){
        super();

        this.figures = figures;
        this.startPoints = startPoints.map(x=>x.map(y=>y.clone()));
        this.endPoints = endPoints.map(x=>x.map(y=>y.clone()));
    }

    execute(){
        for (let i = 0; i < this.figures.length; i++)
        {
            for (let j = 0; j < this.figures[i].nodes.length; j++)
            {
                this.figures[i].nodes[j].point = this.endPoints[i][j];
            }
        }
    }

    unexecute() {
        for (let i = 0; i < this.figures.length; i++) {
            for (let j = 0; j < this.figures[i].nodes.length; j++) {
                this.figures[i].nodes[j].point = this.startPoints[i][j];
            }
        }
    }
}