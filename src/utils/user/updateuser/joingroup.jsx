import { db } from "@/utils/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateUserGroup } from "./updateusergroup";

export const tryToJoin = async (uid, groupId) => {
  try {
    const groupRef = doc(db, "groups", groupId);
    const groupDoc = await getDoc(groupRef);

    if (groupDoc.exists()) {
      const groupData = groupDoc.data();
      console.log("Current members in group:", groupData.members);
      console.log("Checking if user is a member with uid:", uid);
      // Kolla huruvida man är medlem redan.
      const isMember = groupData.members.some(
        (member) => member.userId === uid
      );

      if (!isMember) {
        const updatedMembers = [
          ...groupData.members,
          { userId: uid, role: "Member" },
        ];

        //Uppdatera gruppens medlemmar
        await updateDoc(groupRef, { members: updatedMembers });

        //Uppdatera användarens grupp array.
        await updateUserGroup(uid, groupId);

        return { success: true, message: "Group joined successfully" };
      } else {
        return { success: false, message: "User is already a member" };
      }
    } else {
      return { success: false, message: "Group not found" };
    }
  } catch (error) {
    console.error("Error joining group:", error);
    return { success: false, message: "Error joining group" };
  }
};
