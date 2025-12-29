"use client";

import { useState, useEffect } from "react";
import Modal from "@/app/components/atoms/Modal";
import Button from "@/app/components/atoms/Button/DefaultButton";
import { getMateriaPrima, MateriaPrima } from "@/app/services/materiaPrimaService";
import { getUsuarios, Usuario } from "@/app/services/userService";
import {
  registrarMovimento,
  validarQuantidadeEntrada,
  TRANSACTION_TYPE,
  EstoqueMateriaPrima,
} from "@/app/services/rawMaterialStockService";
import toast from "react-hot-toast";
import { MdAdd, MdLocalShipping } from "react-icons/md";
import { BiSolidPackage } from "react-icons/bi";
import { FaUserCircle, FaWeightHanging, FaBarcode, FaStickyNote } from "react-icons/fa";

interface ModalEstoqueEntradaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
  estoque?: EstoqueMateriaPrima;
}

export default function ModalEstoqueEntrada({
  isOpen,
  onClose,
  onSave,
  estoque,
}: ModalEstoqueEntradaProps) {
  const [materiasPrimas, setMateriasPrimas] = useState<MateriaPrima[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [formData, setFormData] = useState({
    idMateriaPrima: 0,
    quantidadeKG: "",
    observacao: "",
    numeroLote: "",
    idUsuario: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadMateriaPrimas();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && estoque) {
      setFormData((prev) => ({
        ...prev,
        idMateriaPrima: estoque.idMateriaPrima,
      }));
    }
  }, [isOpen, estoque]);

  const loadMateriaPrimas = async () => {
    try {
      const [materiasData, usuariosData] = await Promise.all([
        getMateriaPrima(),
        getUsuarios(),
      ]);
      setMateriasPrimas(materiasData);
      setUsuarios(usuariosData);
      
      // Se não tiver estoque pré-selecionado, usar o primeiro da lista
      if (!estoque && materiasData.length > 0) {
        setFormData((prev) => ({
          ...prev,
          idMateriaPrima: materiasData[0].idMateriaPrima,
          idUsuario: usuariosData[0]?.idUsuario || 0,
        }));
      } else if (usuariosData.length > 0) {
        // Se tiver estoque, só definir o usuário
        setFormData((prev) => ({
          ...prev,
          idUsuario: usuariosData[0]?.idUsuario || 0,
        }));
      }
    } catch (error) {
      toast.error("Erro ao carregar dados");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantidadeKG" ? (value === "" ? "" : parseFloat(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar quantidade
    const quantidade = Number(formData.quantidadeKG);
    const validacao = validarQuantidadeEntrada(quantidade);

    if (!validacao.válido) {
      toast.error(validacao.mensagem);
      return;
    }

    setIsLoading(true);
    try {
      await registrarMovimento({
        idMateriaPrima: formData.idMateriaPrima,
        quantidadeKG: quantidade,
        tipoTransacao: TRANSACTION_TYPE.ENTRADA,
        observacao: formData.observacao,
        numeroLote: formData.numeroLote,
        idUsuario: formData.idUsuario,
      });

      toast.success("Entrada registrada com sucesso!");
      setFormData({
        idMateriaPrima: materiasPrimas[0]?.idMateriaPrima || 0,
        quantidadeKG: "",
        observacao: "",
        numeroLote: "",
        idUsuario: usuarios[0]?.idUsuario || 0,
      });
      onSave?.({});
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Erro ao registrar entrada");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-green-600 rounded-lg shadow-md">
          <MdLocalShipping className="text-white text-2xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-brownText">Registrar Entrada de Estoque</h2>
          <p className="text-sm text-textGray">Adicione novos itens ao estoque</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Seleção de Matéria Prima */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-brownText mb-2">
            <BiSolidPackage className="text-primary-900" />
            Matéria Prima
          </label>
          <select
            name="idMateriaPrima"
            value={formData.idMateriaPrima}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
          >
            {materiasPrimas.map((mp) => (
              <option key={mp.idMateriaPrima} value={mp.idMateriaPrima}>
                {mp.dscMateriaPrima}
              </option>
            ))}
          </select>
        </div>

        {/* Usuário Responsável */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-brownText mb-2">
            <FaUserCircle className="text-primary-900" />
            Usuário Responsável
          </label>
          <select
            name="idUsuario"
            value={formData.idUsuario}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
          >
            {usuarios.map((user) => (
              <option key={user.idUsuario} value={user.idUsuario}>
                {user.nomeUsuario}
              </option>
            ))}
          </select>
        </div>

        {/* Quantidade */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-brownText mb-2">
            <FaWeightHanging className="text-primary-900" />
            Quantidade (kg)
          </label>
          <input
            type="number"
            name="quantidadeKG"
            value={formData.quantidadeKG}
            onChange={handleChange}
            placeholder="Ex: 50.5"
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
            required
          />
        </div>

        {/* Número do Lote */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-brownText mb-2">
            <FaBarcode className="text-primary-900" />
            Número do Lote
          </label>
          <input
            type="text"
            name="numeroLote"
            value={formData.numeroLote}
            onChange={handleChange}
            placeholder="Ex: NF 12345 ou LOTE-001"
            className="w-full px-3 py-2 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>

        {/* Observação */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-brownText mb-2">
            <FaStickyNote className="text-primary-900" />
            Observação
          </label>
          <textarea
            name="observacao"
            value={formData.observacao}
            onChange={handleChange}
            placeholder="Ex: Compra do fornecedor XYZ - NF 12345"
            rows={3}
            className="w-full px-3 py-2 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>

        {/* Botões */}
        <div className="flex gap-3 justify-end pt-4 border-t border-borderGray mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-transparentGray text-offgray rounded-lg hover:opacity-80 transition font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:opacity-80 transition disabled:opacity-50 shadow-md hover:shadow-lg font-medium flex items-center gap-2"
          >
            <MdAdd className="text-lg" />
            {isLoading ? "Registrando..." : "Registrar Entrada"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
