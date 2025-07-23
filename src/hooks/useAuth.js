import { useState, useEffect } from "react";
import { AuthApi, getUserProfile } from "../api/UserApi";
import { generateKeyPairAndStore } from "../api/KeyHandler";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [hasProfile, setHasProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = AuthApi.listen((u) => {
      setUser(u);

      if (u) {
        getUserProfile(u.uid).then((profile) => {
          const exists = !!profile;
          setHasProfile(exists);

          if (!exists) {
            generateKeyPairAndStore(u.uid)
              .then(() => {
                console.log("Generated key pair for new user:", u.uid);
              })
              .catch((err) => {
                console.error("Error generating key pair:", err);
              });
          }

          setChecking(false);
        });
      } else {
        setHasProfile(null);
        setChecking(false);
      }
    });

    return unsubscribe;
  }, []);

  return { user, checking, hasProfile };
}
