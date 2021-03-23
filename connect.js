let mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'wazup'
});

connection.connect(async function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    } else {
        console.log("Connection successful!");
    }
//     await dbQuery("DELETE FROM messages", []);
//     await dbQuery("DELETE FROM users", []);
//     await dbQuery("DELETE FROM conversations", []);

//     addUser("Colin", "Nanosplitter", "pass321word");
//     addUser("Joey", "ari_atori", "password!");
//     addUser("Bill", "sverdlik", "password");
//     addUser("Casey", "xi", "pass")
    
//     var idColin = await getUserId("Nanosplitter");
//     idColin = idColin[0].id;
//     var idJoey = await getUserId("ari_atori");
//     idJoey = idJoey[0].id;
//     var idBill = await getUserId("sverdlik");
//     idBill = idBill[0].id;
//     var idCasey = await getUserId("xi");
//     idCasey = idCasey[0].id

//     addConversation(idColin, idJoey);
//     addConversation(idJoey, idBill);
//     addConversation(idBill, idCasey);
//     addConversation(idColin, idCasey);

//     var colinJoeyConvo = await getConversaton(idColin, idJoey);
//     colinJoeyConvo = colinJoeyConvo[0].id
//     var joeyBillConvo = await getConversaton(idJoey, idBill);
//     joeyBillConvo = joeyBillConvo[0].id
//     var billCaseyConvo = await getConversaton(idBill, idCasey);
//     billCaseyConvo = billCaseyConvo[0].id
//     var colinCaseyConvo = await getConversaton(idColin, idCasey);
//     colinCaseyConvo = colinCaseyConvo[0].id

//     addMessage(colinJoeyConvo, "Hello World!", idColin, idJoey);
//     addMessage(colinJoeyConvo, "How are you", idJoey, idColin);
//     addMessage(colinJoeyConvo, "I'm good, HBU", idColin, idJoey);
//     addMessage(colinJoeyConvo, "I am well as well", idJoey, idColin);
//     addMessage(colinJoeyConvo, "Dude this weather is awesome", idColin, idJoey);
//     addMessage(colinJoeyConvo, "ikr", idJoey, idColin);
//     addMessage(colinJoeyConvo, "Goodbye.", idColin, idJoey);

//     addMessage(joeyBillConvo, "Hello World!", idJoey, idBill);
//     addMessage(joeyBillConvo, "How are you", idBill, idJoey);
//     addMessage(joeyBillConvo, "I'm good, HBU", idJoey, idBill);
//     addMessage(joeyBillConvo, "I am well as well", idBill, idJoey);
//     addMessage(joeyBillConvo, "Dude this weather is awesome", idJoey, idBill);
//     addMessage(joeyBillConvo, "ikr", idBill, idJoey);
//     addMessage(joeyBillConvo, "Goodbye.", idJoey, idBill);

//     addMessage(billCaseyConvo, "Hello World!", idBill, idCasey);
//     addMessage(billCaseyConvo, "How are you", idCasey, idBill);
//     addMessage(billCaseyConvo, "I'm good, HBU", idBill, idCasey);
//     addMessage(billCaseyConvo, "I am well as well", idCasey, idBill);
//     addMessage(billCaseyConvo, "Dude this weather is awesome", idBill, idCasey);
//     addMessage(billCaseyConvo, "ikr", idCasey, idBill);
//     addMessage(billCaseyConvo, "Goodbye.", idBill, idCasey);

//     addMessage(colinCaseyConvo, "Hello World!", idColin, idCasey);
//     addMessage(colinCaseyConvo, "How are you", idCasey, idColin);
//     addMessage(colinCaseyConvo, "I'm good, HBU", idColin, idCasey);
//     addMessage(colinCaseyConvo, "I am well as well", idCasey, idColin);
//     addMessage(colinCaseyConvo, "Dude this weather is awesome", idColin, idCasey);
//     addMessage(colinCaseyConvo, "ikr", idCasey, idColin);
//     addMessage(colinCaseyConvo, "Goodbye.", idColin, idCasey);


//     var colinsContacts = await getUserContacts(idColin);

//     console.log(colinsContacts);
});

