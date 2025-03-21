import { useEffect, useState } from "react";
import Modal from "@/app/components/atoms/Modal";
import { Estoque, getEstoqueEspecifico } from "@/app/services/stockService";
import { getProdutoEspecifico, Produto } from "@/app/services/productService";

interface DinamicModalStockGetProps {
  isOpen: boolean;
  onClose: () => void;
  estoqueId: number;
}

export default function DinamicModalStockGet({
  isOpen,
  onClose,
  estoqueId,
}: DinamicModalStockGetProps) {


  const [produtoNome, setProdutoNome] = useState("");
  const [estoque, setEstoque] = useState<Estoque | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen && estoqueId) {
      const fetchEstoque = async () => {
        try {
          const data = await getEstoqueEspecifico(estoqueId);
          if(data){
            const produtoData = await getProdutoEspecifico(data.idProduto);
            setProdutoNome(produtoData.produto.nomeProduto);
          }
          setEstoque(data);
        } catch (error) {
          console.error("Erro ao carregar estoque específico:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEstoque();
    }
  }, [isOpen, estoqueId]);

  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Detalhes do Estoque</h2>
      {estoque ? (
        <div className="space-y-4">
          {/* Exibe os dados do estoque nos campos de input */}
          <div>
            <label className="block">Produto</label>
            <input
              type="text"
              value={produtoNome}
              readOnly
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block">Quantidade Atual</label>
            <input
              type="number"
              value={estoque.quantidadeAtual || 0}
              readOnly
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block">Data de Início da Validade</label>
            <input
              type="text"
              value={new Date(estoque.dataInicioValidade).toLocaleDateString()}
              readOnly
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block">Data Final da Validade</label>
            <input
              type="text"
              value={new Date(estoque.dataFinalValidade).toLocaleDateString()}
              readOnly
              className="w-full p-2 border rounded"
            />
          </div>

         
        </div>
      ) : (
        <p>Estoque não encontrado.</p>
      )}
    </Modal>
  );
}
