import { useState, useEffect } from "react";
import Modal from "@/app/components/atoms/Modal";
import Button from "../../atoms/Button/DefaultButton";

interface DynamicModalProps {
  data: Record<string, any>;
  isReadOnly?: boolean; 
  isEditMode: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSave?:any;
  selectLabel?: string; 
  selectOptions?: { value: number; label: string }[];  
}

export default function DynamicModal({
  data,
  isReadOnly,
  isEditMode,
  isOpen,
  onClose,
  onSave,
  selectLabel,
  selectOptions = [], 
}: DynamicModalProps) {
  const [formData, setFormData] = useState(data);


  console.log("data", data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const title = () => {
    if (isReadOnly) {
      return "Visualizar Entidade";
    } else if (isEditMode) {
      return "Editar Entidade";
    } else {
      return "Criar Entidade";
    }
  };

  const selectedCategory = selectOptions.find(
    (option) => option.value === formData.idCategoria
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">{title()}</h2>

      {Object.keys(formData)
        .filter((key) => !key.toLowerCase().startsWith("id"))
        .map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {key}
            </label>
            <input
              type="text"
              value={formData[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              disabled={isReadOnly}
            />
          </div>
        ))}

      {!isReadOnly && selectLabel
       ? (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {selectLabel}
          </label>
          <select
            value={formData.idCategoria || ""}
            onChange={(e) => handleChange("idCategoria", Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            disabled={isReadOnly}
          >
            <option value="" disabled>Selecione {selectLabel}</option>
            {selectOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <></>
      )}

      {!isReadOnly && (
        <Button
          text={isEditMode ? "Salvar Alterações" : "Criar Entidade"}
          onClick={handleSubmit}
        />
      )}
    </Modal>
  );
}
