const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url == '/home') {
        fs.readFile('message.txt', 'utf-8', (err, data) => {
            if (data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<html>');
                res.write('<head><title>Enter Message</title></head><body>');
                res.write(data);
                res.write('<form action="/message" method="POST"><input type="text" name="msg"><button type="submit">Add Message</button></form>');
                res.write('</body></html>');
                return res.end();
            }
        });
    } else if (url == '/message' && method == 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        return req.on('end', () => {
            const parsedData = Buffer.concat(body).toString();
            fs.writeFile('message.txt', parsedData.split("=")[0], (err) => {
                res.writeHead(302, { 'Location': '/home' });
                return res.end();
            });
        });
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
}


module.exports = requestHandler;