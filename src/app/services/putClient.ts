import axios from 'axios';

// URL do endpoint da API para edição de clientes
const EDIT_URL = 'https://villavitoria-development.up.railway.app/api/Cliente/EditaCliente';

// Interface para o objeto Cliente
interface Cliente {
  idCliente: number;
  nomeCliente: string;
  emailCliente: string;
  telefoneCliente: string;
  cnpj: string;
  indAtivo: boolean;
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

// Função para editar um cliente
export const editClient = async (cliente: Cliente): Promise<void> => {
  try {
    await axios.put(`${EDIT_URL}/${cliente.idCliente}`, cliente);
  } catch (error) {
    // Log detalhado do erro
    console.error('Erro ao editar cliente:', error);
    // Pode-se optar por exibir um alerta ou mensagem específica ao usuário aqui
    throw new Error('Erro ao editar cliente. Por favor, tente novamente.');
  }
};
