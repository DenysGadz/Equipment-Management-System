import EquipmentForm from "../components/EquipmentForm";

interface Props {
  setNotification?: (message: string, type?: "success" | "error" | "info") => void;
}

export default function Add({ setNotification }: Props) {
  return (
    <>
      <h1>Додати обладнання</h1>

      <EquipmentForm setNotification={setNotification} />
    </>
  );
}
