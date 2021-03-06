import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";

function useAuthUser() {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    console.log("useAuthUser loaded");
    const releaseAuthListener = firebase.onAuthUserListener(
      authUser => {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setAuthUser(authUser);
      },
      () => {
        localStorage.removeItem("authUser");
        setAuthUser(null);
      }
    );

    return () => releaseAuthListener();
  }, []);

  return authUser;
}

export default useAuthUser;
