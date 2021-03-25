import React, { Component } from "react";
const qs = require('qs');

export default class Convos extends Component {

    

    render() {

        return (
            <div id="convoTab">

            </div>
        );
    }

    componentDidMount() {
        var messages = JSON.parse(localStorage[qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).convoId]);
        var currentUser = localStorage.getItem("currentUser");
        console.log(messages);
        console.log(currentUser);
        messages = messages.reverse();
        messages.forEach(function (message) {
            if (message.sender == currentUser) {
                console.log("Sender");
                document.getElementById("convoTab").innerHTML += "<p style='text-align:right'>" + message.message + "</p>" + "<br>";
            } else {
                document.getElementById("convoTab").innerHTML += "<p>" + message.message + "</p>" + "<br>";
            }
            
        });
        // document.getElementById("convoTab").innerHTML = convoSliders;
    }

    
}