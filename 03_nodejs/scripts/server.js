/*
 * Good approach to the http server with http:
 * https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module
 *
 * How to server multiple files:
 * https://stackoverflow.com/a/28838314/5969548
 */
var http = require('http');
var fs = require('fs').promises;

let indexFile;
let threeFile;
let cubeFile;

const requestListener = function(req, res) {
    switch (req.url) {
        case "/three.js":
            res.setHeader("Content-Type", "application/javascript");
            //res.headers["Content-Type"] = "application/javascript";
            res.setHeader("Content-Disposition", "attachment;filename=three.js");
            res.writeHead(200);
            res.end(threeFile);
            break;
        case "/show-cube.js":
            res.setHeader("Content-Type", "application/javascript");
            //res.headers["Content-Type"] = "application/javascript";
            //res.setHeader("Content-Disposition", "attachment;filename=three.js");
            res.writeHead(200);
            res.end(cubeFile);
            break;
        default:
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(indexFile);
    }
};

const host = "localhost";
const port = 3000;
const indexPath = __dirname + "/index-ref.html"

const server = http.createServer(requestListener);

fs.readFile(indexPath)
    .then(data => {
        indexFile = data;

        //server.listen(port, host, () => {
        //    console.log(`Server is running on http://${host}:${port}`);
        //});
    })
    .catch(err => {
        console.error(`Could not read file: ${err}`);
        process.exit(1);
    });

fs.readFile(__dirname + "/three.js")
    .then(data => {
        threeFile = data;
    })
    .catch(err => {
        console.error(`Could not read file: ${err}`);
        process.exit(1);
    });

fs.readFile(__dirname + "/show-cube.js")
    .then(data => {
        cubeFile = data;
    })
    .catch(err => {
        console.error(`Could not read file: ${err}`);
        process.exit(1);
    });

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
