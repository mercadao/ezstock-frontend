import axios from 'axios';

const BASE_URL = 'https://villavitoria-development.up.railway.app/api/MateriaPrima/ListaMateriasPrimas';

interface Item {
  idProduto: number;
  nomeProduto: string;
  indAtivo: boolean;
  valorKG: number;
}

export const getMateriaPrima = async (): Promise<Item[]> => {
  try {
    const response = await axios.get<{ materiaPrima: Item[] }>(BASE_URL);
    console.log(response);
    
    return response.data.materiaPrima;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};
