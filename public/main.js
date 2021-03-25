var userIdPerm = -1;
var convoHtml = "";
var convoSliders = "";
$(document).ready(async function () {

    //Process for login
    $("#loginform").on('submit', loginHandler);

    //Process for sign in
    $("#signupform").on('submit', signupHandler);

    $("#addmessageform").on('submit', addMessageHandler);
});

function getUserIdPerm() {
    return userIdPerm;
}

function getConvoHtml() {
    return convoHtml;
}

async function loginHandler(e) {
    $.ajax({ // make an AJAX request
        method: "POST",
        type: "POST",
        crossDomain: true,
        dataType: 'json',
        url: "http://localhost:1337/login", // it's the URL of your component B
        data: $("#loginform").serialize(), // serializes the form's elements
        success: async function (data) {
            // show the data you got from B in result div

            convoHtml = "";
            console.log(data);
            var userId = await getUserId(data.data.username);
            userIdPerm = userId;
            localStorage.setItem("currentUser", userId);
            var userConvos = await getConversations(userId);
            var loop = new Promise(resolve => {
                userConvos.forEach(async function(convo, index, array) {
                    var messages = await getMessagesForConversation(convo.id);
                    localStorage.setItem(convo.id, JSON.stringify(messages));
                    console.log(messages);
                    var lastMessage = messages[0];

                    var friendId = getOtherUser(lastMessage, userId);
                    console.log(friendId);
                    var friendName = await getName(friendId);
                    friendName = friendName[0].name;
                    var convoSlider = "<a className='convoSlide' href='/convo?convoId="+ convo.id +"'><h3>"+ friendName +"</h3><p>"+ lastMessage.message +"</p></a>";
                    console.log(convoSlider);

                    
                    convoHtml += convoSlider;

                    if (index === array.length - 1) {
                        resolve();
                    }

                });
            });

            loop.then(() => {
                console.log(data);
                if (data.success === "Success") {
                    console.log(convoHtml);
                    localStorage["convoSliders"] = convoHtml;
                    window.convoSliders = convoHtml;
                    console.log(window.convoSliders);
                    window.location.pathname = '/convos';
                    // window.convoComponent.test();
                }
            });
            
            
            
            // var userConvos = getConver   sations(userId);

            // console.log(userConvos);


            


        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form
}

async function signupHandler(e) {
    $.ajax({ // make an AJAX request
        method: "POST",
        type: "POST",
        crossDomain: true,
        dataType: 'json',
        url: "http://localhost:1337/signup", // it's the URL of your component B
        data: $("#signupform").serialize(), // serializes the form's elements
        success: function (data) {
            // show the data you got from B in result div
            if (data.success === "Success") {
                window.location.pathname = '/login';
            }
        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form
}

async function addMessageHandler(e) {
    //req.body.conversationId, req.body.message, req.body.sender, req.body.reciever
    var message = $("#message").val();
    var conversationId = localStorage["convoId"];
    var sender = localStorage["currentUser"];
    var reciever = localStorage["recieverId"];
    var data = {
        message: message,
        conversationId: conversationId,
        sender: sender,
        reciever: reciever
    };
    console.log(data);
    $.ajax({ // make an AJAX request
        method: "POST",
        type: "POST",
        crossDomain: true,
        dataType: 'json',
        url: "http://localhost:1337/addMessage", // it's the URL of your component B
        data: data, // serializes the form's elements
        success: async function (d) {
            $("#message").val("");
            document.getElementById("convoTab").innerHTML = "";
            messages = await getMessagesForConversation(conversationId);
            messages = messages.reverse();
            messages.forEach(function (message) {
                localStorage.setItem("recieverId", message.reciever);
                if (message.sender == sender) {
                    console.log("Sender");
                    document.getElementById("convoTab").innerHTML += "<p style='text-align:right'>" + message.message + "</p>" + "<br>";
                } else {
                    document.getElementById("convoTab").innerHTML += "<p>" + message.message + "</p>" + "<br>";
                }
                
            });
        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form
}

async function getUserId(username) {
    var data = await postQuery("getUserId", { username: username });
    return data.userId;
}

async function getName(userId) {
    var data = await postQuery("getName", { userId: userId });
    return data.name;
}

async function getConversations(userId) {
    var data = await postQuery("getConversations", { userId: userId });
    return data.userConvos;
}

async function getMessagesForConversation(convoId) {
    var data = await postQuery("getMessagesForConversation", { convoId: convoId });
    return data.messages;
}

async function postQuery(url, data) {
    return new Promise(resolve => {
        $.ajax({ // make an AJAX request
            method: "POST",
            type: "POST",
            crossDomain: true,
            dataType: 'json',
            url: "http://localhost:1337/" + url, // it's the URL of your component B
            data: data, // serializes the form's elements
            success: async function (result) {
                resolve(result.data);
            }
        });
    });
}

function getOtherUser(message, userId) {
    if (message.sender !== userId) {
        return message.sender;
    } else {
        return message.reciever;
    }
}




