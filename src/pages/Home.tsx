import { useEffect, useState } from "react";
import type { Equipment } from "../types/Equipment";
import { getEquipment, removeEquipment } from "../services/equipmentService";
import EquipmentCard from "../components/EquipmentCard";

export default function Home() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [search, setSearch] = useState("");

  const loadEquipment = async () => {
    const data = await getEquipment();
    setEquipment(data);
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Видалити обладнання?")) return;

    await removeEquipment(id);
    loadEquipment();
  };

  const filtered = equipment.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.inventoryNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <h1>Облік обладнання</h1>

      <input
        placeholder="Пошук..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.map((item) => (
        <EquipmentCard
          key={item.id}
          equipment={item}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}