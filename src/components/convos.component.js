import React, { Component } from "react";
import blueFace from '../blueFace.png';
export default class Convos extends Component {
    render() {
        
        return (
            <form id="newconvoform">
                <input type="text" name="username" id="username" className="form-control" placeholder="Friend's username"></input>
                <button type="submit" className="btn btn-dark btn-lg btn-block">Start New Conversation</button><br></br>
                <div id="convosTab">
                
                </div>
            </form>
            
        );
    }

    componentDidMount() {
        var convoSliders = localStorage["convoSliders"];
        console.log(convoSliders);
        document.getElementById("convosTab").innerHTML = convoSliders;
        // var convosHtml = window.getConversationHtmlById(localStorage["currentUser"]);
        // console.log(convosHtml);
        // convosHtml.then(function () {
        //     var data = localStorage["convoSliders"];
        //     document.getElementById("convosTab").innerHTML = data;
        // });
    }
}