import { signOut } from "firebase/auth";
import { auth } from "../Services/firebase";

export const logout = async (navigate) => {
  await signOut(auth);
  localStorage.clear();
  navigate("/");
};