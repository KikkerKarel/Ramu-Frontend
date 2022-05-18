import React, { Component } from "react";
import './Icons.css';

class CloseIconComponent extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        console.log(props);
    }

    handleClick () {
        this.props.close(true);
    }
    render () {
        return <div>
            <svg id="icons" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16" onClick={this.handleClick}>
                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
            </svg>
        </div>
    }
}

export default CloseIconComponent;