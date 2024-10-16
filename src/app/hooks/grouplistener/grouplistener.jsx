import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";

export const useGroup = (profile) => {
  const [groupData, setGroupData] = useState({});

  useEffect(() => {
    if (profile && profile.groups) {
      const unsubscribeList = [];

      profile.groups.forEach((group) => {
        const groupDocRef = doc(db, "groups", group.groupId);
        const unsubscribe = onSnapshot(groupDocRef, (doc) => {
          if (doc.exists()) {
            setGroupData((prevData) => ({
              ...prevData,
              [group.groupId]: doc.data(),
            }));
          }
        });
        unsubscribeList.push(unsubscribe);
      });

      return () => unsubscribeList.forEach((unsub) => unsub());
    }
  }, [profile]);

  return groupData;
};
