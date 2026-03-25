
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzIDm-0bG69T8tyXd0d0tQ8pOgN4wl7SI",
  authDomain: "usermangement-19026.firebaseapp.com",
  databaseURL: "https://usermangement-19026-default-rtdb.firebaseio.com",
  projectId: "usermangement-19026",
  storageBucket: "usermangement-19026.firebasestorage.app",
  messagingSenderId: "267428730656",
  appId: "1:267428730656:web:060e9d174ecd8485132945",
  measurementId: "G-ZHSE22Y1JE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export let auth = getAuth(app) // using auth  