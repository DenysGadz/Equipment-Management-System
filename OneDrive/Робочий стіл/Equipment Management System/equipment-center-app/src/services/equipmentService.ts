import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "./firebase";
import type { Equipment } from "../types/Equipment";

const equipmentRef = collection(db, "equipment");

export const getEquipment = async () => {
  const snapshot = await getDocs(equipmentRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Equipment[];
};

export const addEquipment = async (equipment: Equipment) => {
  await addDoc(equipmentRef, equipment);
};

export const removeEquipment = async (id: string) => {
  await deleteDoc(doc(db, "equipment", id));
};

export const getEquipmentById = async (id: string) => {
  const snapshot = await getDoc(doc(db, "equipment", id));

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Equipment;
};

export const updateEquipment = async (
  id: string,
  equipment: Equipment
) => {
  await updateDoc(doc(db, "equipment", id), {
    ...equipment,
  });
};