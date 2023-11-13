// create web server
// create a server object:
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring');
const port = 8080;

const server = http.createServer((req, res) => {
    // parse URL
    const parsedUrl = url.parse(req.url);

    // extract URL path
    let pathname = `.${parsedUrl.pathname}`;

    // maps file extention to MIME types
    const mimeType = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword'
    };
    const ext = path.parse(pathname).ext;
    //console.log(ext);
    pathname = pathname.replace('/', '');
    //console.log(pathname);
    if (pathname === 'comments') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });
            req.on('end', () => {
                const parsedBody = qs.parse(body);
                //console.log(parsedBody);
                fs.appendFile('comments.txt', parsedBody.comment + '\n', function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end('Data saved!');
            });
        } else {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            res.end('Not found!');
        }
    } else {
        //  read file from file system
        fs.readFile(pathname, function (err, data) {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                return res.end('404 Not Found');
            }
            // if the file is found, set Content-type and send data
            res.setHeader('Content-type', mimeType[ext] || 'text/plain