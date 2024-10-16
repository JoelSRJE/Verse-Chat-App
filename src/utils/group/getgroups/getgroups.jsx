import { db } from "@/utils/firebaseConfig";
import { fetchUsersById } from "@/utils/user/fetchuser/fetchuser";
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

  const memberPromises = [];

  groupSnapshot.forEach((doc) => {
    const group = doc.data();
    const groupId = doc.id;

    const memberIds = group.members.map((member) => member.userId);

    const userPromises = memberIds.map((userId) => fetchUsersById(userId));

    memberPromises.push(
      Promise.all(userPromises).then((users) => {
        const usersWithRoles = users.map((user) => {
          const member = group.members.find((m) => m.userId === user.userId);
          return {
            ...user,
            role: member ? member.role : null,
          };
        });

        groupData.push({ id: groupId, ...group, members: usersWithRoles });
      })
    );
  });

  await Promise.all(memberPromises);

  return groupData;
};
