import axios from 'axios';

const BASE_URL = 'https://villavitoriaapi-production.up.railway.app/api/Estoque';

export interface Estoque {
  idProduto: number;
  idCliente?: number;
  idEstoque?: number | undefined;
  idUsuario: number;
  valorNovo: number;
  qtdTotalEmTela: number;
  quantidadeAtual?: number;
  dataInicioValidade: string;
  dataFinalValidade: string;
  indAtivo: number;
  tipoTransacao: number;
}

export interface MenosEstoque {
  idEstoque: number | undefined;
  valorNovo: number;
}

export const getEstoques = async (): Promise<Estoque[]> => {
  try {
    const response = await axios.get<Estoque[]>(`${BASE_URL}/ObterEstoque`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar estoques:', error);
    throw error;
  }
};

export const getEstoqueEspecifico = async (id: number): Promise<Estoque> => {
  try {
    const response = await axios.get<Estoque>(`${BASE_URL}/ObterEstoque/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar estoque específico:', error);
    throw error;
  }
};

export const getProdutoEstoque = async (id: number): Promise<Estoque> => {
  try {
    const response = await axios.get<Estoque>(`${BASE_URL}/ObterProdutoEstoque/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produto no estoque:', error);
    throw error;
  }
};

export const postBaixaEstoque = async (estoque: any): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/BaixaEstoque`, estoque);
  } catch (error) {
    console.error('Erro ao dar baixa no estoque:', error);
    throw error;
  }
};

export const postAdicionaEstoque = async (estoque: Estoque): Promise<void> => {

  console.log(`${BASE_URL}/AdicionaEstoque`);
  console.log("post estoque: ", estoque);

  try {
    await axios.post(`${BASE_URL}/AdicionaEstoque`, estoque);
  } catch (error) {
    console.error('Erro ao adicionar estoque:', error);
    throw error;
  }
};
