import axios from 'axios';

interface LoginRequestBody {
  emailInformado: string;
  senhaInformada: string;
}

interface LoginResponse {
  sucesso: boolean;
  mensagem: string;
  idUsuario: number;
  token: string | null;
}

const LOGIN_URL = 'https://villavitoriaapi-production.up.railway.app/api/Login/Login';

export const login = async (email: string, senha: string): Promise<LoginResponse> => {
  try {
    const requestBody: LoginRequestBody = {
      emailInformado: email,
      senhaInformada: senha,
    };

    const response = await axios.post<LoginResponse>(LOGIN_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Repassa a mensagem de erro da API para o componente
      return error.response.data;
    } else {
      // Erro desconhecido
      return { sucesso: false, mensagem: 'Erro desconhecido', idUsuario: 0, token: null };
    }
  }
};
