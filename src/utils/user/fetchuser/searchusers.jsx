import { db } from "@/utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const getAllUsers = async () => {
  try {
    const allUsers = collection(db, "users");

    const usersSnapshot = await getDocs(allUsers);

    const usersList = usersSnapshot.docs.map((doc) => ({
      userId: doc.id,
      avatar: doc.data().avatar,
      username: doc.data().username,
    }));

    return usersList;
  } catch (error) {
    console.error("Fel vid hämtning av användare", error);
  }
};
