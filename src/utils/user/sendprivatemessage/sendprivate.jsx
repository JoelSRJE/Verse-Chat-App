import { db } from "@/utils/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const sendPrivateMessage = async ({
  uid,
  senderName,
  receiverId,
  receiverName,
  message,
}) => {
  const sentAt = Date.now();
  const newMessage = {
    from: senderName,
    receiver: receiverName,
    message: message,
    sentAt,
  };

  try {
    const userDocRef = doc(db, "users", uid);
    const receiverDocRef = doc(db, "users", receiverId);

    const userSnapshot = await getDoc(userDocRef);
    const receiverSnapshot = await getDoc(receiverDocRef);

    console.log("User snapshot:", userSnapshot.data());
    console.log("Receiver snapshot:", receiverSnapshot.data());

    if (userSnapshot.exists() && receiverSnapshot.exists()) {
      const userFriends = userSnapshot.data().friends || [];
      const receiverFriends = receiverSnapshot.data().friends || [];

      // Hantera mottagarens privateMessages
      const receiverFriend = receiverFriends.find(
        (friend) => friend.friendId === uid
      );

      if (receiverFriend) {
        // Initiera om privateMessages inte finns
        receiverFriend.privateMessages = receiverFriend.privateMessages || [];
        receiverFriend.privateMessages.push(newMessage);
      } else {
        console.error("Mottagarens vän hittades inte.");
      }

      // Hantera avsändarens privateMessages
      const userFriend = userFriends.find(
        (friend) => friend.friendId === receiverId
      );

      if (userFriend) {
        // Initiera om privateMessages inte finns
        userFriend.privateMessages = userFriend.privateMessages || [];
        userFriend.privateMessages.push(newMessage);
      } else {
        console.error("Avsändarens vän hittades inte.");
      }

      // Uppdatera dokumenten i Firestore
      await setDoc(userDocRef, { friends: userFriends }, { merge: true });
      await setDoc(
        receiverDocRef,
        { friends: receiverFriends },
        { merge: true }
      );
    } else {
      console.error("Användare eller mottagare hittades inte.");
    }
  } catch (error) {
    console.error("Fel vid skickande av meddelande", error);
  }
};
