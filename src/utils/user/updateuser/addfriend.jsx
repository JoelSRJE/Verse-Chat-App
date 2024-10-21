import { db } from "@/utils/firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export const addFriend = async (currentUserId, friend) => {
  try {
    const currentUserRef = doc(db, "users", currentUserId);
    const currentUserSnapshot = await getDoc(currentUserRef);

    if (currentUserSnapshot.exists()) {
      const currentUserData = currentUserSnapshot.data();

      const friendExists = currentUserData.friends.some(
        (f) => f.friendId === friend.userId
      );

      if (!friendExists) {
        const friendData = {
          friendId: friend.userId,
          privateMessages: [],
        };

        await updateDoc(currentUserRef, {
          friends: [...currentUserData.friends, friendData],
        });

        console.log("Friend added successfully!");
      } else {
        console.log("Friend already exists in your friend list.");
      }
    }
  } catch (error) {
    console.error("Error adding friend: ", error);
  }
};
