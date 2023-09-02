const express = require('express');
const app = express();
const http = require('http');
const cors = require("cors");
const server = http.createServer(app);
const { Server } = require('socket.io'); // Importe a classe Server do socket.io

const io = new Server(server); // Crie uma instância do Socket.io e passe o servidor HTTP existente

app.use(cors());
app.use(express.json());

const registroEntrada = {};
const registrosaida = {}
let contador = 1
let contadorSaida = 1



app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

// Defina a lógica para manipular conexões de socket aqui
io.on('connection', (socket) => {
  console.log('Um cliente se conectou ao servidor de sockets');
 
 
 socket.on('batePontoEntrada', async ({nome}) => {
    console.log(nome)
    const agora = new Date()
    const horaData = agora.toLocaleString()
    const entrada = (`entrada as ${horaData}`)
    registroEntrada[contador]= {horaData, nome, id:`Entrada ${contador}`}
    contador++
    socket.emit("mostrarentrada", entrada)
    console.log(registroEntrada)

 })
 
 socket.on('batePontoSaida', async ({nome}) => {
    console.log(nome)
    const agora = new Date()
    const horaData = agora.toLocaleString()
    const saida = (`saida as ${horaData}`)
    registrosaida[contadorSaida]= {horaData, nome, id:`Saida ${contadorSaida}`}
    contadorSaida++
    socket.emit("mostrarSaida", saida)
    console.log(registrosaida)
 })


 
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});
