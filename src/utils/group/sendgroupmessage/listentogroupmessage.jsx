import { db } from "@/utils/firebaseConfig";
import { onSnapshot, doc } from "firebase/firestore";

export const listenToGroupMessages = (groupId, channelId, setMessages) => {
  const docRef = doc(db, "groups", groupId);

  const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const groupData = docSnapshot.data();

      const channel = groupData.channels.find(
        (channel) => channel.channelId === channelId
      );

      if (channel) {
        const messages = channel.messages || [];
        setMessages(messages);
      } else {
        console.log("Channel not found");
        setMessages([]);
      }
    } else {
      console.log("Document does not exist!");
      setMessages([]);
    }
  });

  return unsubscribe;
};
