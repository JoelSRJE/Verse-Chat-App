import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

export const subscribeToUsersById = (userId, callback) => {
  const userDocRef = doc(db, "users", userId);

  return onSnapshot(userDocRef, (userSnapshot) => {
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      callback({
        ...userData,
        userId,
      });
    } else {
      console.log(`Användare med ID ${userId} hittades inte`);
      callback(null);
    }
  });
};
