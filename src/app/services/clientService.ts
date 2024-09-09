import axios from 'axios';

const BASE_URL = 'https://villavitoria-development.up.railway.app/api/Cliente';

export interface Cliente {
  idCliente: number;
  nomeCliente: string;
  emailCliente: string;
  telefoneCliente: string;
  cnpj: string;
  idCategoria: number;
  inscricaoEstadual?: string;
  estado: string;
  cidade: string;
  bairro?: string;
  logradouro: string;
  numero: number;
  complemento?: string;
  cep: string;
}

export const getClients = async (): Promise<Cliente[]> => {
  try {
    const response = await axios.get<Cliente[]>(`${BASE_URL}/ListaCliente`);
    return response.data.cliente;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

export const postClient = async (cliente: Omit<Cliente, 'idCliente' | 'indAtivo'>): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/AdicionaCliente`, cliente);
  } catch (error) {
    console.error('Erro ao adicionar cliente:', error);
    throw error;
  }
};

export const editClient = async (cliente: Omit<Cliente, 'idCliente'>, id: number): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/EditaCliente/${id}`, cliente);
  } catch (error) {
    console.error('Erro ao editar cliente:', error);
    throw error;
  }
};

export const deleteClient = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/DeletaCliente/${id}`);
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    throw error;
  }
};
