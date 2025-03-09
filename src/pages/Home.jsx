import React, { useState, useEffect } from "react";
import TaskCards from "../Components/Task/TaskCards";
import { useFirebase } from "../context/Firebase";
import List from "./List";
import Filter from "../Components/Task/Filter";
import { filterTasks } from "../utils/filterUtils";
import { FaListUl } from "react-icons/fa6";
import { CiGrid41 } from "react-icons/ci";

export default function Home() {
  const firebase = useFirebase();
  const [tlist, settlist] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState("grid");

  useEffect(() => {
    if (!firebase.userlogin) return;

    const unsubscribeTasks = firebase.displaytask(settlist);

    const fetchPreferences = async () => {
      try {
        const userFilterPref = await firebase.getUserFilterPreference();
        setFilter(userFilterPref || "all");

        const userLayoutPref = await firebase.getUserLayoutPreference(); // Fetch layout preference
        setLayout(userLayoutPref || "grid");
      } catch (error) {
        console.error("Error fetching preferences:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferences();

    return () => {
      unsubscribeTasks && unsubscribeTasks();
    };
  }, [firebase.userlogin]);

  useEffect(() => {
    if (!firebase.userlogin || isLoading) return;
    firebase.updateUserFilterPreference(filter);
    firebase.updateUserLayoutPreference(layout); // Save layout preference
  }, [filter, layout, firebase.userlogin, isLoading]);

  const filteredTasks = filterTasks(tlist, filter);

  return (
    <>
      <div className="flex justify-between my-10 ">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setLayout("grid")}
            className={`p-2 rounded-lg ${
              layout === "grid"
                ? " bg-zinc-800 w-auto text-white px-3 py-2 cursor-pointer rounded-lg text-xs font-light"
                : "bg-gray-200"
            }`}
          >
            <CiGrid41 className="text-xs" />
          </button>

          <button
            onClick={() => setLayout("list")}
            className={`p-2 rounded-lg ${
              layout === "list"
                ? " bg-zinc-800 w-auto text-white px-3 py-2 cursor-pointer rounded-lg text-xs font-light"
                : "bg-gray-200"
            }`}
          >
            <FaListUl className="text-xs" />
          </button>
        </div>
        <Filter filter={filter} setFilter={setFilter} />
      </div>
      <div className="relative flex flex-col items-center">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        ) : (
          <div
            className={`container ${
              layout === "grid" ? "grid lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-2" : "flex flex-col"
            } space-x-3 space-y-4`}
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map((bucket) => (
                <TaskCards key={bucket.id} {...bucket} layout={layout} />
              ))
            ) : (
              <p>No tasks found</p>
            )}
          </div>
        )}
        <List />
      </div>
      
    </>
  );
}
