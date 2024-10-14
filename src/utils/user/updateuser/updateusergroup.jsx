import { db } from "@/utils/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// För att lägga till fler grupper för en användare
export const updateUserGroup = async (uid, newGroupId) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const currentGroups = userData.groups || [];

      if (!currentGroups.includes(newGroupId)) {
        const updatedGroups = [...currentGroups, newGroupId];
        await updateDoc(userRef, { groups: updatedGroups });
      } else {
        console.error("Group already exists in user's groups");
      }
    } else {
      console.error("User document not found in Firestore");
    }
  } catch (error) {
    console.error("Error updating user document: ", error);
  }
};
