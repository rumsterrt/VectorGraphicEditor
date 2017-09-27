import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import VectorEditor from '../ui/VectorEditor.jsx';

// App component - represents the whole app
const Tree = new VectorEditor.constructor();

class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="container">
                <ul>
                    <div className="container">
                        <ul>
                            <VectorEditor ref="tree" key={this.props.vectorEditor._id} width="2048px" height="1024px"/>;
                        </ul>
                    </div>
                </ul>
            </div>
        );
    }
}


App.propTypes = {
    vectorEditor: PropTypes.object.isRequired,
};

export default createContainer(() => {
    return {
        vectorEditor: Tree,
    };
}, App);