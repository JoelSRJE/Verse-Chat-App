import { db } from "@/utils/firebaseConfig";
import {
  getDocs,
  collection,
  query,
  where,
  documentId,
} from "firebase/firestore";

export const fetchGroups = async (profile) => {
  const groupIds = profile.groups.map((group) => group.groupId) || [];

  if (groupIds.length === 0) {
    return [];
  }

  const groupRef = collection(db, "groups");
  const groupQuery = query(groupRef, where(documentId(), "in", groupIds));
  const groupSnapshot = await getDocs(groupQuery);

  const groupData = [];

  if (groupSnapshot.empty) {
    return [];
  }

  groupSnapshot.forEach((doc) => {
    const group = doc.data();
    const groupId = doc.id;
    groupData.push({ id: groupId, ...group });
  });

  return groupData;
};
