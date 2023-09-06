import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cliente() {
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    // Faça a solicitação para a API
    axios.get('http://localhost:8080/clientes')
  .then(response => {
    setCliente(response.data);
  })
  .catch(error => {
    console.error('Erro na solicitação:', error);
  });
  }, []);

  if (!cliente) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Detalhes do Cliente</h1>
      <p>ID: {cliente.id}</p>
      <p>Nome: {cliente.nome}</p>
      <p>CPF: {cliente.cpf}</p>
    </div>
  );
}

export default Cliente;
