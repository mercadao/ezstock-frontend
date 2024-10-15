import axios from 'axios';

const BASE_URL = 'https://villavitoriaapi-production.up.railway.app/api/CategoriaCliente';

export interface CategoriaCliente {
    idCategoria: number;
    desCategoriaCliente: string;
    descricao?: string;
}
  
export const getCategoriaClientes = async (): Promise<CategoriaCliente[]> => {
  try {
    const response = await axios.get<CategoriaCliente[]>(`${BASE_URL}/ListaCategoriasClientes`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias de clientes:', error);
    throw error;
  }
};

export const postCategoriaCliente = async (categoriaCliente: Omit<CategoriaCliente, 'idCategoriaCliente'>): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/AdicionaCategoriaCliente`, categoriaCliente);
  } catch (error) {
    console.error('Erro ao adicionar categoria de cliente:', error);
    throw error;
  }
};

export const editCategoriaCliente = async (categoriaCliente: Omit<CategoriaCliente, 'idCategoriaCliente'>, id: number): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/EditaCategoriaCliente/${id}`, categoriaCliente);
  } catch (error) {
    console.error('Erro ao editar categoria de cliente:', error);
    throw error;
  }
};

export const deleteCategoriaCliente = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/DeletaCategoriaCliente/${id}`);
  } catch (error) {
    console.error('Erro ao deletar categoria de cliente:', error);
    throw error;
  }
};
