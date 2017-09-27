import React, { Component, PropTypes } from 'react';
import Line from '../ui/Shapes/Line.js';
import Point2D from '../ui/Shapes/Point2D.js';
import Node from '../ui/Shapes/Node.js';

import LineCreator from '../ui/ShapeCreators/LineCreator.js';
import EllipseCreator from '../ui/ShapeCreators/EllipseCreator.js';
import RectangleCreator from '../ui/ShapeCreators/RectangleCreator.js';
import PolilineCreator from '../ui/ShapeCreators/PolilineCreator.js';

import CreateShapeCommand from '../api/Command/CreateShapeCommand.js'
import UnReManager from '../api/Command/UnReManager.js'
import PoligonCreator from "./ShapeCreators/PoligonCreator";
import SelectorCreate from './Selector/SelectorCreator'
import SelectorDrag from "./Selector/SelectorDrag";
import SelectorResize from "./Selector/SelectorResize";

export default class VectorEditor extends Component {
    constructor() {
        super();

        this.figures = new Array();

        this.selectedFigures = new Array();
        this.status = 'line';
        this.startDragPoint = null;
        this.isDrag = false;
        this.epsilon = 5;

        this.mode = 'line';

        this.handleEvent = function(evt) {
            let rect = evt.target.getBoundingClientRect();
            let position = new Point2D(evt.clientX - rect.left,evt.clientY - rect.top);
            switch (evt.type) {
                case 'mousedown':
                    this.startDragPoint = position;
                    this.isDrag = true;
                    this.forceUpdate();
                    break;
                case 'mousemove':
                    if(this.isDrag) {
                        if (!Node.isCurrent() && this.startDragPoint && Point2D.distance(this.startDragPoint, position) > this.epsilon && (!this.selector||!this.selector.isBusy)) {
                            if(this.selector) {
                                this.selector.destroy();
                                this.selector = null;
                            }
                            this.onUpdateShapeCreator(this.status, this.startDragPoint);
                        }
                        this.forceUpdate();
                    }
                    this.refs.currentPoint.value = evt.x + ";" + evt.y;
                    break;
                case 'mouseup':
                    if(this.isDrag) {
                        this.isDrag = false;
                        this.forceUpdate();
                    }
                    break;
                case 'keydown':
                    if(evt.ctrlKey){
                        switch (evt.keyCode){
                            case 89:
                                UnReManager.getInstance().redo();
                                this.forceUpdate();
                                break;
                            case 90:
                                UnReManager.getInstance().undo();
                                this.forceUpdate();
                                break;
                        }
                    }
                    break;
            }
        };
    }

    componentDidMount() {
        this.refs.canvas.editor = this;
        this.refs.canvas.isDrag = false;

        this.refs.canvas.addEventListener('mousedown', this, false);

        this.refs.canvas.addEventListener('mousemove', this, false);

        this.refs.canvas.addEventListener('mouseup', this, false);

        window.addEventListener("keydown", this, false);

        this.draw();
    }

    componentWillUpdate() {
    }

    render() {
        return (
            <li className='VectorEditor'>
                <div class="btn-group">
                    <button onClick={() => {
                        this.status = 'line';
                    }}>Line
                    </button>
                    <button onClick={() => {
                        this.status = 'ellipse';
                    }}>Circle
                    </button>
                    <button onClick={() => {
                        this.status = 'rectangle';
                    }}>Rect
                    </button>
                    <button onClick={() => {
                        this.status = 'poliline';
                    }}>Poliline
                    </button>
                    <button onClick={() => {
                        this.status = 'poligon';
                    }}>Poligon
                    </button>
                    <button onClick={() => {
                        this.status = 'select';
                    }}>Select
                    </button>
                    <input
                        ref="strokeColor"
                        type="color"
                        value="#ff0000"
                    />
                    <input
                        ref="fillColor"
                        type="color"
                        value="#ff0000"
                    />
                    <input
                        ref="currentPoint"
                        type="text"
                    />
                </div>
                <div id="wrapper" ref="canvasWindow">
                    <canvas className="canvas" ref='canvas' width={this.props.width} height={this.props.height}>

                    </canvas>
                </div>
            </li>
        );
    }


    componentDidUpdate() {
        this.draw();
    }

    draw() {
        let context = this.refs.canvas.getContext('2d');
        context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

        if(this.figures&&this.figures.length>0){
            for(let i = 0;i<this.figures.length;i++){
                this.figures[i].draw();
            }
        }
        if(this.selector&&this.selector.selectedFigure){
            for(let i = 0;i<this.selector.selectedFigure.length;i++){
                this.selector.selectedFigure[i].drawSelection();
                if(this.mode == 'nodeEditor')
                for(let j = 0;j<this.selector.selectedFigure[i].nodes.length;j++) {
                    this.selector.selectedFigure[i].nodes[j].draw();
                }
            }
        }

        if(this.creator){
            this.creator.draw();
        }
        if(this.selector){
            this.selector.draw();
        }
        SelectorCreate.draw();
    }

    onCreateNewSelector(selector){
        if(selector){
            this.selector = selector;
            switch (this.mode){
                case 'select':
                    this.selector = new SelectorResize(this.selector);
                    this.selector = new SelectorDrag(this.selector);
                    break;
            }
        }
        this.forceUpdate();
    }

    onCreateNewShape(shape){
        if(shape) {
            UnReManager.getInstance().compute(new CreateShapeCommand([shape], this.figures));
            this.selectedFigures.push(this.figures[this.figures.length-1]);
        }
        this.creator = null;
        this.forceUpdate();
    }

    onUpdateShapeCreator(type,inputPoint) {
        if ((this.creator && !this.creator.isBusy) || !this.creator)
            if (this.refs.canvas) {
                this.mode = type;
                switch (type) {
                    case 'line':
                        this.creator = new LineCreator(this.refs.canvas, inputPoint,this.epsilon, this.onCreateNewShape.bind(this), this.refs.strokeColor.value);
                        break;
                    case 'ellipse':
                        this.creator = new EllipseCreator(this.refs.canvas, inputPoint,this.epsilon, this.onCreateNewShape.bind(this), this.refs.strokeColor.value,this.refs.fillColor.value);
                        break;
                    case 'rectangle':
                        this.creator = new RectangleCreator(this.refs.canvas, inputPoint,this.epsilon, this.onCreateNewShape.bind(this), this.refs.strokeColor.value,this.refs.fillColor.value);
                        break;
                    case 'poliline':
                        this.creator = new PolilineCreator(this.refs.canvas, inputPoint,this.epsilon, this.onCreateNewShape.bind(this), this.refs.strokeColor.value);
                        break;
                    case 'poligon':
                        this.creator = new PoligonCreator(this.refs.canvas, inputPoint,this.epsilon, this.onCreateNewShape.bind(this), this.refs.strokeColor.value,this.refs.fillColor.value);
                        break;
                    case 'select':
                        SelectorCreate.create(this.refs.canvas,this.figures,inputPoint,1,'#000000',this.onCreateNewSelector.bind(this));
                        break;
                }
            }
    }
}

VectorEditor.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};