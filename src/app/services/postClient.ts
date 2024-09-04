import axios from 'axios';

const POST_URL = 'https://villavitoria-development.up.railway.app/api/Cliente/AdicionaCliente';

interface Cliente {
  idCliente: number;
  nomeCliente: string;
  emailCliente: string;
  telefoneCliente: string;
  cnpj: string;
  indAtivo: boolean;
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

export const postClient = async (cliente: Cliente): Promise<void> => {
  try {
    await axios.post(POST_URL, cliente);
  } catch (error) {
    console.error('Erro ao adicionar cliente:', error);
    throw error;
  }
};
