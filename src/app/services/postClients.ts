import axios from 'axios';

const BASE_URL = 'https://villavitoria-development.up.railway.app/api/Cliente/AdicionaCliente';

interface Cliente {
    idCliente: number;
    nomeCliente: string;
    emailCliente: string;
    telefoneCliente: string;
    cnpj: string;
    idCategoria: number;
    inscricaoEstadual: string;
    estado: string;
    cidade: string;
    bairro: string;
    logradouro: string;
    numero: number;
    complemento: string;
    cep: string;
}


export const addCliente = async (cliente: Cliente): Promise<void> => {
  try {
    await axios.post(BASE_URL, cliente);
  } catch (error) {
    console.error('Erro ao adicionar cliente:', error);
    throw error;
  }
};
