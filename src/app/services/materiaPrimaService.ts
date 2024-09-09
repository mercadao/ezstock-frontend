import axios from 'axios';

const BASE_URL = 'https://villavitoria-development.up.railway.app/api/MateriaPrima';

export interface MateriaPrima {
  idMateriaPrima: number;
  dscMateriaPrima: string;
}

// Função para listar todas as matérias-primas
export const getMateriaPrima = async (): Promise<MateriaPrima[]> => {
  try {
    const response = await axios.get<{ materiaPrima: MateriaPrima[] }>(`${BASE_URL}/ListaMateriaPrima`);
    return response.data.materiaPrima;
  } catch (error) {
    console.error('Erro ao buscar matérias-primas:', error);
    throw error;
  }
};

// Função para adicionar uma nova matéria-prima
export const addMateriaPrima = async (materiaPrima: Omit<MateriaPrima, 'idMateriaPrima'>): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/AdicionaMateriaPrima`, materiaPrima);
  } catch (error) {
    console.error('Erro ao adicionar matéria-prima:', error);
    throw error;
  }
};

// Função para editar uma matéria-prima existente
export const editMateriaPrima = async (id: number, materiaPrima: Omit<MateriaPrima, 'idMateriaPrima'>): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/EditaMateriaPrima/${id}`, materiaPrima);
  } catch (error) {
    console.error(`Erro ao editar matéria-prima com ID ${id}:`, error);
    throw error;
  }
};

// Função para deletar uma matéria-prima
export const deleteMateriaPrima = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/DeletaMateriaPrima/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar matéria-prima com ID ${id}:`, error);
    throw error;
  }
};
