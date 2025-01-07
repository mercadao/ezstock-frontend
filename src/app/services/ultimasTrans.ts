import axios from 'axios';

const BASE_URL = 'https://villavitoriaez.up.railway.app/api/Estoque';

// Interface para representar uma transação de estoque
export interface TransacaoEstoque {
  idTransacao: number;
  idProduto: number;
  idUsuario: number;
  idEstoque: number;
  idCliente: number;
  tipoTransacao: number;
  quantidadeKG: number;
  dataTransacao: string;
  valorTransacao: number;
}

// Serviço para buscar as últimas transações do estoque
export const getUltimasTransacoes = async (limite: number = 5): Promise<TransacaoEstoque[]> => {
  try {
    const response = await axios.get<TransacaoEstoque[]>(
      `${BASE_URL}/ListaUltimasTransacoes`,
      {
        params: { limite }, // Envia o limite como parâmetro de consulta (query param)
        headers: { 'accept': 'text/plain' }
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar últimas transações:', error.response?.data?.message || error.message);
    throw new Error('Erro ao buscar últimas transações.');
  }
};
