import sodium from "libsodium-wrappers";
import {
  getPublicKey,
  getUserPrivateKey,
  getUserPublicKey,
} from "./KeyHandler";

let sodiumReady = false;

function utoB64(u) {
  const binaryString = String.fromCharCode.apply(null, u);
  return btoa(binaryString);
}

export function b64toU(b64) {
  return sodium.from_base64(b64, sodium.base64_variants.ORIGINAL);
}

export const generateKeyPair = async () => {
  await initSodium();
  const keyPair = sodium.crypto_box_keypair();
  return {
    publicKey: utoB64(keyPair.publicKey),
    privateKey: utoB64(keyPair.privateKey),
  };
};

export const initSodium = async () => {
  if (!sodiumReady) await sodium.ready;
  sodiumReady = true;
};

export const EncryptMessage = async (message, receiverUID) => {
  await initSodium();
  const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
  const receiverPublicKey = await getPublicKey(receiverUID);
  const senderPublicKey = await getUserPublicKey();
  const privateKey = await getUserPrivateKey();
  const senderCipherText = sodium.crypto_box_easy(
    message,
    nonce,
    b64toU(senderPublicKey),
    b64toU(privateKey)
  );
  const receiverCipherText = sodium.crypto_box_easy(
    message,
    nonce,
    b64toU(receiverPublicKey),
    b64toU(privateKey)
  );
  return [utoB64(senderCipherText), utoB64(receiverCipherText), utoB64(nonce)];
};

export const DecryptMessage = async (cipherText, nonce, senderUID) => {
  await initSodium();
  const publicKey = await getPublicKey(senderUID);
  const privateKey = await getUserPrivateKey();
  console.log("Decrypting message with public key:", publicKey);
  console.log("Using private key for decryption:", privateKey);
  const decrypted = sodium.crypto_box_open_easy(
    b64toU(cipherText),
    b64toU(nonce),
    b64toU(publicKey),
    b64toU(privateKey)
  );
  return sodium.to_string(decrypted);
};
