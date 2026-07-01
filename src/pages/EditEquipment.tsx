import { useParams } from "react-router-dom";
import EquipmentForm from "../components/EquipmentForm";

interface Props {
  setNotification?: (message: string, type?: "success" | "error" | "info") => void;
}

export default function Edit({ setNotification }: Props) {
  const { id } = useParams();

  return (
    <>
      <h1>Редагування</h1>

      <EquipmentForm id={id} setNotification={setNotification} />
    </>
  );
}
