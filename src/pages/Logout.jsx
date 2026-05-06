import { signOut } from "firebase/auth";
import { auth } from "../Services/firebase";

export const Logout = async (navigate) => {
  await signOut(auth);
  localStorage.clear();
  navigate("/");
};