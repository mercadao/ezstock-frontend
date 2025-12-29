import axios from 'axios';

const BASE_URL = 'https://villavitoriaez.up.railway.app/api/EstoqueMateriaPrima';


// Tipos de transação
export const TRANSACTION_TYPE = {
  ENTRADA: 1,
  SAIDA: 2,
} as const;

// Interface para a resposta da API (como ela realmente vem)
export interface EstoqueMateriaPrimaAPI {
  idEstoqueMP: number;
  idMateriaPrima: number;
  quantidadeAtual: number;
  dataInicioValidade: string;
  dataFinalValidade: string;
  dataCadastro: string;
  idFornecedor: number | null;
  numeroLote: string;
  indAtivo: boolean;
  nomeMateriaPrima: string;
  nomeFornecedor: string;
}

// Interface para uso no frontend (mapeada da API)
export interface EstoqueMateriaPrima {
  idEstoqueMP?: number;
  idMateriaPrima: number;
  dscMateriaPrima: string;
  quantidadeKG: number;
  valorKG?: number;
  idFornecedorPadrao?: number;
  nomeFornecedor?: string;
  numeroLote?: string;
  dataInicioValidade?: string;
  dataFinalValidade?: string;
}

export interface RegistroMateriaPrima {
  idRegistro: number;
  idMateriaPrima: number;
  dscMateriaPrima: string;
  quantidadeKG: number;
  tipoTransacao: number;
  dscTipoTransacao: string;
  dataTransacao: string;
  observacao: string;
}

export interface TransacaoEstoque {
  idMateriaPrima: number;
  quantidadeKG: number;
  tipoTransacao: 1 | 2;
  observacao?: string;
  numeroLote?: string;
  idUsuario?: number;
}

export interface BaixaEstoque {
  idMateriaPrima: number;
  idUsuario: number;
  quantidadeKG: number;
  numeroLote?: string;
  observacao?: string;
}

export interface FiltroHistorico {
  idMateriaPrima?: number;
  dataInicio?: string;
  dataFim?: string;
  tipoTransacao?: number | null;
}

export interface ApiResponse<T> {
  sucesso: boolean;
  mensagem: string;
  data?: T;
}

/**
 * Lista todo o estoque de matéria prima
 */
export const listarEstoque = async (): Promise<EstoqueMateriaPrima[]> => {
  try {
    const response = await axios.get<EstoqueMateriaPrimaAPI[]>(
      `${BASE_URL}/ListaEstoqueMateriaPrima`
    );
    
    // Mapear a resposta da API para o formato esperado
    const dados = Array.isArray(response.data) ? response.data : [];
    return dados.map((item) => ({
      idEstoqueMP: item.idEstoqueMP,
      idMateriaPrima: item.idMateriaPrima,
      dscMateriaPrima: item.nomeMateriaPrima,
      quantidadeKG: item.quantidadeAtual,
      valorKG: 0,
      idFornecedorPadrao: item.idFornecedor || 0,
      nomeFornecedor: item.nomeFornecedor,
      numeroLote: item.numeroLote,
      dataInicioValidade: item.dataInicioValidade,
      dataFinalValidade: item.dataFinalValidade,
    }));
  } catch (error) {
    console.error('Erro ao listar estoque:', error);
    throw error;
  }
};

/**
 * Busca estoque específico de uma matéria prima
 */
export const buscarEstoqueEspecifico = async (
  idMateriaPrima: number
): Promise<EstoqueMateriaPrima> => {
  try {
    const response = await axios.get<EstoqueMateriaPrimaAPI[]>(
      `${BASE_URL}/ListaEstoqueMateriaPrima/${idMateriaPrima}`
    );

    const item = Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : null;
    
    if (!item) {
      throw new Error('Estoque não encontrado');
    }

    return {
      idEstoqueMP: item.idEstoqueMP,
      idMateriaPrima: item.idMateriaPrima,
      dscMateriaPrima: item.nomeMateriaPrima,
      quantidadeKG: item.quantidadeAtual,
      valorKG: 0,
      idFornecedorPadrao: item.idFornecedor || 0,
      nomeFornecedor: item.nomeFornecedor,
      numeroLote: item.numeroLote,
      dataInicioValidade: item.dataInicioValidade,
      dataFinalValidade: item.dataFinalValidade,
    };
  } catch (error) {
    console.error(
      `Erro ao buscar estoque da matéria prima ${idMateriaPrima}:`,
      error
    );
    throw error;
  }
};

/**
 * Registra uma entrada ou saída de estoque
 * tipoTransacao: 1 para entrada, 2 para saída
 */
