import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";

export const getUserData = async () => {
  try {
    const user = getAuth().currentUser;

    if (!user) {
      throw new Error("No user is logged in!");
    }

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      const userData = {
        id: userDocSnapshot.id,
        ...userDocSnapshot.data(),
      };
      return userData;
    } else {
      throw new Error("User data not found");
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};
