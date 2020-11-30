/**********************************************************************

Title: Complete Node backend for Notes App
Desc: Authentication/Authorization, Addition of note, Getting list of notes and deletion handled here.  

***********************************************************************/

var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

let isOK = false;
let sessionid = 0
const port = 8000; // Port to be used


// Setting up credentials and parameters for database connection
var con = mysql.createConnection({
    host: "localhost",
    user: "Administrator",
    password: "admin",
    database: "notesapp",
});

//Connecting to database using the above parameters and credentials
con.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log("Connected to DB");
    }
});


/**********************************************************************

Route to check if credentials are correct and create a session for the user. 
Credentials are received in the Authorization header in encoded format. 
First credentials are checked using a database connection
then update statement is used to update the Session ID generated. 
Session ID generated using: username + Math.random().toString(36).replace(".", "");

***********************************************************************/
app.post('/auth', function (req, res, next) {
    
    console.log("********** Login attempt ****************");
    sessionid = "0";
    const credentials = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString().split(":");
    let username = credentials[0].replace("'", "").replace('"', '');
    let password = credentials[1];
    let query = "select username from users where username = '" + username + "' and password = '" + password + "';";
    console.log(query); // Logging query for reference during testing
    con.query(query, function (err, result) {
        
        if (err) {
            res.status(200).send("Check the credentials");
        } else if (result.length > 0) {
            //Generate session ID
            sessionid = username + Math.random().toString(36).replace(".", "");
            console.log("Sessionid : " + sessionid);
            if (sessionid != 0) {
                query = "update users set authid = '" + sessionid + "' where username = '" + username + "';";
                con.query(query, function (err, result) {
                    if (err) {
                        res.status(401).send("Invalid credentials");
                    }
                    res.status(200).send(sessionid);
                })
            }
            
        } else {
            res.status(401).send("Invalid user");
        }
    })

})

/**********************************************************************

Route to check if a user is already logged in. 
Input received - Session id
Response text - "fail" / "success" sent accordingly

***********************************************************************/
app.post('/check', function (req, res, next) {
    
    console.log("************** Checking auth status *************")
    let sid = req.body.sid;
    console.log(req.body.sid);
    let query = "select authid from users where authid = '" + sid + "';";
    console.log(query);
    con.query(query, function (err, result) {
        
        if (err) {
            res.status(200).send("fail");
        } else if (result.length > 0) {
            console.log(result);
            res.status(200).send("success");
        } else {
            res.status(200).send("fail");
        }
    })

})

/**********************************************************************

Route to get list of user's notes 
Input received - Session id
First validity of the session is checked and then the list of notes are sent as a response. 

***********************************************************************/
app.post('/notes', function (req, res, next) {
    
    console.log("************** Getting note *************")
    let sid = req.body.sid;
    console.log(req.body.sid);
    let query = "select authid from users where authid = '" + sid + "';";
    console.log(query);
    con.query(query, function (err, result) {
        
        if (err) {
            res.status(200).send("fail");
        } else if (result.length > 0) {
            
            query = "select title, note from notes where username in (select username from users where authid = '" + sid + "')";
            console.log(query);
            con.query(query, function (err, result) {
                if (err) {
                    res.status(200).send("fail");
                } else if (result.length > 0) {
                    console.log(result);
                    res.status(200).send(result);
                } else {
                    console.log(result);
                    res.status(200).send("fail");
                }
            })
        } else {
            res.status(200).send("fail");
        }
    })

})

/**********************************************************************

Route to add a note to logged in user's inventory
Note added only if session id is valid. 

***********************************************************************/
app.post('/add', function (req, res, next) {
    
    console.log("************** Adding note *************")
    let sid = req.body.sid;
    console.log(req.body);
    let query = "select authid from users where authid = '" + sid + "';";
    console.log(query);
    con.query(query, function (err, result) {
        if (err) {
            res.status(200).send("fail");
        } else if (result.length > 0) {
            query = "insert into notes (username, title, note) values ((select username from users where authid = '" + sid + "'), '" + req.body.title + "', '" + req.body.note + "');"
            console.log(query);
            con.query(query, function (err, result) {
                if (err) {
                    res.status(200).send("fail");
                } else {
                    console.log(result);
                    res.status(200).send("success");
                }
            })
        } else {
            res.status(200).send("fail");
        }
    })

})

/**********************************************************************

Route to delete a note from logged in user's inventory
Note deleted only if session id is valid. 

***********************************************************************/
app.post('/delete', function (req, res, next) {
    
    console.log("************** Deleting note *************")
    let sid = req.body.sid;
    console.log(req.body);
    let query = "select authid from users where authid = '" + sid + "';";
    console.log(query);
    con.query(query, function (err, result) {
        if (err) {
            res.status(200).send("fail");
        } else if (result.length > 0) {
            query = "delete from notes where username in (select username from users where authid = '" + sid + "') and title = '" + req.body.title + "' and note  = '" + req.body.note + "';"
            console.log(query);
            con.query(query, function (err, result) {
                if (err) {
                    res.status(200).send("fail");
                } else {
                    console.log(result);
                    res.status(200).send("success");
                }
            })
        } else {
            res.status(200).send("fail");
        }
    })

})



//Only to test if Backend is up and running.  
app.get('/api', function (req, res) {
    res.send("Backend is online ")
});

var server = app.listen(port, function () {
    console.log('Backend listening at port ' + server.address().port);
});