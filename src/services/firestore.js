
import {
  getFirestore,
  collection,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { firebaseApp } from "./firebase";

export const firestore = getFirestore(firebaseApp);

export const displaytask = (user, taskcollection) => {
  if (!user) return;

  // Fetch all tasks for the user
  const tasksQuery = query(
    collection(firestore, "tasklist"),
    where("userID", "==", user.uid)
  );

  const unsubscribe = onSnapshot(tasksQuery, async (querySnapshot) => {
    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const favoritesQuery = query(
      collection(firestore, "favorites"),
      where("userId", "==", user.uid)
    );
    const favoritesSnapshot = await getDocs(favoritesQuery);
    const favoriteTaskIds = favoritesSnapshot.docs.map((doc) => doc.data().taskId);

    const filteredTasks = tasks.filter((task) => !favoriteTaskIds.includes(task.id));

    taskcollection(filteredTasks); 
  });

  return unsubscribe; 
};

export const handleCreateNewTask = async (user, taskname, tasknotes, taskstatus) => {
  if (!user) {
    alert("You must be logged in to add a task!");
    return; 
  }
  return await addDoc(collection(firestore, "tasklist"), {
    taskname,
    tasknotes,
    taskstatus,
    Email: user.email,
    userID: user.uid,
  });
};

export const deletetasks = async (user, taskId) => {
  if (!user) {
    alert("You must be logged in to delete a task!");
    return;
  }

  try {
    const taskRef = doc(firestore, "tasklist", taskId);
    const taskSnap = await getDoc(taskRef);

    if (taskSnap.exists()) {
      await setDoc(doc(firestore, "trash", taskId), taskSnap.data());
      await deleteDoc(taskRef);
      console.log("Task moved to trash successfully!");
    } else {
      console.log("Task does not exist!");
    }
  } catch (error) {
    console.error("Error moving task to trash:", error.message);
  }
};

export const getTrashedTasks = async (user, taskCollection) => {
  if (!user) return;

  try {
    const trashQuery = query(
      collection(firestore, "trash"),
      where("userID", "==", user.uid)
    );

    const trashSnapshot = await getDocs(trashQuery);
    const trashedTasks = trashSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    taskCollection(trashedTasks); 
  } catch (error) {
    console.error("Error fetching trashed tasks:", error.message);
    taskCollection([]); 
  }
};

export const restoreTask = async (user, taskId) => {
  if (!user) {
    alert("You must be logged in to restore a task!");
    return; 
  }

  try {
    const taskRef = doc(firestore, "trash", taskId);
    const taskSnap = await getDoc(taskRef);

    if (taskSnap.exists()) {
      await setDoc(doc(firestore, "tasklist", taskId), taskSnap.data());
      await deleteDoc(taskRef);
      console.log("Task restored successfully!");
    } else {
      console.log("Task does not exist in trash!");
    }
  } catch (error) {
    console.error("Error restoring task:", error.message);
  }
};

export const deleteTaskPermanently = async (user, taskId) => {
  if (!user) {
    alert("You must be logged in to delete a task permanently!");
    return; 
  }

  try {
    const taskRef = doc(firestore, "trash", taskId);
    await deleteDoc(taskRef);
    console.log("Task deleted permanently!");
  } catch (error) {
    console.error("Error deleting task permanently:", error.message);
  }
};

export const toggleFavorite = async (user, taskId, isFavorite) => {
  if (!user) {
    alert("You must be logged in to favorite a task!");
    return;
  }

  try {
    const favoriteRef = doc(firestore, "favorites", `${user.uid}_${taskId}`);
    if (isFavorite) {
      await deleteDoc(favoriteRef);
    } else {
      await setDoc(favoriteRef, {
        taskId,
        userId: user.uid,
        timestamp: new Date(),
      });
    }
  } catch (error) {
    console.error("Error toggling favorite:", error.message);
  }
};

export const getFavoriteTasks = (user, taskCollection) => {
  if (!user) return;
  const favoritesQuery = query(
    collection(firestore, "favorites"),
    where("userId", "==", user.uid)
  );

  const unsubscribe = onSnapshot(favoritesQuery, async (favoritesSnapshot) => {
    const favoriteTaskIds = favoritesSnapshot.docs.map((doc) => doc.data().taskId);

    if (favoriteTaskIds.length === 0) {
      taskCollection([]);
      return;
    }

    const tasksQuery = query(
      collection(firestore, "tasklist"),
      where("__name__", "in", favoriteTaskIds)
    );

    const tasksSnapshot = await getDocs(tasksQuery);
    const tasks = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    taskCollection(tasks);
  });

  return unsubscribe; 
};

export const updateUserFilterPreference = async (user, filter) => {
  if (!user) return; 
  try {
    await setDoc(
      doc(firestore, "userPreferences", user.uid), // Store preference under the user's UID
      { filter },
      { merge: true } // Merge to avoid overwriting other fields
    );
    console.log("Filter preference updated successfully!");
  } catch (error) {
    console.error("Error updating filter preference:", error.message);
  }
};

export const getUserFilterPreference = async (user) => {
  if (!user) return "all"; 
  try {
    const docRef = doc(firestore, "userPreferences", user.uid);
    const docSnap = await getDoc(docRef); 
    if (docSnap.exists()) {
      return docSnap.data().filter || "all"; 
    }
    return "all"; 
  } catch (error) {
    console.error("Error fetching filter preference:", error.message);
    return "all";
  }
};

export const updateUserLayoutPreference = async (user, layout) => {
  if (!user) return; 
  try {
    await setDoc(
      doc(firestore, "userPreferences", user.uid),
      { layout },
      { merge: true } 
    );
    console.log("Layout preference updated successfully!");
  } catch (error) {
    console.error("Error updating layout preference:", error.message);
  }
};

export const getUserLayoutPreference = async (user) => {
  if (!user) return "grid"; 
  try {
    const docRef = doc(firestore, "userPreferences", user.uid);
    const docSnap = await getDoc(docRef); // Fetch the document
    if (docSnap.exists()) {
      return docSnap.data().layout || "grid"; 
    }
    return "grid"; 
  } catch (error) {
    console.error("Error fetching layout preference:", error.message);
    return "grid"; 
  }
};