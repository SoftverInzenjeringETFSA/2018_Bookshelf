
const express = require("express");
const signing = express.Router();
const expressValidator = require("express-validator");
const { check, validationResult } = require("express-validator/check");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const uuid = require("uuid/v4");
const LocalStrategy = require("passport-local").Strategy;
const LokiStore = require("connect-loki")(session);
const User = require('../models/user');


//passport konfiguracija

passport.use(
  new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
    return new Promise((resolve, reject) => {
      console.log(User.find());
      User.find(user => user.username === username)
        .then((user, err) => {
          if (err) {
            reject(new Error("Server Error"));
          }
          if (!user) {
            return done(null, false, {
              message: "Pogrešno korisničko ime. ",
              error: 0
            });
          }
          if (!user.validatePassword(password, user.password)) {
            return done(null, false, {
              message: "Pogrešna lozinka. ",
              error: 0
            });
          }
          return done(null, user);
        })
        .catch(error => done(error));
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.find(user => user.id === id)
    .then(async user => {
      return await done(null, user);
      return;
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
signing.use(
  session({
    key: "id",
    genid: req => uuid(),
    secret: "harrypotterandchamberofsecrets",
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
signing.use(expressValidator());
signing.use(cookieParser());
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
signing.get('/login', (req, res) => {
  console.log(db.user.find());
    res.status(200).json("Uspješno ste došli do login stranice");
})

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
      res
        .status(200)
        .json("Uspješno ste logirani u Bookshelf! ");
    } else {
      //res.redirect("/");
    }
  });

  signing.get("/logout", function(req, res) {
    req.logout();
    req.session.destroy();
    res.status(200).json("Uspješno ste se izlogovali. Dođite nam opet! ");
  });

module.exports = signing;