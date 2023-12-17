const StateRepository = require('./module/repository/StateRepository');
const Authorizer = require('./module/user/Authorizer');
const Authentificator = require('./module/user/Authentificator');
const TokenStorage = require('./module/user/TokenCookieStorage');
const TokenRepository = require('./module/user/TokenRepository');
const UserRepository = require('./module/user/UserRepository');

let db = require('./database');
let repository = new StateRepository(db);
let tokenRepository = new TokenRepository(db);
let userRepository = new UserRepository(db);

const cookieParser = require("cookie-parser");
const express = require('express');
const app = express();

app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.use("/", function (request, response, next) {
    let tokenStorage = new TokenStorage(request, response);
    let authentificator = new Authentificator(tokenStorage, tokenRepository, userRepository);
    let isUrlIsLogin = request.url === "/login";

    authentificator.getUser(function (user) {
        if (isUrlIsLogin && user) {
            response.redirect("/");
        }

        if (!isUrlIsLogin && !user) {
            response.redirect("/login");
        }

        next();
    });

})
app.get("/", function (request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

app.post("/login", function (request, response) {
    let login = request.body.login;
    let password = request.body.password;

    let tokenStorage = new TokenStorage(request, response);
    let authorizer = new Authorizer(tokenStorage, userRepository, tokenRepository);

    authorizer.signup(login, password, function (isSuccess) {
        if (isSuccess) {
            response.redirect('/');
        } else {
            response.redirect('/login');
        }
    });
});

app.get("/login", function (request, response) {
    response.sendFile(__dirname + '/public/login.html');
});

app.post("/state/:id", function (request, response) {
    let tokenStorage = new TokenStorage(request, response);
    let authentificator = new Authentificator(tokenStorage, tokenRepository, userRepository);
    authentificator.getUser(function (user) {
        let id = user.login + "-" + request.params.id;
        repository.save(id, JSON.stringify(request.body));
        response.json(request.body);
    })
});

app.get("/state/:id", function (request, response) {
    let tokenStorage = new TokenStorage(request, response);
    let authentificator = new Authentificator(tokenStorage, tokenRepository, userRepository);

    authentificator.getUser(function (user) {
        let id = user.login + "-" + request.params.id;
        repository.get(id, function (state = "{}") {
            response.json(JSON.parse(state));
        });
    })
});

app.get("/logout", function (request, response, next) {
    let tokenStorage = new TokenStorage(request, response);
    let authorizer = new Authorizer(tokenStorage, userRepository, tokenRepository);

    authorizer.logout(function (isSuccess) {
        if (isSuccess) {
            response.redirect('/login');
        } else {
            response.redirect('/');
        }
    });
});

app.listen(3000);
