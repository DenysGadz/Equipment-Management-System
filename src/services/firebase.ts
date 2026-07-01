import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYY711fRqt41qhIMNQF7w7CRCAjhrRH_0",
  authDomain: "system-d2568.firebaseapp.com",
  projectId: "system-d2568",
  storageBucket: "system-d2568.firebasestorage.app",
  messagingSenderId: "819135956454",
  appId: "1:819135956454:web:b5563035eb711533b34227",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);