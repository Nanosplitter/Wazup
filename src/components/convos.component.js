import React, { Component } from "react";
import blueFace from '../blueFace.png';
export default class Convos extends Component {
    render() {
        
        return (
            <div id="convosTab">
                
            </div>
        );
    }

    componentDidMount() {
        var convoSliders = localStorage["convoSliders"];
        console.log(convoSliders);
        document.getElementById("convosTab").innerHTML = convoSliders;
    }
}