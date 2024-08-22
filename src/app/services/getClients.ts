import axios from 'axios';

const BASE_URL = 'https://villavitoria-development.up.railway.app/api/Cliente/ListaClientes';


interface Cliente {
  idCliente: number;
  nomeCliente: string;
  email: string;
  telefone: string;
  cnpj: string;
  inscricaoEstadual: string;
  cidade: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  estado: string;
}



export const getClients = async (): Promise<Cliente[]> => {
  try {
    const response = await axios.get<Cliente[]>(BASE_URL);
    console.log(response.data);
    return response.data.cliente;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};
