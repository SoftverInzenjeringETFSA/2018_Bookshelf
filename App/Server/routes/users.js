
const express = require("express");
const users = express.Router();
const expressValidator = require("express-validator");
const { check, validationResult } = require("express-validator/check");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const uuid = require("uuid/v4");
const LocalStrategy = require("passport-local").Strategy;
const LokiStore = require("connect-loki")(session);
//const db =

let Users = [
  { id: 1, email: "neno93993@gmail.com", password: "password", validatePassword: function(pass1, pass2) { return pass1 === pass2} },
  { id: 2, email: "none@gmail.com", password: "password" }
];

//passport konfiguracija

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    return new Promise((resolve, reject) => {
      Users.find(user => user.email === email)
        .then((user, err) => {
          if (err) {
            reject(new Error("Server Error"));
          }
          if (!user) {
            return done(null, false, {
              message: "Pogrešna email adresa. ",
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
  Users.find(user => user.id === id)
    .then(async user => {
      return await done(null, user);
      return;
    })
    .catch(error => {
      done(error, false);
    });
});

users.use(bodyParser());
users.use(bodyParser.json());
users.use(
  bodyParser.urlencoded({
    extended: true
  })
);
users.use(
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
users.use(passport.initialize());
users.use(passport.session());
users.use(expressValidator());
users.use(cookieParser());
users.use((req, res, next) => {
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
users.get('/login', (req, res) => {
    res.status(200).json("Uspješno ste došli do login stranice");
})

users.post(
    "/login",
    [
      check("email")
        .isEmail()
        .withMessage("Morate unijeti validnu email adresu. "),
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
  
  users.get("/authrequired", (req, res) => {
    if (req.isAuthenticated()) {  
      res
        .status(200)
        .json("Uspješno ste logirani u Bookshelf! ");
    } else {
      //res.redirect("/");
    }
  });

  users.get("/logout", function(req, res) {
    req.logout();
    req.session.destroy();
    res.status(200).json("Uspješno ste se izlogovali. Dođite nam opet! ");
  });

module.exports = users;