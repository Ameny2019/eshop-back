const express = require('express');
const http = require('http');
const path = require('path');
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const passport = require('passport');
const session = require('express-session');
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
app.use(morgan('dev'));
app.use(compression());
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
app.use(passport.initialize());
app.use(passport.session());

// app routes
const routeAuth = require("./Routers/RouteAuth");
const routeProfile = require("./Routers/profileRoute");
const routeHome = require("./Routers/homeRouter");
const routeEstamp = require("./Routers/Routestamp");
const routeUser = require("./Routers/Routeuser");
const routeCategorie=require("./Routers/RouteCategorie");
const routeEfleur = require("./Routers/RouteEfleur");
const routeCart = require("./Routers/RouteCart");
const routerProduct = require("./Routers/RouteProduct");

app.use("/auth", routeAuth);
app.use("/auth", routeProfile);
app.use("/home", routeHome);
app.use("/estamps", routeEstamp);
app.use("/user",routeUser);
app.use("/efleur",routeEfleur);
app.use("/categorie",routeCategorie);
app.use("/Cart",routeCart);
app.use("/product",routerProduct);

// Static files 
app.use(express.static('storages'));
app.use(express.static(path.join(__dirname,'./public')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Any other route (the fallback route)
app.get('*', (req, res) => {
  res.status(404).json({message: 'Route path not found. Please verify and try again.'})
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