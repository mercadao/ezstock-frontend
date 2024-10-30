"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Divider from "@/app/components/atoms/Divider";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import Table from "@/app/components/organisms/Table";
import DynamicModal from "@/app/components/molecules/DinamicModal";

// Services
import {
  getEstoques,
  postAdicionaEstoque,
  postBaixaEstoque,
  Estoque,
} from "@/app/services/stockService";

import { getClients, Cliente } from "@/app/services/clientService";
import { getCategoriaClientes } from "@/app/services/clientCategoryService";


import { getProdutoEspecifico } from "@/app/services/productService";

// Importando o hook SearchStore correto
import { useSearchStore } from "@/app/hooks/searchHook"; 

export default function EstoquePage() {

  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [produtos, setProdutos] = useState<{ [key: number]: string }>({});
  const [selectedEstoque, setSelectedEstoque] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [readMode, setReadMode] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const [clientData, setClientData] = useState<Cliente[]>([]);
  const [clientCategorysData, setClientCategorysData] = useState<any[]>([]);
  const [clienteSelectedId, setClienteSelectedId] = useState<number>(0);

  const { estoqueSearch, setEstoqueSearch } = useSearchStore();

  useEffect(() => {
    const fetchEstoques = async () => {
      try {
        const response = await getEstoques();

        // Filtrando para pegar a primeira incidência de cada produto
        const firstOccurrenceEstoques = response;

        setEstoques(firstOccurrenceEstoques);

        const produtoNames: { [key: number]: string } = {};
        await Promise.all(
          firstOccurrenceEstoques.map(async (estoque) => {
            try {
              const produtoResponse = await getProdutoEspecifico(estoque.idProduto);
              if (produtoResponse.sucesso && produtoResponse.produto) {
                produtoNames[estoque.idProduto] =
                  produtoResponse.produto.nomeProduto;
              } else {
                produtoNames[estoque.idProduto] = "Produto não encontrado";
              }
            } catch (error) {
              console.error(`Erro ao buscar produto ${estoque.idProduto}:`, error);
              produtoNames[estoque.idProduto] = "Erro ao carregar produto";
            }
          })
        );
        setProdutos(produtoNames);
        fetchData();
      } catch (error) {
        console.error("Erro ao buscar estoques:", error);
        toast.error("Erro ao buscar estoques.");
      } finally {
        setLoading(false);
      }
    };

    fetchEstoques();
  }, []);

  const fetchData = async () => {
    try {
      const clients = await getClients();

      const options = clients.map((client: any) => ({
        value: client.idCliente,
        label: client.nomeCliente,
      }));

      setCategoryOptions(options);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };


  const filteredEstoques = estoques.filter((estoque) =>
    produtos[estoque.idProduto]
      ?.toLowerCase()
      .includes(estoqueSearch.toLowerCase())
  );

  const headerData = ["Nome Produto", "Qtd Total", "Ativo", "Ações"];

  const tableData = filteredEstoques.map((estoque) => [
    produtos[estoque.idProduto] || "Carregando...",
    estoque.quantidadeAtual,
    estoque.indAtivo ? "Sim" : "Não",
  ]);

  const handleRead = (rowIndex: number) => {
    const estoque = filteredEstoques[rowIndex];
    setSelectedEstoque(estoque);
    setReadMode(true);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleAddEstoque = () => {
    setSelectedEstoque({
      idProduto: 0,
      idCliente: 0,
      idEstoque: 0,
      idUsuario: 0,
      valorNovo: 0,
      qtdTotalEmTela: 0,
      dataInicioValidade: "",
      dataFinalValidade: "",
      indAtivo: 1,
      tipoTransacao: 1,
    });
    setReadMode(false);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleEdit = (rowIndex: number, idCliente: number) => {
    const estoque = filteredEstoques[rowIndex];

    console.log("estoque json:", estoque);

    setSelectedEstoque({
      idEstoque: estoque.idEstoque,
      valorNovo: 1,
      idProduto: estoque.idProduto,
      idUsuario: 13,
      idCliente: clienteSelectedId,
      tipoTransacao: 1,
    });
    setReadMode(false);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleSave = async (updatedEstoque: Estoque) => {

    const idCliente = clienteSelectedId;
    updatedEstoque.idCliente = idCliente;
    
    try {
      if (isEditMode) {
        await postBaixaEstoque(updatedEstoque);
        toast.success("Baixa de estoque realizada com sucesso!", {
          className: "bg-blue-500 text-white p-4 rounded",
        });
      } else {
        await postAdicionaEstoque(updatedEstoque);
        toast.success("Novo estoque adicionado!", {
          className: "bg-green-500 text-white p-4 rounded",
          progressClassName: "bg-white",
        });
      }
      setModalOpen(false);
      setEstoques(await getEstoques());
    } catch (error) {
      toast.error("Erro ao salvar estoque.", {
        className: "bg-red-500 text-white p-4 rounded",
        progressClassName: "bg-white",
      });
      console.error("Erro ao salvar estoque:", error);
    }
  };

  if (loading) {
    return <p>Carregando estoques...</p>;
  }


  return (
    <div className="my-4 w-full p-10">
      <h1 className="text-primary-900 text-2xl font-extrabold">Estoque</h1>

      <PainelHeader
        title="Tabela de Estoques"
        onAddClientClick={handleAddEstoque}
        buttonText="+ Adicionar Estoque"
        itemSearch={estoqueSearch}
        setItemSearch={setEstoqueSearch}
      />

      <Divider />

      <Table
        headerData={headerData}
        data={tableData}
        onClickRead={handleRead}
        onClickEdit={handleEdit}
        deleteHidden={true}
      />

      {selectedEstoque && (
        <DynamicModal
          data={selectedEstoque}
          isEditMode={isEditMode}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          isReadOnly={readMode}
          onSave={handleSave}
          selectLabel="Selecione o Cliente"  
          selectOptions={categoryOptions} 
          selecetData={setClienteSelectedId}
        />
      )}

      <ToastContainer position="top-center" />
    </div>
  );
}
