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

export interface MateriaPrima {
    idRegistro: number;
    idMateriaPrima: number;
    idProduto: number;
    idFornecedor: number;
    idUsuario: number;
    quantidadeKG: number;
    dataProducao: string; 
    dataLote: string; 
    dataRegistro: string; 
}
  
export interface Estoque {
    idEstoque: number;
    idProduto: number;
    quantidadeAtual: number;
    dataInicioValidade: string; 
    dataFinalValidade: string; 
    dataCadastro: string; 
}

export interface Usuario {
    idUsuario: number;
    nomeUsuario: string;
    emailUsuario: string;
    senhaUsuario: string; 
    dataNascimentoUsuario: string; 
    indAtivo: boolean;
    imgPerfilUsuario: string | null;
}
