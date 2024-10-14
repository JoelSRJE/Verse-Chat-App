import { doc, onSnapshot } from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebaseConfig";

export const subscribeToUserData = (callback) => {
  const unsubscribedAuth = onAuthStateChanged(auth, (user) => {
    if (!user) {
      console.error("No user is logged in!");
      return;
    }
  });

  const userDocRef = doc(db, "users", user.uid);

  const unsubscribeFromSnapshot = onSnapshot(userDocRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const userData = {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      };

      callback(userData);
    } else {
      console.error("User data not found!");
    }

    return () => {
      unsubscribeFromSnapshot();
      unsubscribedAuth();
    };
  });

  return () => {
    unsubscribedAuth();
  };
};
