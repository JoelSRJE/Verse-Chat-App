import { db } from "@/utils/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

// Använd för att skriva över online status, användarnamn etc
export const updateUser = async (uid, updates) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, updates);
    console.log("User document updated successfully");
  } catch (error) {
    console.error("Error updating user document: ", error);
  }
};
