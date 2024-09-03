import axios from 'axios';

const BASE_URL = 'https://villavitoria-development.up.railway.app/api/Usuario/ListaUsuario';

interface Cliente {
  id: number;
  nome: string;
}

export const getClients = async (): Promise<Cliente[]> => {
  try {
    const response = await axios.get<Cliente[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};
