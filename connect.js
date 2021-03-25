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
    // await dbQuery("DELETE FROM messages", []);
    // await dbQuery("DELETE FROM users", []);
    // await dbQuery("DELETE FROM conversations", []);

    // addUser("Colin", "Nanosplitter", "pass321word");
    // addUser("Joey", "ari_atori", "password!");
    // addUser("Bill", "sverdlik", "password");
    // addUser("Casey", "xi", "pass")
    
    // var idColin = await getUserId("Nanosplitter");
    // idColin = idColin[0].id;
    // var idJoey = await getUserId("ari_atori");
    // idJoey = idJoey[0].id;
    // var idBill = await getUserId("sverdlik");
    // idBill = idBill[0].id;
    // var idCasey = await getUserId("xi");
    // idCasey = idCasey[0].id

    // addConversation(idColin, idJoey);
    // addConversation(idJoey, idBill);
    // addConversation(idBill, idCasey);
    // addConversation(idColin, idCasey);

    // var colinJoeyConvo = await getConversation(idColin, idJoey);
    // colinJoeyConvo = colinJoeyConvo[0].id
    // var joeyBillConvo = await getConversation(idJoey, idBill);
    // joeyBillConvo = joeyBillConvo[0].id
    // var billCaseyConvo = await getConversation(idBill, idCasey);
    // billCaseyConvo = billCaseyConvo[0].id
    // var colinCaseyConvo = await getConversation(idColin, idCasey);
    // colinCaseyConvo = colinCaseyConvo[0].id

    // setTimeout(() => {  addMessage(colinJoeyConvo, "Hello World!", idColin, idJoey); console.log("Message sent"); }, 200);
    
    // setTimeout(() => {  addMessage(colinJoeyConvo, "How are you", idJoey, idColin); console.log("Message sent"); }, 2000);
    // setTimeout(() => {  addMessage(colinJoeyConvo, "I'm good, HBU", idColin, idJoey); console.log("Message sent"); }, 3000);
    // setTimeout(() => {  addMessage(colinJoeyConvo, "I am well as well", idJoey, idColin); console.log("Message sent"); }, 4000);
    // setTimeout(() => {  addMessage(colinJoeyConvo, "Dude this weather is awesome", idColin, idJoey); console.log("Message sent"); }, 5000);
    // setTimeout(() => {  addMessage(colinJoeyConvo, "ikr", idJoey, idColin); console.log("Message sent"); }, 6000);
    // setTimeout(() => {  addMessage(colinJoeyConvo, "Goodbye.", idColin, idJoey); console.log("Message sent"); }, 7000);

    // setTimeout(() => {  addMessage(joeyBillConvo, "Hello World!", idJoey, idBill); console.log("Message sent"); }, 8000);
    // setTimeout(() => {  addMessage(joeyBillConvo, "How are you", idBill, idJoey); console.log("Message sent"); }, 9000);
    // setTimeout(() => {  addMessage(joeyBillConvo, "I'm good, HBU", idJoey, idBill); console.log("Message sent"); }, 10000);
    // setTimeout(() => {  addMessage(joeyBillConvo, "I am well as well", idBill, idJoey); console.log("Message sent"); }, 11000);
    // setTimeout(() => {  addMessage(joeyBillConvo, "Dude this weather is awesome", idJoey, idBill); console.log("Message sent"); }, 12000);
    // setTimeout(() => {  addMessage(joeyBillConvo, "ikr", idBill, idJoey); console.log("Message sent"); }, 13000);
    // setTimeout(() => {  addMessage(joeyBillConvo, "Goodbye.", idJoey, idBill); console.log("Message sent"); }, 14000);

    // setTimeout(() => {  addMessage(billCaseyConvo, "Hello World!", idBill, idCasey); console.log("Message sent"); }, 15000);
    // setTimeout(() => {  addMessage(billCaseyConvo, "How are you", idCasey, idBill); console.log("Message sent"); }, 16000);
    // setTimeout(() => {  addMessage(billCaseyConvo, "I'm good, HBU", idBill, idCasey); console.log("Message sent"); }, 17000);
    // setTimeout(() => {  addMessage(billCaseyConvo, "I am well as well", idCasey, idBill); console.log("Message sent"); }, 18000);
    // setTimeout(() => {  addMessage(billCaseyConvo, "Dude this weather is awesome", idBill, idCasey); console.log("Message sent"); }, 19000);
    // setTimeout(() => {  addMessage(billCaseyConvo, "ikr", idCasey, idBill); console.log("Message sent"); }, 20000);
    // setTimeout(() => {  addMessage(billCaseyConvo, "Goodbye.", idBill, idCasey); console.log("Message sent"); }, 21000);

    // setTimeout(() => {  addMessage(colinCaseyConvo, "Hello World!", idColin, idCasey); console.log("Message sent"); }, 22000);
    // setTimeout(() => {  addMessage(colinCaseyConvo, "How are you", idCasey, idColin); console.log("Message sent"); }, 23000);
    // setTimeout(() => {  addMessage(colinCaseyConvo, "I'm good, HBU", idColin, idCasey); console.log("Message sent"); }, 24000);
    // setTimeout(() => {  addMessage(colinCaseyConvo, "I am well as well", idCasey, idColin); console.log("Message sent"); }, 25000);
    // setTimeout(() => {  addMessage(colinCaseyConvo, "Dude this weather is awesome", idColin, idCasey); console.log("Message sent"); }, 26000);
    // setTimeout(() => {  addMessage(colinCaseyConvo, "ikr", idCasey, idColin); console.log("Message sent");}, 27000);
    // setTimeout(() => {  addMessage(colinCaseyConvo, "Yeet.", idColin, idCasey); console.log("Done!");}, 28000);


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

//ADD MESSAGE
app.post('/addMessage', async function (req, res) {
    var wait = await addMessage(req.body.conversationId, req.body.message, req.body.sender, req.body.reciever);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({success: "Success", data: {}});
    
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

