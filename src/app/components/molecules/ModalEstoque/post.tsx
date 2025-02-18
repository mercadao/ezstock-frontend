import { useState, useEffect } from "react";
import Modal from "@/app/components/atoms/Modal";
import { getProdutos, Produto } from "@/app/services/productService";
import { getClients, Cliente } from "@/app/services/clientService";
import { getUsuarios, Usuario } from "@/app/services/userService";
import { useRouter } from "next/navigation";

interface EstoqueFormData {
  idProduto: number;
  idCliente: number;
  idUsuario: number;
  valorNovo: string;
  qtdTotalEmTela: string;
  dataInicioValidade: string;
  dataFinalValidade: string;
  indAtivo: number;
  tipoTransacao: number;
}

interface DinamicModalStockPostProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: any;
  initialData?: any;
}

export default function DinamicModalStockPost({
  isOpen,
  onClose,
  onSave,
  initialData,
}: DinamicModalStockPostProps) {
  const [formData, setFormData] = useState<EstoqueFormData>({
    idProduto: 0,
    idCliente: 0,
    idUsuario: 0,
    valorNovo: "",
    qtdTotalEmTela: "",
    dataInicioValidade: "",
    dataFinalValidade: "",
    indAtivo: 1,
    tipoTransacao: 1,
  });

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const router = useRouter();
  

  // Carrega produtos, clientes e usuários ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const [produtosData, clientesData, usuariosData] = await Promise.all([
            getProdutos(),
            getClients(),
            getUsuarios(),
          ]);
          setProdutos(produtosData);
          setClientes(clientesData);
          setUsuarios(usuariosData);
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const formattedValue = ["idProduto", "idCliente", "idUsuario"].includes(name)
      ? parseInt(value, 10) || 0
      : value;

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      idProduto: formData.idProduto,
      valorNovo: parseFloat(formData.valorNovo) || 0,
      qtdTotalEmTela: parseFloat(formData.qtdTotalEmTela) || 0,
      dataInicioValidade: new Date(formData.dataInicioValidade).toISOString(),
      dataFinalValidade: new Date(formData.dataFinalValidade).toISOString(),
    };

    await onSave(formattedData);
    router.refresh(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">
        {initialData ? "Editar Estoque" : "Adicionar Estoque"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select dinâmico para ID do Produto */}
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="idProduto">
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

        {/* Select dinâmico para ID do Cliente */}
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="idCliente">
            Cliente
          </label>
          <select
            id="idCliente"
            name="idCliente"
            value={formData.idCliente}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value={0} disabled>
              Selecione um cliente
            </option>
            {clientes.map((cliente) => (
              <option key={cliente.idCliente} value={cliente.idCliente}>
                {cliente.nomeCliente}
              </option>
            ))}
          </select>
        </div>

        {/* Select dinâmico para ID do Usuário */}
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="idUsuario">
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

        {/* Outros campos */}
        {[ 
          { name: "valorNovo", label: "Adicionar valor" },
        ].map(({ name, label }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
              {label}
            </label>
            <input
              id={name}
              type="text"
              name={name}
              placeholder={label}
              value={formData[name as keyof EstoqueFormData]}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        {/* Datas */}
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="dataInicioValidade">
            Data de Início da Validade
          </label>
          <input
            id="dataInicioValidade"
            type="date"
            name="dataInicioValidade"
            value={formData.dataInicioValidade}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="dataFinalValidade">
            Data Final da Validade
          </label>
          <input
            id="dataFinalValidade"
            type="date"
            name="dataFinalValidade"
            value={formData.dataFinalValidade}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="w-full bg-primary-400 text-white py-2 rounded hover:bg-primary-600"
        >
          {initialData ? "Salvar Alterações" : "Adicionar Estoque"}
        </button>
      </form>
    </Modal>
  );
}
