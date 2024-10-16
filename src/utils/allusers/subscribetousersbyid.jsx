import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

export const subscribeToUsersById = (userId, callback) => {
  const userDocRef = doc(db, "users", userId);

  return onSnapshot(userDocRef, (userSnapshot) => {
    if (userSnapshot.exists()) {
      const { avatar, username, online } = userSnapshot.data();
      callback({
        userId,
        avatar,
        username,
        online,
      });
    } else {
      console.log(`Användare med ID ${userId} hittades inte`);
      callback(null);
    }
  });
};
