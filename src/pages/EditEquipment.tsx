import { useParams } from "react-router-dom";
import EquipmentForm from "../components/EquipmentForm";

export default function Edit() {

  const { id } = useParams();

  return (
    <>
      <h1>Редагування</h1>

      <EquipmentForm id={id} />
    </>
  );
}