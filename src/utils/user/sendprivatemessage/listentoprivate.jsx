import { db } from "@/utils/firebaseConfig";
import { onSnapshot, doc } from "firebase/firestore";

export const listenToPrivateMessages = (uid, selectedFriendId, setMessages) => {
  const docRef = doc(db, "users", uid);

  const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const selectedFriend = userData.friends.find(
        (friend) => friend.friendId === selectedFriendId
      );

      if (selectedFriend && selectedFriend.privateMessages) {
        setMessages(selectedFriend.privateMessages);
      }
    }
  });

  return unsubscribe;
};
