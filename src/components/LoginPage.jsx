import { useEffect } from "react";
import { auth } from "../firebase/init";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { EmailAuthProvider } from "firebase/auth";

export default function LoginPage() {
  useEffect(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start("#firebaseui-auth-container", {
      signInOptions: [EmailAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: () => false, // Let onAuthStateChanged handle redirect
      },
    });

    return () => ui.reset(); // cleanup
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div id="firebaseui-auth-container" />
    </div>
  );
}
