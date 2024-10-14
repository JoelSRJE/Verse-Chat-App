import { storage, auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useCookies } from "react-cookie";

export const registerUser = async (avatar, username, email, password) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;

    /* Lägg till bilden i storage och uppdatera profilbilden. */
    let avatarURL = null;
    if (avatar) {
      const avatarRef = ref(storage, `avatars/${user.uid}`);
      const avatarSnapshot = await uploadBytes(avatarRef, avatar);
      avatarURL = await getDownloadURL(avatarSnapshot.ref);
    } else {
      avatarURL = process.env.NEXT_PUBLIC_PLACEHOLDER_URL;
    }

    await updateProfile(user, { displayName: username, photoURL: avatarURL });

    await setDoc(doc(db, "users", user.uid), {
      avatar: avatarURL,
      username: username,
      email: email,
      online: { status: "Offline", color: "#B8B8B8" },
      friends: [],
      groups: [],
      registeredAt: new Date().getTime(),
      lastSeen: new Date().getTime(),
    });
  } catch (error) {
    console.error("Error during registration:", error);
    if (error.code === "auth/email-already-in-use") {
      throw new Error(
        "The email address is already in use by another account."
      );
    } else if (error.code === "auth/invalid-email") {
      throw new Error("The email address is invalid.");
    } else if (error.code === "auth/weak-password") {
      throw new Error("The password is too weak.");
    } else {
      console.log("Failed to register user alltogether:", error);
      throw new Error("Failed to register user alltogether. Please try again.");
    }
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();

      return { authData: user, userData: userData };
    } else {
      throw new Error("User document not found in Firestore");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    if (error.code === "auth/user-not-found") {
      throw new Error("User not found");
    } else if (error.code === "auth/wrong-password") {
      throw new Error("Wrong password");
    } else {
      throw new Error("Failed to log in:", error);
    }
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Error logging out:", error);
  }
};

export const authStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
