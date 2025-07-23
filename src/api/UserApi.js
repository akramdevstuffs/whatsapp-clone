import { editUserProfile } from "../firebase/services/user";
import { listenToAuthChanges } from "../firebase/services/auth";
import {
  getUserProfile as firebaseGetUserProfile,
  searchUsers as firebaseSearchUsers,
  getPublicKey as firebaseGetPublicKey,
  uploadPublicKey as firebaseUploadPublicKey,
} from "../firebase/services/user";
import { openDB } from "idb";

export const updateUserProfile = async (profileData) => {
  const userId = await getCurrentUserID();
  return editUserProfile(userId, profileData);
};

export const getPublicKey = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required to get public key");
  }
  return firebaseGetPublicKey(userId);
};

export const uploadPublicKey = async (publicKey) => {
  const userId = await getCurrentUserID();
  if (!userId) {
    throw new Error("User not logged in");
  }
  await firebaseUploadPublicKey(userId, publicKey);
  // Logic to upload the public key to the server or database
  // This is a placeholder; actual implementation may vary

  console.log(`Public key for user ${userId} uploaded:`, publicKey);
  return publicKey;
};

export const getUserProfile = async (userId) => {
  return firebaseGetUserProfile(userId);
};

export const getCurrentUserID = async () => {
  const user = AuthApi.getCurrentUser();
  return user?.uid;
};

export const searchUsers = async (displayName) => {
  if (!displayName) {
    return [];
  }
  const users = await firebaseSearchUsers(displayName);
  console.log("Search results:", users);
  return users;
};

let currentUser = null;

export const AuthApi = {
  listen(callback) {
    return listenToAuthChanges((user) => {
      currentUser = user;
      callback(user);
    });
  },
  getCurrentUser() {
    return currentUser;
  },
  isLoggedIn() {
    return !!currentUser;
  },
};

const openContactsDB = async () => {
  const db = await openDB("ContactsDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("contacts")) {
        db.createObjectStore("contacts", { keyPath: "id" });
      }
    },
  });
  return db;
};

export const getSavedContacts = async () => {
  // The function retrieves the user's saved contacts locally.
  const db = await openContactsDB();
  const contacts = await db.getAll("contacts");
  return contacts;
};

export const saveContact = async (contact) => {
  // The function saves a contact to the local database.
  const db = await openContactsDB();
  //Avoid duplicate contacts
  const existingContact = await db.get("contacts", contact.id);
  if (!existingContact) {
    return db.put("contacts", contact);
  }
  return existingContact;
};
