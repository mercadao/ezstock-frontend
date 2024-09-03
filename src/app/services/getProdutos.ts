import axios from 'axios';

const BASE_URL = 'https://villavitoria-development.up.railway.app/api/Produto/ListaProduto';

interface Produto {
  idProduto: number;
  nomeProduto: string;
  indAtivo: boolean;
  valorKG: number;
}

export const getProdutos = async (): Promise<Produto[]> => {
  try {
    const response = await axios.get<{ produto: Produto[] }>(BASE_URL);
    return response.data.produto;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};