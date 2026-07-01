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

export default function EquipmentForm({ id }: Props) {
  const navigate = useNavigate();

  const [equipment, setEquipment] =
    useState<Equipment>(emptyEquipment);

  useEffect(() => {
    if (id) {
      loadEquipment();
    }
  }, []);

  const loadEquipment = async () => {
    const data = await getEquipmentById(id!);
    setEquipment(data);
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

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !equipment.name ||
      !equipment.inventoryNumber
    ) {
      alert("Заповніть обов'язкові поля");
      return;
    }

    if (id) {
      await updateEquipment(id, equipment);
    } else {
      await addEquipment(equipment);
    }

    navigate("/");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>

      <label>Назва обладнання</label>
      <input
        name="name"
        value={equipment.name}
        onChange={handleChange}
      />

      <label>Інвентарний номер</label>
      <input
        name="inventoryNumber"
        value={equipment.inventoryNumber}
        onChange={handleChange}
      />

      <label>Категорія</label>
      <input
        name="category"
        value={equipment.category}
        onChange={handleChange}
      />

      <label>Місце розташування</label>
      <input
        name="location"
        value={equipment.location}
        onChange={handleChange}
      />

      <label>Відповідальна особа</label>
      <input
        name="responsiblePerson"
        value={equipment.responsiblePerson}
        onChange={handleChange}
      />

      <label>Технічний стан</label>
      <select
        name="condition"
        value={equipment.condition}
        onChange={handleChange}
      >
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
      <textarea
        name="note"
        value={equipment.note}
        onChange={handleChange}
        rows={4}
      />

      <button type="submit">
        {id ? "Зберегти зміни" : "Додати обладнання"}
      </button>
    </form>
  );
}