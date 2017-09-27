import Node from '../Shapes/Node';
import Point2D from "../Shapes/Point2D";

export default class SelectorNode extends Node {
    constructor(canvas, onStartResize, onUpdateResize, onEndResize) {
        super(new Point2D(), canvas);

        let startPosition = null;
        this.onMouseDown.push((evt) => {
            startPosition = evt;
            onStartResize();

        });

        this.onMouseMove.push((evt) => {
            onUpdateResize(new Point2D(evt.x - startPosition.x, evt.y - startPosition.y));

        });
        this.onMouseUp.push((evt) => {
            if (Point2D.distance(startPosition, evt) != 0) {
                onEndResize(new Point2D(evt.x - startPosition.x, evt.y - startPosition.y));
            }
        });
    }
}