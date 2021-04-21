var userIdPerm = -1;
var convoSliders = "";
$(document).ready(async function () {

    //Process for login
    $("#loginform").on('submit', loginHandler);

    //Process for sign in
    $("#signupform").on('submit', signupHandler);

    $("#addmessageform").on('submit', addMessageHandler);
    $("#newconvoform").on('submit', newConvoFormHandler);
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
        url: "http://localhost:1337/login",
        data: $("#loginform").serialize(), // serializes the form's elements
        success: async function (data) {
            convoHtml = "";
            var userId = await getUserId(data.data.username);
            userIdPerm = userId;
            localStorage.setItem("currentUser", userIdPerm);
            window.location.pathname = "/convos";
        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form
}

async function signupHandler(e) {
    console.log("Signup handler hit");
    $.ajax({ // make an AJAX request
        method: "POST",
        type: "POST",
        crossDomain: true,
        dataType: 'json',
        url: "http://localhost:1337/signup",
        data: $("#signupform").serialize(), // serializes the form's elements
        success: function (data) {
            if (data.success === "Success") {
                window.location.pathname = '/login';
            }
        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form
}

async function newConvoFormHandler(e) {
    var user1 = localStorage["currentUser"];
    var user2 = await getUserId($("#username").val());
    $.ajax({ // make an AJAX request
        method: "POST",
        type: "POST",
        crossDomain: true,
        dataType: 'json',
        url: "http://localhost:1337/addConvo",
        data: {user1:user1, user2:user2}, // serializes the form's elements
        success: async function (data) {
            if (data.success === "Success") {
                var conversationId = await getConversationId(user1, user2);
                window.location.pathname = '/convo?convoId=' + conversationId;
            }

        }
    });
    // e.preventDefault(); // avoid to execute the actual submit of the form
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
        url: "http://localhost:1337/addMessage",
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

async function getUserConversationHtml(userId) {
    return new Promise(async ret => {
        var convoHtml = "";
        var userConvos = await getConversations(userId);
        var loop = new Promise(resolve => {
            if (userConvos.length == 0) {
                resolve();
            }
            userConvos.forEach(async function(convo, index, array) {
                console.log("convo");
                var messages = await getMessagesForConversation(convo.id);
                localStorage.setItem(convo.id, JSON.stringify(messages));
                console.log(messages);
                if (messages.length > 0) {
                    var lastMessage = messages[0];

                    var friendId = getOtherUser(lastMessage, userId);
                    console.log(lastMessage)
                    console.log(userId);
                    console.log(friendId);
                    var friendName = await getName(friendId);
                    friendName = friendName[0].name;
                    var convoSlider = "<a className='convoSlide' href='/convo?convoId="+ convo.id +"'><h3 style='text-align:left'>"+ friendName +"</h3><p>"+ lastMessage.message +"</p></a>";
                } else {
                    var friendId;
                    console.log(convo);
                    if (convo.user1 === userId) {
                        friendId = convo.user2;
                    } else {
                        friendId = convo.user1;
                    }
                    var friendName = await getName(friendId);
                    friendName = friendName[0].name;
                    var convoSlider = "<a className='convoSlide' href='/convo?convoId="+ convo.id +"'><h3 style='text-align:left'>"+ friendName +"</h3></a>";
                }
                
                console.log(convoSlider);

                
                convoHtml += convoSlider;

                if (index === array.length - 1) {
                    resolve();
                }

            });
        });

        loop.then(() => {
            console.log(convoHtml);
            localStorage["convoSliders"] = convoHtml;
            window.convoSliders = convoHtml;
            console.log(window.convoSliders);
            ret(convoHtml);
        });
    });
    
}

async function getUserId(username) {
    var data = await postQuery("getUserId", { username: username });
    return data.userId;
}

async function addMessage(conversationId, message, sender, reciever) {
    var data = await postQuery("addMessage", { conversationId: conversationId, message: message, sender: sender, reciever: reciever });
    return data;
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

async function getConversationId(user1, user2) {
    var data = await postQuery("getConversationId", { user1: user1, user2: user2 });
    return data.convoId;
}

async function getConversationUsers(convoId) {
    var data = await postQuery("getConvoUsers", { convoId: convoId });
    console.log(data);
    return data;
}

async function getOtherConvoMember(convoId, userId) {
    return new Promise(async ret => {
        var users = await getConversationUsers(convoId);
        console.log(users);
        if (users.user1 == userId) {
            ret(users.user2);
        } else {
            ret(users.user1);
        }
    });
    
}

async function postQuery(url, data) {
    return new Promise(resolve => {
        $.ajax({ // make an AJAX request
            method: "POST",
            type: "POST",
            crossDomain: true,
            dataType: 'json',
            url: "http://localhost:1337/" + url,
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