export const registrarMovimento = async (
  transacao: TransacaoEstoque
): Promise<{ mensagem: string }> => {
  try {
    const response = await axios.post<{
      sucesso: boolean;
      mensagem: string;
    }>(`${BASE_URL}/AdicionaEstoqueMateriaPrima`, {
      idMateriaPrima: transacao.idMateriaPrima,
      quantidadeKG: transacao.quantidadeKG,
      tipoTransacao: transacao.tipoTransacao,
      observacao: transacao.observacao || '',
      numeroLote: transacao.numeroLote || `LOTE-${Date.now()}`,
      idUsuario: transacao.idUsuario || 0,
    });

    if (response.data.sucesso) {
      return { mensagem: response.data.mensagem };
    }
    throw new Error(response.data.mensagem);
  } catch (error: any) {
    const mensagem =
      error.response?.data?.mensagem ||
      error.message ||
      'Erro ao registrar movimento de estoque';
    console.error('Erro ao registrar movimento:', error);
    throw new Error(mensagem);
  }
};

/**
 * Registra uma baixa (saída) de estoque usando FIFO automático
 * O backend deduz automaticamente dos lotes mais antigos
 */
export const registrarBaixaEstoque = async (
  baixa: BaixaEstoque
): Promise<{ mensagem: string }> => {
  try {
    console.log('📦 Registrando baixa de estoque:', baixa);
    
    const response = await axios.post<{
      sucesso: boolean;
      mensagem: string;
    }>(`${BASE_URL}/BaixaEstoqueMateriaPrima`, {
      idMateriaPrima: baixa.idMateriaPrima,
      idUsuario: baixa.idUsuario,
      quantidadeKG: baixa.quantidadeKG,
      numeroLote: baixa.numeroLote || `SAIDA-${Date.now()}`,
      observacao: baixa.observacao || '',
    });

    console.log('✅ Resposta da baixa:', response.data);

    if (response.data.sucesso) {
      return { mensagem: response.data.mensagem };
    }
    throw new Error(response.data.mensagem);
  } catch (error: any) {
    const mensagem =
      error.response?.data?.mensagem ||
      error.message ||
      'Erro ao registrar baixa de estoque';
    console.error('❌ Erro ao registrar baixa:', error);
    throw new Error(mensagem);
  }
};

/**
 * Busca o histórico de transações com filtros opcionais
 */
export const buscarHistoricoTransacoes = async (
  filtros: FiltroHistorico
): Promise<RegistroMateriaPrima[]> => {
  try {
    const response = await axios.post<{
      sucesso: boolean;
      mensagem: string;
      registros: RegistroMateriaPrima[];
    }>(`${BASE_URL}/ListaTransacoes`, {
      idMateriaPrima: filtros.idMateriaPrima || null,
      dataInicio: filtros.dataInicio || null,
      dataFim: filtros.dataFim || null,
      tipoTransacao: filtros.tipoTransacao || null,
    });

    if (response.data.sucesso) {
      return Array.isArray(response.data.registros)
        ? response.data.registros
        : [];
    }
    throw new Error(response.data.mensagem);
  } catch (error) {
    console.error('Erro ao buscar histórico de transações:', error);
    throw error;
  }
};

/**
 * Formata data para o padrão DD/MM/YYYY HH:mm
 */
export const formatarDataTransacao = (dataString: string): string => {
  try {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
  } catch (error) {
    return dataString;
  }
};

/**
 * Formata quantidade com 2 casas decimais
 */
export const formatarQuantidade = (quantidade: number): string => {
  return quantidade.toFixed(2).replace('.', ',');
};

/**
 * Formata valor monetário em real
 */
export const formatarValor = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

/**
 * Obtém descrição do tipo de transação
 */
export const obterDescricaoTipoTransacao = (tipo: number): string => {
  return tipo === TRANSACTION_TYPE.ENTRADA ? 'Entrada' : 'Saída';
};

/**
 * Obtém o símbolo visual do tipo de transação
 */
export const obterSímboloTransacao = (tipo: number): string => {
  return tipo === TRANSACTION_TYPE.ENTRADA ? '⬆️' : '⬇️';
};

/**
 * Valida quantidade antes de registrar saída
 */
export const validarQuantidadeSaida = (
  disponivel: number,
  solicitado: number
): { válido: boolean; mensagem: string } => {
  if (solicitado <= 0) {
    return {
      válido: false,
      mensagem: 'A quantidade deve ser maior que 0',
    };
  }

  if (solicitado > disponivel) {
    return {
      válido: false,
      mensagem: `Estoque insuficiente. Disponível: ${formatarQuantidade(
        disponivel
      )} kg, Solicitado: ${formatarQuantidade(solicitado)} kg`,
    };
  }

  return { válido: true, mensagem: '' };
};

/**
 * Valida quantidade para entrada
 */
export const validarQuantidadeEntrada = (
  quantidade: number
): { válido: boolean; mensagem: string } => {
  if (quantidade <= 0) {
    return {
      válido: false,
      mensagem: 'A quantidade deve ser maior que 0',
    };
  }

  return { válido: true, mensagem: '' };
};
