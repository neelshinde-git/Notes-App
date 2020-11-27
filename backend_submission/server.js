var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

let isOK = false;
let sessionid = 0
const port = 8000;
var con = mysql.createConnection({
  host:"localhost",
  user:"Administrator",
  password:"admin",
  database:"notesapp",
});

con.connect(function (err){
  if(err){
    throw err;
  } else {
    console.log("Connected to DB");
  }
});


//For initial authorization
app.post('/auth', function(req, res, next){
  console.log("********** Login attempt ****************");
  sessionid = "0";
  const credentials = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString().split(":");
  let username = credentials[0].replace("'","").replace('"','');
  let password = credentials[1];
  let query = "select username from users where username = '" + username + "' and password = '" + password + "';";
  console.log(query);
  con.query(query, function(err, result){
    if(err){
      res.status(200).send("Check the credentials");
    } else if (result.length > 0) {
      sessionid = username + Math.random().toString(36).replace(".","");
      console.log("Sessionid : " + sessionid);
      if(sessionid != 0){
        query = "update users set authid = '" + sessionid + "' where username = '" + username + "';";
        con.query(query, function(err, result){
          if(err){
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

// For Checking is used is already logged in and session is active
app.post('/check', function(req, res, next){
  console.log("************** Checking auth status *************")
  let sid = req.body.sid;
  console.log(req.body.sid);
  let query = "select authid from users where authid = '" + sid + "';";
  console.log(query);
  con.query(query, function(err, result){
    if(err){
        res.status(200).send("fail");
    } else if(result.length > 0){
      console.log(result);
      res.status(200).send("success");
    } else {
        res.status(200).send("fail");
    }
  })

})

//For getting all notes related to the logged in user
app.post('/notes', function(req, res, next){
  console.log("************** Getting note *************")
  let sid = req.body.sid;
  console.log(req.body.sid);
  let query = "select authid from users where authid = '" + sid + "';";
  console.log(query);
  con.query(query, function(err, result){
    if(err){
        res.status(200).send("fail");
    } else if(result.length > 0) {
        query = "select title, note from notes where username in (select username from users where authid = '" + sid + "')";
        console.log(query);
        con.query(query, function(err, result){
          if(err){
              res.status(200).send("fail");
          } else if(result.length > 0){
            console.log(result);
            res.status(200).send(result);
          } else {
            console.log(result);
              res.status(200).send("fail");
          }
        })
      }
     else {
        res.status(200).send("fail");
    }
  })

})

// For adding note to logged in users's inventory
app.post('/add', function(req, res, next){
  console.log("************** Adding note *************")
  let sid = req.body.sid;
  console.log(req.body);
  let query = "select authid from users where authid = '" + sid + "';";
  console.log(query);
  con.query(query, function(err, result){
    if(err){
        res.status(200).send("fail");
    } else if(result.length > 0) {
        query = "insert into notes (username, title, note) values ((select username from users where authid = '" + sid + "'), '" + req.body.title + "', '" + req.body.note +"');"
        console.log(query);
        con.query(query, function(err, result){
          if(err){
              res.status(200).send("fail");
          }else {
            console.log(result);
            res.status(200).send("success");
          }
        })
      }
     else {
        res.status(200).send("fail");
    }
  })

})

// For deletion of a note
app.post('/delete', function(req, res, next){
  console.log("************** Adding note *************")
  let sid = req.body.sid;
  console.log(req.body);
  let query = "select authid from users where authid = '" + sid + "';";
  console.log(query);
  con.query(query, function(err, result){
    if(err){
        res.status(200).send("fail");
    } else if(result.length > 0) {
        query = "delete from notes where username in (select username from users where authid = '" + sid + "') and title = '" + req.body.title + "' and note  = '" + req.body.note +"';"
        console.log(query);
        con.query(query, function(err, result){
          if(err){
              res.status(200).send("fail");
          }else {
            console.log(result);
            res.status(200).send("success");
          }
        })
      }
     else {
        res.status(200).send("fail");
    }
  })

})



//Test
app.get('/api', function(req,res){
  res.send("Backend is online ")
});

var server = app.listen(port, function(){
  console.log('Backend listening at ' + server.address().address + ' : ' + server.address().port);
});
