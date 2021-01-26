const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if(req.method == 'GET'){
        var fileUrl;
        if(req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public'+fileUrl);
        const fileExt = path.extname(filePath);
        if(fileExt == '.html'){
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if(err){
                    res.statusCode = 404;
                    res.setHeader('Content-Type','text/html');
                    res.end(`<html><body><h1>${req.url} not found!</h1><h4>${err}</h4></body></html>`);
                    return;
                }
                
                res.statusCode = 200;
                res.setHeader('Content-Type','text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        } 
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type','text/html');
            res.end(`<html><body><h1>${req.url} not an html file!</h1></body></html>`);

            return;
        }

    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type','text/html');
        res.end(`<html><body><h1>${req.method} not supported!</h1><h4>Error: ${err}</h4></body></html>`); 
        return;
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})