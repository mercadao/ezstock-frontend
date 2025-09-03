import { useState, useEffect } from "react";
import Modal from "@/app/components/atoms/Modal";
import { getProdutos, Produto } from "@/app/services/productService";
import { getUsuarios, Usuario } from "@/app/services/userService";
import { getClients, Cliente } from "@/app/services/clientService";

interface EstoqueFormData {
  idEstoque?: number; // Opcional, caso seja usado para edição
  valorNovo: number; // Changed to string for better input handling
  idProduto: number;
  idUsuario: number;
  idCliente?: number; // Made optional
  tipoTransacao: number;
}

interface DinamicModalStockReduceProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: any;
  initialData?: any;
}

export default function DinamicModalStockReduce({
  isOpen,
  onClose,
  onSave,
  initialData,
}: DinamicModalStockReduceProps) {
  const [formData, setFormData] = useState<any>({
    valorNovo: "", // Changed to empty string
    idProduto: 0,
    idUsuario: 0,
    idCliente: 0,
  });

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  // Carrega produtos, usuários e clientes ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const [produtosData, usuariosData, clientesData] = await Promise.all([
            getProdutos(),
            getUsuarios(),
            getClients(),
          ]);
          setProdutos(produtosData);
          setUsuarios(usuariosData);
          setClientes(clientesData);
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      const {
        quantidadeAtual,
        dataInicioValidade,
        dataFinalValidade,
        dataCadastro,
        nomeProduto,
        indAtivo,
        valorKG,
        ...filteredData
      } = initialData;

      // Adiciona tipoTransacao ao objeto filtrado
      setFormData({
        ...filteredData,
        tipoTransacao: 2,
        valorNovo: filteredData.valorNovo ? filteredData.valorNovo.toString() : "", // Ensure valorNovo is string
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    console.log("e> ", e.target);

    const formattedValue = [
      "idProduto",
      "idUsuario",
      "idCliente",
      "tipoTransacao",
    ].includes(name)  // Removed "valorNovo" from parsing
      ? parseInt(value, 10) || 0
      : value;

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar se os campos obrigatórios foram preenchidos
    if (!formData.idProduto || !formData.idUsuario) {  // Removed idCliente check
      console.log(formData.idUsuario);
      console.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const dataToSend = {
      ...formData,
      valorNovo: parseFloat(formData.valorNovo) || 0, // Parse to number on submit
    };

    console.log("formData enviado: ", dataToSend);

    onSave(dataToSend);
  };

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const [produtosData, usuariosData, clientesData] = await Promise.all([
            getProdutos(),
            getUsuarios(),
            getClients(),
          ]);
          setProdutos(produtosData);
          setUsuarios(usuariosData);
          setClientes(clientesData);
  
          // Se houver apenas um usuário, define-o automaticamente
          if (usuariosData.length === 1) {
            setFormData((prev : any) => ({
              ...prev,
              idUsuario: usuariosData[0].idUsuario,
            }));
          }
          // Se houver apenas um cliente, define-o automaticamente
          if (clientesData.length === 1) {
            setFormData((prev : any) => ({
              ...prev,
              idCliente: clientesData[0].idCliente,
            }));
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };
      fetchData();
    }
  }, [isOpen]);
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Baixa de Estoque</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select para Produto */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="idProduto"
          >
            Produto
          </label>
          <select
            id="idProduto"
            name="idProduto"
            value={formData.idProduto}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value={0} disabled>
              Selecione um produto
            </option>
            {produtos.map((produto) => (
              <option key={produto.idProduto} value={produto.idProduto}>
                {produto.nomeProduto}
              </option>
            ))}
          </select>
        </div>

        {/* Select para Usuário */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="idUsuario"
          >
            Usuário
          </label>
          <select
            id="idUsuario"
            name="idUsuario"
            value={formData.idUsuario}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value={0} disabled>
              Selecione um usuário
            </option>
            {usuarios.map((usuario) => (
              <option key={usuario.idUsuario} value={usuario.idUsuario}>
                {usuario.nomeUsuario}
              </option>
            ))}
          </select>
        </div>

        {/* Select para Cliente */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="idCliente"
          >
            Cliente
          </label>
          <select
            id="idCliente"
            name="idCliente"
            value={formData.idCliente}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value={0}>
              Nenhum cliente
            </option>
            {clientes.map((cliente) => (
              <option key={cliente.idCliente} value={cliente.idCliente}>
                {cliente.nomeCliente}
              </option>
            ))}
          </select>
        </div>

        {/* Campo para Valor Novo */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="valorNovo"
          >
            Diminuir Valor
          </label>
          <input
            type="text"  // Changed from "number" to "text"
            id="valorNovo"
            name="valorNovo"
            value={formData.valorNovo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Botão de Salvar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full bg-primary-400 text-white py-2 rounded hover:bg-primary-600"
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
}
