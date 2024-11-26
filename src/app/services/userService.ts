import axios from 'axios';

const BASE_URL = 'https://villavitoriaapi-production.up.railway.app/api/Usuario';

export interface Usuario {
    idUsuario: number;
    nomeUsuario: string;
    emailUsuario: string;
    senhaUsuario: string;
    dataNascimentoUsuario: string;
    indAtivo: boolean;
    imgPerfilUsuario?: string | null;
}

export const getUsuarios = async (): Promise<Usuario[]> => {
  try {
    const response = await axios.get<Usuario[]>(`${BASE_URL}/ListaUsuario`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const postUsuario = async (usuario: Omit<Usuario, 'idUsuario'>): Promise<void> => {

  try {
    await axios.post(`${BASE_URL}/AdicionaUsuario`, usuario);
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
    throw error;
  }
};

export const editUsuario = async (usuario: Omit<Usuario, 'idUsuario'>, id: number): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/EditaUsuario/${id}`, usuario);
  } catch (error) {
    console.error('Erro ao editar usuário:', error);
    throw error;
  }
};

export const deleteUsuario = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/DeletaUsuario/${id}`);
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};
