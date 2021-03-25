import React, { Component } from "react";
const qs = require('qs');

export default class Convos extends Component {

    

    render() {

        return (
            <form id="addmessageform">
                <div id="convoTab">

                </div>
                <input name="message" id="message" className="form-control" placeholder="Enter Message"></input>
                <button type="submit" className="btn btn-dark btn-lg btn-block">Send</button>
            </form>
        );
    }

    componentDidMount() {
        var convoId = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).convoId;
        localStorage.setItem("convoId", convoId);
        var messages = JSON.parse(localStorage[convoId]);
        var currentUser = localStorage.getItem("currentUser");
        console.log(messages);
        console.log(currentUser);
        messages = messages.reverse();
        messages.forEach(function (message) {
            localStorage.setItem("recieverId", message.reciever);
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