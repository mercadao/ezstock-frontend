import axios from 'axios';

const EDIT_URL = 'https://villavitoria-development.up.railway.app/api/Produto/EditaProduto';

interface Produto {
  idProduto: number;
  nomeProduto: string;
  indAtivo: boolean;
  valorKG: number;
}

export const editProduto = async (produto: Produto): Promise<void> => {
  try {
    await axios.put(`${EDIT_URL}/${produto.idProduto}`, produto);
  } catch (error) {
    console.error('Erro ao editar produto:', error);
    throw error;
  }
};
