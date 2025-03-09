// services/auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { firebaseApp, firestore } from "./firebase";
import { doc, setDoc } from "firebase/firestore"; 
const firebaseauth = getAuth(firebaseApp); 

export const signupUserWithEmailAndPassword = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseauth,
      email,
      password
    );
    await setDoc(doc(firestore, "users", userCredential.user.uid), {
      username,
      email,
    });
    console.log(username, email);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

export const siginUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(firebaseauth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(firebaseauth);
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(firebaseauth, callback);
};