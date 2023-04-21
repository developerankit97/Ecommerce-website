const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    if (url == '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Welcome Home</h1>');
        return res.end();
    } else if (url == '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Welcome to About Us Page</h1>');
        return res.end();
    } else if (url == '/node') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Welcome to my Node Js project</h1>');
        return res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 Not Found</h1>');
        return res.end();
    }
});

server.listen(4000);