import { db, storage } from "@/utils/firebaseConfig";
import { updateUserGroup } from "@/utils/user/updateuser/updateusergroup";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const createGroupFirebase = async (
  groupAvatar,
  groupName,
  groupDescription,
  currentUser
) => {
  try {
    let groupAvatarURL = null;
    if (groupAvatar) {
      const avatarRef = ref(storage, `groups/${groupName}`);
      const avatarSnapshot = await uploadBytes(avatarRef, groupAvatar);
      groupAvatarURL = await getDownloadURL(avatarSnapshot.ref);
    } else {
      groupAvatarURL =
        "https://firebasestorage.googleapis.com/v0/b/chatt-609df.appspot.com/o/groups%2Fgroupplaceholder.png?alt=media&token=b9c2a50a-a71a-4330-a326-9fb45d15b471";
    }

    const newGroup = {
      groupAvatar: groupAvatarURL,
      groupName: groupName,
      groupDescription: groupDescription,
      roles: ["Owner", "Admin", "Moderator", "Member"],
      members: [{ userId: currentUser.uid, role: "Owner" }],
      channels: [
        {
          channelId: "channel-1",
          channelName: "Welcome-channel",
          messages: [],
        },
      ],
      createdAt: new Date(),
    };

    const groupDocRef = await addDoc(collection(db, "groups"), newGroup);

    const updates = {
      groups: [...(currentUser.groups || []), groupDocRef.id],
    };
    await updateUserGroup(currentUser.uid, updates);

    return groupDocRef.id;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};
