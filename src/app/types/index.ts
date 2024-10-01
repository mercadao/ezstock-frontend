export interface Item {
    idProduto: number;
    nomeProduto: string;
    indAtivo: boolean;
    valorKG: number;
    [key: string]: any; 
}
  
export interface Cliente{
    idCliente: number;
    nomeCliente: string;
    cnpj: string;
    email: string;
    telefone: string;
    cidade: string;
    estado: string;
    bairro: string;
    logradouro: string;
    numero: string;
    complemento: string;
    cep: string;

}

export interface Produto{
    idProduto: number;
    nomeProduto: string;
    indAtivo: boolean;
    valorKG: number;
}