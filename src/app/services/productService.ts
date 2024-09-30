import axios from 'axios';

const BASE_URL = 'https://villavitoriaapi-production.up.railway.app/api/Produto';

export interface Produto {
  idProduto?: number;
  nomeProduto: string;
  indAtivo?: boolean;
  valorKG: number;
}

// Serviço para buscar produtos
export const getProdutos = async (): Promise<Produto[]> => {
  try {
    const response = await axios.get<{ produto: Produto[] }>(`${BASE_URL}/ListaProduto`);
    return response.data.produto;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

// Serviço para adicionar produto
export const addProduto = async (produto: Omit<Produto, 'idProduto' | 'indAtivo'>): Promise<void> => {

  console.log('url:', `${BASE_URL}/AdicionaProduto`);
  console.log('produto:', produto);

  try {
    await axios.post(`${BASE_URL}/AdicionaProduto`, produto);
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    throw error;
  }
};

// Serviço para editar produto
export const editProduto = async (produto: Produto): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/EditaProduto/${produto.idProduto}`, produto);
  } catch (error) {
    console.error('Erro ao editar produto:', error);
    throw error;
  }
};

// Serviço para deletar produto
export const deleteProduto = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/DeletaProduto/${id}`);
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    throw error;
  }
};
