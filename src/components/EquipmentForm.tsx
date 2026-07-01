import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Equipment } from "../types/Equipment";
import {
  addEquipment,
  getEquipmentById,
  updateEquipment,
} from "../services/equipmentService";

interface Props {
  id?: string;
  setNotification?: (message: string, type?: "success" | "error" | "info") => void;
}

const emptyEquipment: Equipment = {
  name: "",
  inventoryNumber: "",
  category: "",
  location: "",
  responsiblePerson: "",
  condition: "Справний",
  commissioningDate: "",
  note: "",
};

export default function EquipmentForm({ id, setNotification }: Props) {
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState<Equipment>(emptyEquipment);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      loadEquipment();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const loadEquipment = async () => {
    setIsLoading(true);
    try {
      const data = await getEquipmentById(id!);
      setEquipment(data);
    } catch {
      setNotification?.("Не вдалося завантажити обладнання для редагування", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setEquipment({
      ...equipment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!equipment.name || !equipment.inventoryNumber) {
      setNotification?.("Заповніть обов'язкові поля", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      if (id) {
        await updateEquipment(id, equipment);
        setNotification?.("Обладнання успішно оновлено", "success");
      } else {
        await addEquipment(equipment);
        setNotification?.("Обладнання успішно додано", "success");
      }
      navigate("/");
    } catch {
      setNotification?.("Не вдалося зберегти обладнання", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      {isLoading ? (
        <div style={{ marginBottom: 12, color: "#2563eb" }}>Завантаження даних...</div>
      ) : null}

      <label>Назва обладнання</label>
      <input name="name" value={equipment.name} onChange={handleChange} />

      <label>Інвентарний номер</label>
      <input
        name="inventoryNumber"
        value={equipment.inventoryNumber}
        onChange={handleChange}
      />

      <label>Категорія</label>
      <input name="category" value={equipment.category} onChange={handleChange} />

      <label>Місце розташування</label>
      <input name="location" value={equipment.location} onChange={handleChange} />

      <label>Відповідальна особа</label>
      <input
        name="responsiblePerson"
        value={equipment.responsiblePerson}
        onChange={handleChange}
      />

      <label>Технічний стан</label>
      <select name="condition" value={equipment.condition} onChange={handleChange}>
        <option>Справний</option>
        <option>Потребує ремонту</option>
        <option>Несправний</option>
      </select>

      <label>Дата введення в експлуатацію</label>
      <input
        type="date"
        name="commissioningDate"
        value={equipment.commissioningDate}
        onChange={handleChange}
      />

      <label>Примітка</label>
      <textarea name="note" value={equipment.note} onChange={handleChange} rows={4} />

      <button type="submit" disabled={isLoading || isSubmitting}>
        {isSubmitting ? (id ? "Збереження..." : "Додавання...") : id ? "Зберегти зміни" : "Додати обладнання"}
      </button>
    </form>
  );
}
