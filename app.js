let db = require('./database');

const StateRepository = require('./module/repository/StateRepository');

let repository = new StateRepository(db);

const express = require('express');
const app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());

app.get("/", function (_, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get("/state/:id", function (request, response) {
    repository.get(request.params.id, function (state = "{}") {
        response.json(JSON.parse(state));
    });
});

app.post("/state/:id", function (request, response) {
    repository.save(request.params.id, JSON.stringify(request.body));
    response.json(request.body);
});

app.listen(3000);
