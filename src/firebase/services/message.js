import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
} from "firebase/firestore";
import { db } from "./../init";

export const sendMessage = (
  convId,
  senderMessage,
  receiverMessage,
  nonce,
  senderId,
  receiverId
) => {
  const ref = collection(db, "conversations", convId, "messages");
  return addDoc(ref, {
    senderMessage: senderMessage,
    receiverMessage: receiverMessage,
    receiver: receiverId,
    sender: senderId,
    nonce: nonce,
    timestamp: serverTimestamp(),
  });
};

export const listenMessages = (convId, onNewMessage, afterTimeStamp = null) => {
  const ref = collection(db, "conversations", convId, "messages");
  const q = query(
    ref,
    orderBy("timestamp", "asc"),
    ...(afterTimeStamp ? [startAfter(afterTimeStamp)] : [])
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const newMsg = snapshot
      .docChanges()
      .filter((change) => change.type === "added")
      .map((change) => ({ id: change.doc.id, ...change.doc.data() }));
    if (newMsg.length) onNewMessage(newMsg);
  });
  return unsubscribe;
};

export const fetchMessages = async (convId, pageSize = 20, afterDoc = null) => {
  console.log("Fetching messages for conversation:", convId);
  const ref = collection(db, "conversations", convId, "messages");
  const q = query(
    ref,
    orderBy("timestamp", "desc"),
    ...(afterDoc ? [startAfter(afterDoc)] : []),
    limit(pageSize)
  );
  const snapshot = await getDocs(q);
  console.log("Fetched messages:", snapshot.docs);
  return {
    messages: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    hasMore: snapshot.docs.length === pageSize,
  };
};
