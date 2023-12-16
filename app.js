const express = require('express');
const app = express();

app.use('/public', express.static(__dirname + '/public'));

app.get("/", function(_, response){
    response.sendFile(__dirname + '/index.html');
});

app.listen(3000);