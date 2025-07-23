import {
  getDoc,
  doc,
  collection,
  where,
  query,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "./../init";

const getPublicKey = async (userId) => {
  const userDoc = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    return userSnapshot.data().publicKey || "";
  }
  return "";
};

export const uploadPublicKey = async (userId, publicKey) => {
  if (!publicKey) {
    throw new Error("Public key is required to upload");
  }
  const userDoc = doc(db, "users", userId);
  await setDoc(userDoc, { publicKey: publicKey }, { merge: true });
};

const searchUsers = async (displayName) => {
  const q = query(
    collection(db, "users"),
    where("displayName", "==", displayName)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const editUserProfile = async (userId, profileData) => {
  const userDoc = doc(db, "users", userId);
  if (profileData.profilePicture) {
    //Remove the profile previous profile picture if it exists
    const existingUser = await getDoc(userDoc);
    if (existingUser.exists() && existingUser.data().profilePicture) {
      // Logic to remove the old profile picture from storage
      // This could involve calling a storage service API to delete the file
    }
    // Handle profile picture upload if necessary
    const profilePictureUrl = await uploadProfilePicture(
      userId,
      profileData.profile_picture
    );
    profileData.profilePicture = profilePictureUrl;
  }
  return setDoc(userDoc, profileData, { merge: true });
};

const uploadProfilePicture = async (userId, file) => {
  // This function would typically handle file uploads to a storage service
  // and update the user's profile with the new picture URL.
  // For now, we will just return a placeholder URL.
  const profilePictureUrl = `https://example.com/profile-pictures/${userId}.jpg`;
  //   await editUserProfile(userId, { profilePicture: profilePictureUrl });
  return profilePictureUrl;
};

const getUserProfile = async (userId) => {
  const userDoc = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    return { id: userSnapshot.id, ...userSnapshot.data() };
  }
  return null;
};

export {
  getPublicKey,
  searchUsers,
  editUserProfile,
  uploadProfilePicture,
  getUserProfile,
};
