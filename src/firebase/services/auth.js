import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../init";

export function listenToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}
