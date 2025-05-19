import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

export function useFirestore() {
  const db = getFirestore();

  const addCard = async (userId, card) => {
    await addDoc(collection(db, "users", userId, "flashcards"), card);
  };

  const getCards = async (userId) => {
    const snap = await getDocs(collection(db, "users", userId, "flashcards"));
    return snap.docs.map(doc => doc.data());
  };

  return { addCard, getCards };
}