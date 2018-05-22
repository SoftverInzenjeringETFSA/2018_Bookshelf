const express = require("express");
const signing = express.Router();
const expressValidator = require("express-validator");
const { check, validationResult } = require("express-validator/check");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const uuid = require("uuid/v4");
const cors = require('cors');
const LocalStrategy = require("passport-local").Strategy;
const LokiStore = require("connect-loki")(session);
//const User = require("../models/user");
let User = require("../models/user");

//passport konfiguracija

passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    (username, password, done) => {
      return new Promise((resolve, reject) => {
        User.find().then(res => console.log(res))
        User.findOne({ username: username })
          .then((user) => {


            if (!user) {

              return done(null, false, {
                message: "Pogrešno korisničko ime. ",
                error: 0
              });
            }
            if (!user.comparePasswords(password, user.password)) {

              return done(null, false, {
                message: "Pogrešna lozinka. ",
                error: 0
              });
            }
            return done(null, user);
          })
          .catch(error => done(error));
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await User.findOne({_id: id})//Gave me hell : _id / id
    .then( user => {

      return  done(null, user);
    })
    .catch(error => {
      done(error, false);
    });
});

signing.use(bodyParser());
signing.use(bodyParser.json());
signing.use(
  bodyParser.urlencoded({
    extended: true
  })
);
signing.use(expressValidator());
signing.use(cookieParser('harrypotterandchamberofsecrets'));
signing.use(
  session({
    key: "id",
    genid: req => uuid(),
    secret: 'harrypotterandchamberofsecrets',
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 600000
    },
    store: new LokiStore({})
  })
);
signing.use(passport.initialize());
signing.use(passport.session());
signing.use(cors());
signing.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials",true);
  next();
});
signing.use((req, res, next) => {
  if (req.cookies.id && !req.session.user) {
    res.clearCookie("id");
  }
  next();
});
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.id) {
  } else {
    next();
  }
};

//Route
signing.get("/login", (req, res) => {
  User.find({}, (err, users) => {
  });
  res.status(200).json("Uspješno ste došli do login stranice");
});

signing.post(
  "/login",
  [
    check("username")
      .exists()
      .withMessage("Morate unijeti validno korisničko ime. "),
    check("password")
      .isLength({ min: 1 })
      .withMessage("Morate unijeti šifru. ")
  ],
  (req, res, next) => {
    const validationErrors = req.validationErrors();
    let errors = validationErrors;
    if (errors) {
      res.status(400).json(errors);
    } else {
      passport.authenticate("local", (err, user, info) => {
        if (info) {
          return res.send(info.message);
        }
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(400).json("Korisnik ne postoji sa ovim podacima. ");
        }

        req.logIn(user, err => {

          if (err) {

            return next(err);
          }
          req.session.messages = "Uspješno logirani! ";
          req.session.user = user;
          req.session.authenticated = true;
          req.authenticated = true;
          //provjera autentifikacije passporta

          return res.redirect("/authrequired");
        });
      })(req, res, next);
    }
  }
);

signing.get("/authrequired", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json("Uspješno ste logirani u Bookshelf! ");
  } else {
    //res.redirect("/");
  }
});

signing.get("/logout", function(req, res) {
  if (!req.isAuthenticated()) 
  res.status(400).json("Niste bili logirani u Bookshelf. ");
  req.logout();
  req.session.destroy();
  res.status(200).json("Uspješno ste se izlogovali. Dođite nam opet! ");
});

module.exports = signing;
