import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Box, Button, Input } from '@chakra-ui/react';

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});

function App() {
  const [entrada, setEntrada] = useState('');
  const [saida, setSaida] = useState('');
  const [areCallButtonsVisible, setAreCallButtonsVisible] = useState(true);
  const [isFinishButtonActive, setIsFinishButtonActive] = useState(false);
  const [nome, setNome] = useState('');
  const [showEntrada, setShowEntrada] = useState(false);
  const [showSaida, setShowSaida] = useState(false);

  socket.on('connect', () => {
    console.log('Conectado ao servidor de sockets');
  });

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleEntrada = () => {
    socket.emit('batePontoEntrada', { nome });
    setShowEntrada(true);
    setShowSaida(false);
    setIsFinishButtonActive(true);
    setAreCallButtonsVisible(false);
  };

  const handleSaida = () => {
    socket.emit('batePontoSaida', { nome });
    setShowEntrada(false);
    setShowSaida(true);
    setIsFinishButtonActive(false); // Tornar o botão "Entrar" disponível novamente
    setAreCallButtonsVisible(true); // Tornar o botão "Entrar" visível novamente
  };

  socket.on('mostrarentrada', (oFamoso) => {
    setEntrada(oFamoso);
  });

  socket.on('mostrarSaida', (oFamoso) => {
    setSaida(oFamoso);
  });

  return (
    <div className="App">
      <Box>
        <Input
          placeholder="Insira seu nome"
          value={nome}
          onChange={handleNomeChange}
          marginBottom="1rem"
        />
        {areCallButtonsVisible && (
          <Button onClick={handleEntrada} colorScheme="blue">
            Entrar
          </Button>
        )}
        <div>
          {showEntrada && (
            <Box
              border="1px solid #ccc"
              padding="1rem"
              marginBottom="1rem"
              backgroundColor="#e0e0e0"
            >
              {entrada}
            </Box>
          )}
          {showSaida && (
            <Box
              border="1px solid #ccc"
              padding="1rem"
              marginBottom="1rem"
              backgroundColor="#e0e0e0"
            >
              {saida}
            </Box>
          )}
        </div>
        {isFinishButtonActive && (
          <Button onClick={handleSaida} colorScheme="red">
            Sair
          </Button>
        )}
      </Box>
    </div>
  );
}

export default App;
