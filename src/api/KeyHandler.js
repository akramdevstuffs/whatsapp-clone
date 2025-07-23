import { generateKeyPair } from "./ChatCripto";
import { openDB } from "idb";
import { getPublicKey as firebaseGetPublicKey } from "../firebase/services/user";
import { uploadPublicKey as firebaseUploadPublicKey } from "../firebase/services/user";

const DB_NAME = "KeyDB";
const STORE_NAME = "keys";
const DB_VERSION = 1;

let cachedPrivateKey = null;
let cachedPublicKey = null;

function openKeyDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export const getUserPrivateKey = async () => {
  if (cachedPrivateKey) {
    return cachedPrivateKey;
  }
  const db = await openKeyDB();
  const privateKey = await db.get(STORE_NAME, "privateKey");
  if (privateKey) {
    cachedPrivateKey = privateKey;
  }
  return privateKey;
};

export async function savePrivateKey(privateKey) {
  const db = await openKeyDB();
  await db.put(STORE_NAME, privateKey, "privateKey");
  cachedPrivateKey = privateKey; // update cache
}

export async function savePublicKey(publicKey) {
  const db = await openKeyDB();
  await db.put(STORE_NAME, publicKey, "publicKey");
  cachedPublicKey = publicKey;
}

export async function deletePrivateKey() {
  const db = await openKeyDB();
  await db.delete(STORE_NAME, "privateKey");
  cachedPrivateKey = null;
}

export const getUserPublicKey = async () => {
  if (cachedPublicKey) return cachedPublicKey;
  const db = await openKeyDB();
  const publicKey = await db.get(STORE_NAME, "publicKey");
  if (publicKey) {
    cachedPublicKey = publicKey;
  }
  return publicKey;
};

export const getPublicKey = (uid) => {
  return firebaseGetPublicKey(uid);
};

export const generateKeyPairAndStore = async (uid) => {
  const keyPair = await generateKeyPair();
  console.log("Generated key pair:", keyPair);
  // Store the key pair in a secure location, e.g., database or secure storage
  await savePrivateKey(keyPair.privateKey);
  await savePublicKey(keyPair.publicKey);
  await firebaseUploadPublicKey(uid, keyPair.publicKey);
  console.log(`Public key for user ${uid} uploaded:`, keyPair.publicKey);
};
export const clearKeys = async () => {
  const db = await openKeyDB();
  await db.clear(STORE_NAME);
  cachedPrivateKey = null;
  cachedPublicKey = null;
  console.log("All keys cleared from the database.");
};
