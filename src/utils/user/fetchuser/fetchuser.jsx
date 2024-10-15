import { db } from "@/utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const fetchUsersById = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const { avatar, username, online } = userSnapshot.data();
    return {
      avatar,
      username,
      online,
    };
  } else {
    console.log(`Användare med ID ${userId} hittades inte`);
    return null;
  }
};
