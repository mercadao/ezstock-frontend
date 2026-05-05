import axios from "axios";

const BASE_URL = "https://villavitoriaez.up.railway.app/api/Movimentacao";

export interface Movimentacao {
  idMovimentacao: number;
  idUsuario: number;
  modulo: string;
  acao: string;
  idRegistroAfetado?: number | null;
  descricao?: string | null;
  dadosAntes?: string | null;
  dadosDepois?: string | null;
  dataMovimentacao: string;
  nomeUsuario?: string | null;
}

export interface FiltroMovimentacao {
  idUsuario?: number | null;
  modulo?: string | null;
  acao?: string | null;
  dataInicio?: string | null;
  dataFim?: string | null;
}

export interface ResultadoMovimentacao {
  sucesso: boolean;
  mensagem: string;
  registros: Movimentacao[];
}

export const listarMovimentacoes = async (
  filtro: FiltroMovimentacao
): Promise<Movimentacao[]> => {
  try {
    const response = await axios.post<ResultadoMovimentacao>(
      `${BASE_URL}/Listar`,
      filtro
    );

    if (response.data.sucesso) {
      return response.data.registros;
    }
    throw new Error(response.data.mensagem);
  } catch (error) {
    throw error;
  }
};
