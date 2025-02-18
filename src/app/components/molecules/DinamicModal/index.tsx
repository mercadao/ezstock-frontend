import { useState, useEffect } from "react";
import Modal from "@/app/components/atoms/Modal";
import Button from "../../atoms/Button/DefaultButton";

interface DynamicModalProps {
  modalName?: string;
  data: Record<string, any>;
  isReadOnly?: boolean;
  isEditMode: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (updatedData: any) => void;
  selectLabel?: string;
  selectOptions?: { value: number; label: string }[];
  selecetData?: any;
  labelNames?: string[];
  regexPatterns?: Record<string, RegExp>;
}

export default function DynamicModal({
  modalName = "entidade",
  data,
  isReadOnly,
  isEditMode,
  isOpen,
  onClose,
  onSave,
  selectLabel,
  selectOptions = [],
  selecetData,
  labelNames = [],
  regexPatterns = {},
}: DynamicModalProps) {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(data);
    setErrors({});
  }, [data]);

  const handleChange = (key: string, value: any) => {
    // Validação do regex
    if (regexPatterns[key] && !regexPatterns[key].test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: `O valor inserido em "${key}" não é válido.`,
      }));
    } else {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[key];
        return updatedErrors;
      });
    }
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const handleSelectChange = (e: any) => {
    handleChange("idCategoria", Number(e.target.value));
    if (selecetData) {
      selecetData(Number(e.target.value));
    }
  };

  const title = () => {
    if (isReadOnly) return "Visualizar Entidade";
    if (isEditMode) return "Editar Entidade";
    return `Criar ${modalName}`;
  };

  const excludeFields = (key: any) => {
    const excludePatterns = ["id", "tipoTransacao", "indAtivo", "sucesso"];
    return !excludePatterns.some((pattern) =>
      key.toLowerCase().includes(pattern.toLowerCase())
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">{title()}</h2>

      {Object.keys(formData)
        .filter(excludeFields)
        .map((key, index) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {labelNames[index] || key}
            </label>
            <input
              type="text"
              value={formData[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              disabled={isReadOnly}
            />
            {errors[key] && (
              <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
            )}
          </div>
        ))}

      {!isReadOnly && selectLabel && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {selectLabel}
          </label>
          <select
            value={formData.idCategoria || ""}
            onChange={handleSelectChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            disabled={isReadOnly}
          >
            <option value="" disabled>
              {selectLabel}
            </option>
            {selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {!isReadOnly && (
        <Button
          text={isEditMode ? "Salvar Alterações" : `Criar ${modalName}`}
          onClick={handleSubmit}
        />
      )}
    </Modal>
  );
}
