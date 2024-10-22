import { db } from "@/utils/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const sendGroupMessage = async ({
  groupId,
  memberAvatar,
  channelId,
  senderName,
  message,
}) => {
  const sentAt = Date.now();
  const newMessage = {
    from: senderName,
    memberAvatar: memberAvatar,
    message: message,
    sentAt,
  };

  try {
    const groupRef = doc(db, "groups", groupId);
    const groupDoc = await getDoc(groupRef);

    if (!groupDoc.exists()) {
      throw new Error("Group doesn't exist");
    }

    const groupData = groupDoc.data();

    const updatedChannels = groupData.channels.map((channel) => {
      if (channel.channelId === channelId) {
        return {
          ...channel,
          messages: [...channel.messages, newMessage],
        };
      }
      return channel;
    });

    await setDoc(groupRef, { ...groupData, channels: updatedChannels });
  } catch (error) {
    console.error("Fel vid skickande av meddelande", error);
  }
};
