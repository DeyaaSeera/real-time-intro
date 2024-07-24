import { createServer } from 'http';

import { Server } from 'socket.io';

const server = createServer();
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});


io.on('connection', (socket) => {
    socket.on('client-ready', () => {
      socket.broadcast.emit('get-canvas-state')
    })
  
    socket.on('canvas-state', (state) => {
      console.log('received canvas state')
      socket.broadcast.emit('canvas-state-from-server', state)
    })
  
    socket.on('draw-line', ({ prevPoint, currentPoint, color }) => {
      socket.broadcast.emit('draw-line', { prevPoint, currentPoint, color })
    })
  
    socket.on('clear', () => io.emit('clear'))
  })

server.listen(3001, ()=> {
    console.log('Server Lisitining to 3001')
});

