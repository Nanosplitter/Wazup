

$(document).ready(function () {
    
    //Process for login
    $("#loginform").on('submit', loginHandler);

    //Process for sign in
    $("#signupform").on('submit', signupHandler);



});

function loginHandler(e) {
    $.ajax({ // make an AJAX request
        method: "POST",
        type: "POST",
        crossDomain: true,
        dataType: 'json',
        url: "http://localhost:1337/login", // it's the URL of your component B
        data: $("#loginform").serialize(), // serializes the form's elements
        success: function (data) {
            // show the data you got from B in result div

            if (data.success === "Success") {
                // window.location.pathname = '/convos'
            }
            var userId = getUserId(data.data.username);
            console.log(userId);
            // var userConvos = getConversations(userId);

            // console.log(userConvos);
            

            var convoSlider = "<a className='convoSlide'><h3>Friend One</h3><p>Some conversation here</p></a>";


        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form
}

function signupHandler(e) {
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

function getUserId(username) {
    console.log("Get User Id Called");
    console.log(username);
    $.ajax({ // make an AJAX request
        method: "POST",
        type: "POST",
        crossDomain: true,
        dataType: 'json',
        url: "http://localhost:1337/getUserId", // it's the URL of your component B
        data: {username: username}, // serializes the form's elements
        success: function (data) {
            console.log(data);
            return data.data.userId;
        }
    });
}

function getName(userId) {
    $.ajax({ // make an AJAX request
        method: "POST",
        type: "POST",
        crossDomain: true,
        dataType: 'json',
        url: "http://localhost:1337/getName", // it's the URL of your component B
        data: {userId: userId}, // serializes the form's elements
        success: function (data) {
            return data.data.name;
        }
    });
}

function getConversations(userId) {
    $.ajax({ // make an AJAX request
        method: "POST",
        type: "POST",
        crossDomain: true,
        dataType: 'json',
        url: "http://localhost:1337/getConversations", // it's the URL of your component B
        data: {userId: userId}, // serializes the form's elements
        success: function (data) {
            return data.data.userConvos;
        }
    });
}

function getMessagesForConversation(convoId) {
    $.ajax({ // make an AJAX request
        method: "POST",
        type: "POST",
        crossDomain: true,
        dataType: 'json',
        url: "http://localhost:1337/getMessagesForConversation", // it's the URL of your component B
        data: {convoId: convoId}, // serializes the form's elements
        success: function (data) {
            return data.data.messages;
        }
    });
}

function getOtherUser(message, userId) {
    if (message.sender !== userId) {
        return message.sender;
    } else {
        return message.reciever;
    }
}




