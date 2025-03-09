
import { createContext, useContext, useEffect, useState } from "react";
import {
  siginUserWithEmailAndPassword,
  signupUserWithEmailAndPassword,
  logout,
  onAuthChange,
} from "../services/auth";
import {
  handleCreateNewTask,
  displaytask,
  deletetasks,
  getTrashedTasks,
  restoreTask,
  deleteTaskPermanently,
  toggleFavorite,
  getFavoriteTasks,
  updateUserFilterPreference,
  getUserFilterPreference,
  updateUserLayoutPreference,
  getUserLayoutPreference,
} from "../services/firestore";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../services/firestore";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setuser] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          setuser({ ...user, ...userDoc.data() });
        } else {
          setuser(user);
        }
      } else {
        setuser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const userlogin = !!user;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        siginUserWithEmailAndPassword,
        userlogin, 
        user,
        logout,
        displaytask: (taskcollection) => displaytask(user, taskcollection),
        handleCreateNewTask: (taskname, tasknotes, taskstatus) => handleCreateNewTask(user, taskname, tasknotes, taskstatus),
        deletetasks: (taskId) => deletetasks(user, taskId),
        getTrashedTasks: (taskCollection) => getTrashedTasks(user, taskCollection),
        restoreTask: (taskId) => restoreTask(user, taskId),
        deleteTaskPermanently: (taskId) => deleteTaskPermanently(user, taskId),
        toggleFavorite: (taskId, isFavorite) => toggleFavorite(user, taskId, isFavorite),
        getFavoriteTasks: (taskCollection) => getFavoriteTasks(user, taskCollection),
        updateUserFilterPreference: (filter) => updateUserFilterPreference(user, filter),
        getUserFilterPreference: () => getUserFilterPreference(user),
        updateUserLayoutPreference: (layout) => updateUserLayoutPreference(user, layout),
        getUserLayoutPreference: () => getUserLayoutPreference(user),
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};