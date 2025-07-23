import { useEffect, useState, useRef } from "react";
import { getMessage, getConvoID, listenMessages } from "../api/ChatApi";
import { getCurrentUserID } from "../api/UserApi";

const PAGE_SIZE = 20;

export const useChatMessages = (uid) => {
  const [convoId, setConvoId] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const fetchConvoId = async () => {
      const id = await getConvoID(uid);
      const userid = await getCurrentUserID();
      setConvoId(id);
      setUserId(userid);
    };
    fetchConvoId();
  }, [uid]);
  const [messages, setMessages] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    if (!convoId || !userId) return;
    const loadInitial = async () => {
      const {
        messages: initial,
        lastDoc,
        hasMore,
      } = await getMessage(convoId, userId, PAGE_SIZE, null);
      console.log("Initial messages loaded:", initial);
      setMessages(initial);
      setLastDoc(lastDoc);
      setHasMore(hasMore);

      const afterTimestamp = initial[0]?.timestamp;
      unsubscribeRef.current = listenMessages(
        convoId,
        userId,
        (newMsgs) => setMessages((prev) => [...newMsgs, ...prev]),
        afterTimestamp
      );
    };

    loadInitial();
    return () => unsubscribeRef.current?.();
  }, [convoId, userId]);

  const loadMore = async () => {
    if (loadingMore) return;
    if (!convoId || !userId) return;
    if (!hasMore || !lastDoc) return;
    setLoadingMore(true);

    const {
      messages: older,
      lastDoc: newLast,
      hasMore: more,
    } = await getMessage(convoId, userId, PAGE_SIZE, lastDoc);

    setMessages((prev) => [...prev, ...older]);
    setLastDoc(newLast);
    setHasMore(more);
    setLoadingMore(false);
  };

  return { messages, loadMore, loadingMore, hasMore };
};
