import SelectorDecorator from "./SelectorDecorator";
import SelectorNode from "./SelectorNode";
import Point2D from "../Shapes/Point2D";
import ResizeFiguresCommand from "../../api/Command/ResizeFiguresCommand";
import UnReManager from '../../api/Command/UnReManager.js'

export default class SelectorResize extends SelectorDecorator{
    constructor(selector) {
        super(selector);

        this.nodes = new Array();

        let start1 = this.point1;
        let start2 = this.point2;
        let prevPoints = new Array();
        let currentNodeIndex = 0;
        let currentNodeStart = null;

        for (let i = 0; i < this.selectedFigure.length; i++) {
            prevPoints.push(this.selectedFigure[i].nodes.map((node) => {
                return node.point;
            }));
        }

        let figuresResize = ()=>{
            let centerAxe = this.nodes[(currentNodeIndex + 4) % 8].point;
            let centerMarker = this.nodes[currentNodeIndex].point;
            let procent = new Point2D(
                (currentNodeStart.x == centerAxe.x?1:(centerMarker.x- centerAxe.x) /(currentNodeStart.x - centerAxe.x))-1
                , (currentNodeStart.y == centerAxe.y?1:(centerMarker.y - centerAxe.y) / (currentNodeStart.y - centerAxe.y))-1
            );
            for (let i = 0; i < this.selectedFigure.length; i++) {
                for (let j = 0; j < this.selectedFigure[i].nodes.length; j++) {
                    let pointsLocal = new Point2D(centerAxe.x - prevPoints[i][j].x, centerAxe.y - prevPoints[i][j].y);
                    this.selectedFigure[i].nodes[j].point = new Point2D(prevPoints[i][j].x - procent.x * pointsLocal.x, prevPoints[i][j].y - procent.y * pointsLocal.y);
                }
            }
        };

        let startResize = () => {
            if(this.isBusy){
                return;
            }
            this.isBusy = true;
            currentNodeIndex = this.nodes.findIndex((x) => {
                return x.isDrag;
            });
            currentNodeStart = this.nodes[currentNodeIndex].point.clone();

            for (let i = 0; i < this.selectedFigure.length; i++) {
                prevPoints[i] = (this.selectedFigure[i].nodes.map((node) => {
                    return node.point.clone();
                }));
            }
            this.updateNodesPosition();
        };

        let updatedResize = (scale) =>{
            let currentNode = this.nodes.findIndex((x) => {
                return x.isDrag;
            });
            if (currentNode==-1) {
                return;
            }
            let point1 = new Point2D();
            let point2 = new Point2D();
            
            switch (currentNode)
            {
                case 0:
                    point1 = new Point2D(scale.x, scale.y);
                    break;
                case 1:
                    point1 = new Point2D(0, scale.y);
                    break;
                case 2:
                    point1 = new Point2D(0, scale.y);
                    point2 = new Point2D(scale.x, 0);
                    break;
                case 3:
                    point2 = new Point2D(scale.x, 0);
                    break;
                case 4:
                    point2 = new Point2D(scale.x, scale.y);
                    break;
                case 5:
                    point2 = new Point2D(0, scale.y);
                    break;
                case 6:
                    point1 = new Point2D(scale.x, 0);
                    point2 = new Point2D(0, scale.y);
                    break;
                case 7:
                    point1 = new Point2D(scale.x, 0);
                    break;
            }
            this.point1 = new Point2D(start1.x+point1.x,start1.y+point1.y);
            this.point2 = new Point2D(start2.x+point2.x,start2.y+point2.y);
            this.updateNodesPosition();
            figuresResize();
        };

        let endResize = (evt)=>{
            updatedResize(evt);

            let newPoints = new Array();

            for (let i = 0; i < this.selectedFigure.length; i++) {
                newPoints[i] = (this.selectedFigure[i].nodes.map((node) => {
                    return node.point.clone();
                }));
            }

            UnReManager.getInstance().compute(new ResizeFiguresCommand(this.selectedFigure, prevPoints,newPoints));

            start1 = this.point1;
            start2 = this.point2;
            this.isBusy = false;
        };

        for (let i = 0; i < 8; i++) {
            this.nodes.push(new SelectorNode(this.canvas,startResize.bind(this),updatedResize.bind(this),endResize.bind(this)))
        }
        this.updateNodesPosition();
    }

    updateNodesPosition() {
        let scale = new Point2D((this.point2.x - this.point1.x)/2, (this.point2.y - this.point1.y)/2);
        this.nodes[0].point = new Point2D(this.point1.x, this.point1.y);
        this.nodes[1].point = new Point2D(this.point1.x + scale.x, this.point1.y);
        this.nodes[2].point = new Point2D(this.point2.x, this.point1.y);
        this.nodes[3].point = new Point2D(this.point2.x, this.point1.y + scale.y);
        this.nodes[4].point = new Point2D(this.point2.x, this.point2.y);
        this.nodes[5].point = new Point2D(this.point2.x - scale.x, this.point2.y);
        this.nodes[6].point = new Point2D(this.point1.x, this.point2.y);
        this.nodes[7].point = new Point2D(this.point1.x, this.point1.y + scale.y);
    }

    update(){
        super.update();

        this.updateNodesPosition();
    }

    draw(){
        super.draw();

        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].draw();
        }
    }
}