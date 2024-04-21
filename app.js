const StateRepository = require('./module/server/repository/StateRepository');
const Authorizer = require('./module/server/user/Authorizer');
const Authentificator = require('./module/server/user/Authentificator');
const TokenStorage = require('./module/server/user/TokenCookieStorage');
const TokenRepository = require('./module/server/user/TokenRepository');
const UserRepository = require('./module/server/user/UserRepository');

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
app.use('/img', express.static(__dirname + '/public/img'));

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.use("/", async function (request, response, next) {
    let tokenStorage = new TokenStorage(request, response);
    let authentificator = new Authentificator(tokenStorage, tokenRepository, userRepository);
    let isUrlIsLogin = request.url === "/login";
    let user = await authentificator.getUser();

    if (isUrlIsLogin && user) {
        response.redirect("/");
    }

    if (!isUrlIsLogin && !user) {
        response.redirect("/login");
    }

    next();
})

app.get("/", function (request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

app.post("/login", async function (request, response) {
    let login = request.body.login;
    let password = request.body.password;

    let tokenStorage = new TokenStorage(request, response);
    let authorizer = new Authorizer(tokenStorage, userRepository, tokenRepository);

    let isSuccess = await authorizer.signup(login, password);

    if (isSuccess) {
        response.redirect('/');
    } else {
        response.redirect('/login');
    }
});

app.get("/login", function (request, response) {
    response.sendFile(__dirname + '/public/login.html');
});

app.post("/state/:id", async function (request, response) {
    let tokenStorage = new TokenStorage(request, response);
    let authentificator = new Authentificator(tokenStorage, tokenRepository, userRepository);
    let user = await authentificator.getUser();
    let id = user.login + "-" + request.params.id;
    await repository.save(id, request.body);
    response.json(request.body);
});

app.get("/state/:id", async function (request, response) {
    let tokenStorage = new TokenStorage(request, response);
    let authentificator = new Authentificator(tokenStorage, tokenRepository, userRepository);
    let user = await authentificator.getUser();
    let id = user.login + "-" + request.params.id;
    let state = await repository.get(id);
    response.json(state !== null ? state : {});
});

app.get("/logout", async function (request, response, next) {
    let tokenStorage = new TokenStorage(request, response);
    let authorizer = new Authorizer(tokenStorage, userRepository, tokenRepository);

    await authorizer.logout();
    response.redirect('/login');
});

app.listen(3000);