async function checkLogin(username, password) {
    var sql = "SELECT COUNT(id) AS success FROM users WHERE username=? AND password=?;";

    return await dbQuery(sql, [username.toString(), password.toString()]);
}

async function getUserId(username) {
    var sql = "SELECT id FROM users WHERE username = ?";
    return await dbQuery(sql, [username.toString()]);
}

async function getUsername(userId) {
    var sql = "SELECT username FROM users WHERE id = ?";
    return await dbQuery(sql, [userId.toString()]);
}

async function getName(userId) {
    var sql = "SELECT name FROM users WHERE id = ?";
    return await dbQuery(sql, [userId.toString()]);
}

async function addUser(name, username, password) {
    var sql = "INSERT INTO users (name, username, password) VALUES (? , ? , ?)";
    return await dbQuery(sql, [name.toString(), username.toString(), password.toString()]);
}

async function getConversation(userId1, userId2) {
    var sql = "SELECT * FROM conversations WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?);";
    return await dbQuery(sql, [userId1.toString(), userId2.toString(), userId2.toString(), userId1.toString()]);
}

async function getConversationUsers(convoId) {
    var sql = "SELECT user1, user2 FROM conversations WHERE id=?;";
    return await dbQuery(sql, [convoId.toString()]);
}

async function addConversation(userId1, userId2) {
    var sql = "INSERT INTO conversations (user1, user2) VALUES (?, ?)";
    return await dbQuery(sql, [userId1.toString(), userId2.toString()]);
}

async function addMessage(conversationId, message, sender, reciever) {
    var sql = "INSERT INTO messages (conversationId, message, sender, reciever, timestamp) VALUES (?, ?, ?, ?, NOW())";
    return await dbQuery(sql, [conversationId.toString(), message.toString(), sender.toString(), reciever.toString()]);
}

async function getMessagesForConversation(conversationId) {
    var sql = "SELECT * FROM messages WHERE conversationId=? ORDER BY timestamp DESC";
    return await dbQuery(sql, [conversationId.toString()]);
}

async function getUserContacts(userId) {
    var sql = "SELECT DISTINCT reciever FROM messages WHERE sender=?";
    return await dbQuery(sql, [userId.toString()]);
}

async function getUserConversations(userId) {
    var sql = "SELECT id FROM conversations WHERE user1=? OR user2=?";
    return await dbQuery(sql, [userId.toString(), userId.toString()]);
}

function dbQuery(databaseQuery, values) {
    return new Promise(resolve => {
        connection.query(databaseQuery, values, function (error, result) { // change db->connection for your code
            if (error) {
                console.log(error);
                throw error;
            }
            try {
                // console.log(result);

                resolve(result);

            } catch (error) {
                resolve({});
                throw error;
            }

        });
    });

}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res){
    res.sendStatus(200);
 });

//LOGIN
app.post('/login', async function (req, res) {
    var loginCheck = await checkLogin(req.body.username, req.body.password);
    res.header("Access-Control-Allow-Origin", "*");
    if (loginCheck[0].success > 0) {
        res.status(200).send({success: "Success", data: {username: req.body.username}});
    } else {
        res.status(200).send({success: "Failed"});
    }
});

//SIGN UP
app.post('/signup', async function (req, res) {
    var addUserVar = await addUser(req.body.name, req.body.username, req.body.password);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({success: "Success"});
});

//GET USER ID FROM USERNAME
app.post('/getUserId', async function (req, res) {
    var userId = await getUserId(req.body.username);
    userId = userId[0].id;
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({success: "Success", data: {userId: userId}});
});

//GET NAME FROM USER ID
app.post('/getName', async function (req, res) {
    var name = await getName(req.body.userId);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({success: "Success", data: {name: name}});
});

//GET CONVERSATIONS FROM USER ID
app.post('/getConversations', async function (req, res) {
    var userConvos = await getUserConversations(req.body.userId);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({success: "Success", data: {userConvos: userConvos}});
    
});

//GET MESSAGES FROM CONVO ID
app.post('/getMessagesForConversation', async function (req, res) {
    var messages = await getMessagesForConversation(req.body.convoId);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({success: "Success", data: {messages: messages}});
    
});

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// Starting our server.
app.listen(1337, () => {
    console.log('Go to http://localhost:1337/');
});

