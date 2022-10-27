const express = require('express');
const http = require('http');
const path = require('path');
const cors = require("cors")
const passport = require('passport');
const {success} = require("consola");
// passport config
require("./middelwares/bearerStrategy")
// dotenv config
require("dotenv").config();
// Connect to database
require("./Config/database");

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const port=process.env.port || 3000;

// app config
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(passport.initialize());

// app routes
const routeEstamp = require("./Routers/Routestamp");
const routeUser = require("./Routers/Routeuser");
const routeCategorie=require("./Routers/RouteCategorie");
const routeAuth = require("./Routers/RouteAuth");
const routeEfleur = require("./Routers/Routeefleur");
const routeCart = require("./Routers/RouteCart");
const routerProduct = require("./Routers/RouteProduct");

app.use("/estamps", routeEstamp);
app.use("/user",routeUser);
app.use("/efleur",routeEfleur);
app.use("/categorie",routeCategorie);
app.use("/auth", routeAuth);
app.use("/Cart",routeCart);
app.use("/product",routerProduct);

// Static files 
app.use(express.static('storages'));
app.use(express.static(path.join(__dirname,'./public')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// socket io 
let name;
io.on('connection', (socket) => {
  console.log('new user connected');
  
  socket.on('joining msg', (username) => {
  	name = username;
  	io.emit('chat message', `---${name} joined the chat---`);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('chat message', `---${name} left the chat---`);
  });
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
  });
});

// server starting
server.listen(port, () => {
  success({
          message:`Server listening at the port ${port}`,
          badge:true
      })
});