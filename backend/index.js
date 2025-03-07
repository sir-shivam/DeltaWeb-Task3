const express= require("express");
const cors = require("cors");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const authRoutes = require("./db/state");
const songRoutes = require("./db/music");
const listRoutes = require("./db/list");
const requestRourtes = require("./db/Allrequest")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


require("./db/config");
const User = require("./db/User");
const Song = require("./db/Song");
const port = process.env.PORT || 4000;



const app = express();
app.use(express.json());
app.use(cors());


//Authentication
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret_key"; 

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    //small change _id:jwt_payload.userId
    console.log(jwt_payload);
    const user = await User.findOne({_id:jwt_payload.userId}); 
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
}));




app.get("/view" , async (req,resp) =>{
    
    mongoose.connect("mongodb+srv://sirshivam25:IsjDNvpNvTLwk5bg@dtune.1lfadav.mongodb.net/?retryWrites=true&w=majority&appName=Dtune");
    const userSchema = new mongoose.Schema({});
    const data = await User.find();
    console.log(data);
    resp.send(data);
    
})


app.use("/auth", authRoutes);
app.use("/song", passport.authenticate("jwt", { session: false }),songRoutes);
app.use("/playlist",passport.authenticate("jwt", { session: false }),listRoutes);
app.use("/request",passport.authenticate("jwt", { session: false }),requestRourtes);


app.listen(port);