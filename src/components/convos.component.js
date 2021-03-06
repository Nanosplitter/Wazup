import React, { Component } from "react";
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

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.updateConvos();
        this.interval = setInterval(() => this.updateConvos(), 3000);
    }

    updateConvos() {
        window.getUserConversationHtml(parseInt(localStorage["currentUser"])).then(function(html) {
            document.getElementById("convosTab").innerHTML = html;
        });
    }
}