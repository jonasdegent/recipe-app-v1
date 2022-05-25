import { useState } from "react";

//Firebase imports
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

//Custom hooks
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign the user out
    try {
      await signOut(auth);
      //dispatch logout action, we moeten hier geen payload invoeren, we hebben geen user meer nodig -> null
      dispatch({ type: "LOGOUT" });

      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, logout };
};
