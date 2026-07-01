import { useEffect, useState } from "react";
import type { Equipment } from "../types/Equipment";
import { getEquipment, removeEquipment } from "../services/equipmentService";
import EquipmentCard from "../components/EquipmentCard";

interface Props {
  setNotification?: (message: string, type?: "success" | "error" | "info") => void;
}

export default function Home({ setNotification }: Props) {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const loadEquipment = async () => {
    setIsLoading(true);
    try {
      const data = await getEquipment();
      setEquipment(data);
    } catch {
      setNotification?.("Не вдалося завантажити обладнання", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = window.setTimeout(() => setIsSearching(false), 250);
    return () => window.clearTimeout(timer);
  }, [search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Видалити обладнання?")) return;

    setPendingDeleteId(id);
    try {
      await removeEquipment(id);
      await loadEquipment();
      setNotification?.("Обладнання успішно видалено", "success");
    } catch {
      setNotification?.("Не вдалося видалити обладнання", "error");
    } finally {
      setPendingDeleteId(null);
    }
  };

  const filtered = equipment.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.inventoryNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Облік обладнання</h1>

      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="Пошук..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: 320 }}
        />
        {isSearching ? (
          <div style={{ marginTop: 6, color: "#2563eb" }}>Пошук...</div>
        ) : null}
      </div>

      {isLoading ? (
        <div style={{ padding: 16, color: "#2563eb" }}>Завантаження обладнання...</div>
      ) : null}

      {!isLoading && !filtered.length ? (
        <div style={{ padding: 16, color: "#6b7280" }}>Нічого не знайдено</div>
      ) : null}

      {filtered.map((item) => (
        <EquipmentCard
          key={item.id}
          equipment={item}
          onDelete={handleDelete}
          pendingDeleteId={pendingDeleteId}
        />
      ))}
    </div>
  );
}
