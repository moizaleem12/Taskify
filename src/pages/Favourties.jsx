import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import TaskCards from "../Components/Task/TaskCards";

export default function Favourites() {
  const firebase = useFirebase();
  const [favoriteTasks, setFavoriteTasks] = useState([]);

  useEffect(() => {
    if (!firebase.userlogin) return;

    // Fetch favorite tasks
    const unsubscribe = firebase.getFavoriteTasks(setFavoriteTasks);

    return () => {
      unsubscribe && unsubscribe(); // Clean up the listener
    };
  }, [firebase.userlogin]);

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-medium my-10">Your Favourite Tasks</h1>
      {favoriteTasks.length === 0 ? (
        <p className="text-sm">No favourite tasks found.</p>
      ) : (
        <div className="grid grid-cols-3 ">
          {favoriteTasks.map((task) => (
            <div key={task.id} className=" rounded-lg">
              <TaskCards
                id={task.id}
                taskname={task.taskname}
                tasknotes={task.tasknotes}
                taskstatus={task.taskstatus}
                isFavorite={true} // This task is favorited
                onRemoveFavorite={() => {
                  setFavoriteTasks(favoriteTasks.filter((t) => t.id !== task.id));
                }}
                />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}