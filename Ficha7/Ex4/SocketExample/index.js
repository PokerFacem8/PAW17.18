const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => { 
    socket.on('hello-message', data => console.log(data));
    socket.emit('server-answer', {
            message: 'server is calling you'
    });
});

//Example without jade
app.get('/', (req, res) => { 
   res.sendFile(__dirname + '/views/index.html');
}); 

http.listen(8000, () => { 
    console.log('Example app listening on port 8000!'); 
});
