import axios from 'axios';

const BASE_URL = 'https://villavitoria-development.up.railway.app/api/Produto/AdicionaProduto';

interface Produto {
  idProduto: number;
  nomeProduto: string;
  indAtivo: boolean;
  valorKG: number;
}

export const addProduto = async (produto: Produto): Promise<void> => {
  try {
    await axios.post(BASE_URL, produto);
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    throw error;
  }
};
