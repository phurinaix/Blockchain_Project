const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const app = express();
const jsonpack = require('jsonpack/main')
const port = process.env.PORT || 8080;

app.use(bodyParser.json({
    limit: '20mb'
}));
  
app.use(bodyParser.urlencoded({
    limit: '20mb',
    parameterLimit: 100000,
    extended: true 
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send("hahaha");
});

app.post('/create', (req, res) => {
    backURL = req.header('Referer') || '/';
    
    var data = JSON.stringify(JSON.parse(req.body.result));
    fs.writeFile('certificate/certificate.json', data, function (err) {
        if (err) throw err;
        res.redirect(backURL);
    });
});

app.get('/read', (req, res) => {
    // fs.readFile('certificate/certificate.json', (err, data) => {
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     res.write(data);
    //     res.end();
    // });
    res.sendFile('certificate/certificate.json' , { root : __dirname});
    // res.sendFile( __dirname + "/certificate/" + "certificate.json" );
});

app.listen(port, () => {
    console.log('Starting server...');
});