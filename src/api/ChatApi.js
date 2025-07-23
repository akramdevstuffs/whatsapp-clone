import { DecryptMessage, EncryptMessage } from "./ChatCripto";
import {
  sendMessage as fireBaseSendMessage,
  fetchMessages as firebaseFetchMessages,
  listenMessages as firebaseListenMessages,
} from "./../firebase/services/message";
import { getCurrentUserID } from "./UserApi";

export const getConvoID = async (receiverID) => {
  const userId = await getCurrentUserID();
  if (!userId) {
    throw new Error("User not logged in");
  }
  return userId < receiverID
    ? `${userId}-${receiverID}`
    : `${receiverID}-${userId}`;
};

export const sendMessage = async (message, receiverId) => {
  const [senderCipherText, receiverCipherText, nonce] = await EncryptMessage(
    message,
    receiverId
  );
  const convID = await getConvoID(receiverId);
  const senderId = await getCurrentUserID();
  await fireBaseSendMessage(
    convID,
    senderCipherText,
    receiverCipherText,
    nonce,
    senderId,
    receiverId
  );
};

export const listenMessages = (convId, userId, onNewMessage, lastTimeStamp) => {
  return firebaseListenMessages(
    convId,
    async (newCipher) => {
      const decryptedMessages = await Promise.all(
        newCipher.map(async (cipher) => {
          const decrypted = await DecryptMessage(
            cipher.sender === userId
              ? cipher.senderMessage
              : cipher.receiverMessage,
            cipher.nonce,
            cipher.sender
          );
          return { ...cipher, message: decrypted };
        })
      );
      onNewMessage(decryptedMessages);
    },
    lastTimeStamp
  );
};

export const getMessage = async (convId, userId, pageSize, afterDoc = null) => {
  const { messages, lastDoc, hasMore } = await firebaseFetchMessages(
    convId,
    pageSize,
    afterDoc
  );
  return {
    messages: await Promise.all(
      messages.map(async (cipher) => {
        const decrypted = await DecryptMessage(
          cipher.sender === userId
            ? cipher.senderMessage
            : cipher.receiverMessage,
          cipher.nonce,
          cipher.sender
        );
        return { ...cipher, message: decrypted };
      })
    ),
    lastDoc: lastDoc,
    hasMore: hasMore,
  };
};
