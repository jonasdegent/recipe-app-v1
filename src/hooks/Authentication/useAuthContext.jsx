import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

// dit is een customhook om onze reducer dispatch acties overal te gebruiken, zie value property bij de component AuthContext.provider
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext moet in de scope van AuthContextProvider");
  }

  return context;
};
