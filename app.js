const express = require("express");
const app = express();

app.use(
    '/css',
    express.static(`${__dirname}/css/`)
);

app.use(
    '/class',
    express.static(`${__dirname}/class/`)
);

app.use(
    '/fonts',
    express.static(`${__dirname}/fonts/`)
);

app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});
app.listen(3000);
