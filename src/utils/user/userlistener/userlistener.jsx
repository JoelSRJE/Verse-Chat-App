import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";

export const useUserProfile = (uid) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (uid) {
      const userDocRef = doc(db, "users", uid);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setProfile(doc.data());
        } else {
          setProfile(null);
        }
      });

      return () => unsubscribe();
    }
  }, [uid]);

  return profile;
};
