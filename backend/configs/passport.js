const bcrypt = require("bcrypt");
const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Loading the config file
dotenv.config({ path: "./configs/config.env" });
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('jwt');
options.secretOrKey = process.env.JWT_SECRET;

const strategyCallback = (jwt_payload, done) =>{
  
}

const initializePassport = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
     const getUser = async (id) => {
        const user = await User.findById(id);
        try {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (err) {
          console.log({message:err.message});
        }
      };
      getUser(jwt_payload.id);
    })
  );
};

module.exports = initializePassport;

/*function initialize(passport, getUserByEmail, getUserById) {
  async function authenticateUser(email, password, done) {
    const user = getUserByEmail(email);
    if (user === null) {
      return done(null, false, { message: "User not found !" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect!" });
      }
    } catch (err) {
      return done(err);
    }
  }

  passport.use(new LocalStrategy({ email: "email" }, authenticateUser)); 
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    done(null, getUserById(id));
  });
}

const getUser = async (id) => {
        const user = await User.findById(id);
        try {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (err) {
          console.log(err.message);
        }
      };



module.exports = initialize;*/