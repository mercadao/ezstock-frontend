import axios from 'axios';

const BASE_URL = 'https://villavitoria-development.up.railway.app/api/CategoriaCliente/ListaCategoriasClientes';


interface CategoriaCliente {
  idCategoria: number;
  desCategoriaCliente: string;
}



export const getCategoriaCliente = async (): Promise<CategoriaCliente[]> => {
  try {
    const response = await axios.get<CategoriaCliente[]>(BASE_URL);
    console.log(response.data);
    return response.data.categoriaCliente;
  } catch (error) {
    console.error('Erro ao buscar categoriaCliente:', error);
    throw error;
  }
};