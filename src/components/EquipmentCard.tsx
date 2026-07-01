import { Link } from "react-router-dom";
import type { Equipment } from "../types/Equipment";

interface Props {
  equipment: Equipment;
  onDelete: (id: string) => void;
}

export default function EquipmentCard({
  equipment,
  onDelete,
}: Props) {
  return (
    <div className="card">

      <h2>{equipment.name}</h2>

      <p>
        <b>Інв. №:</b> {equipment.inventoryNumber}
      </p>

      <p>
        <b>Категорія:</b> {equipment.category}
      </p>

      <p>
        <b>Місце:</b> {equipment.location}
      </p>

      <p>
        <b>Відповідальний:</b> {equipment.responsiblePerson}
      </p>

      <p>
        <b>Стан:</b> {equipment.condition}
      </p>

      <br />

      <Link to={`/edit/${equipment.id}`}>
        <button>Редагувати</button>
      </Link>

      <button
        style={{ marginTop: 10, background: "crimson" }}
        onClick={() => onDelete(equipment.id!)}
      >
        Видалити
      </button>

    </div>
  );
}