import axios from 'axios';

const BASE_URL = 'https://villavitoria-development.up.railway.app/api/Produto/DeletaProduto';

export const deleteProduto = async (idProduto: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${idProduto}`);
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        throw error;
    }
};
