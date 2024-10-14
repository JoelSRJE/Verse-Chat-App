import { db } from "@/utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchGroups = async (profile) => {
  const groupIds = profile.groups.flatMap((group) => group.groups || []);

  if (groupIds.length === 0) {
    return [];
  }

  const groupRef = collection(db, "groups");
  const groupSnapshot = await getDocs(groupRef);

  const groupData = [];

  if (groupSnapshot.empty) {
    return [];
  }

  groupSnapshot.forEach((doc) => {
    const group = doc.data();
    const groupId = doc.id;

    if (groupIds.includes(groupId)) {
      groupData.push({ id: groupId, ...group });
    }
  });

  return groupData;
};
