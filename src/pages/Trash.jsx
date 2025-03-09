import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";

export default function Trash() {
  const { getTrashedTasks, restoreTask, deleteTaskPermanently, user } = useFirebase();
  const [trashedTasks, setTrashedTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (user) {
      getTrashedTasks(setTrashedTasks);
    }
  }, [user, getTrashedTasks]);

  const handleRestore = async (taskId) => {
    await restoreTask(taskId);
    setTrashedTasks(trashedTasks.filter((task) => task.id !== taskId));
  };
  
  const handleDeletePermanently = async (taskId) => {
    await deleteTaskPermanently(taskId);
    setTrashedTasks(trashedTasks.filter((task) => task.id !== taskId));
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-medium mb-5 my-10">Trash</h2>
        { 
          trashedTasks.length===0?(<p className="text-sm">Trash is empty</p>):(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trashedTasks.map((task) => (

          <div key={task.id} className="p-5 relative bg-white shadow-md rounded-lg">
            <h5 className="font-medium text-[16px] break-words">{task.taskname}</h5>
            <p className="text-[12px] mt-2 break-words max-w-full">{task.tasknotes}</p>
                              <span className="absolute top-4 right-5 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-zinc-300 text-black">
              {task.taskstatus}
            </span>
            <button
              onClick={() => openModal(task)}
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))} 
  {showModal && selectedTask && (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4">What would you like to do?</h3>
        <p className="mb-4">Task: {selectedTask.taskname}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => handleRestore(selectedTask.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600"
          >
            Restore
          </button>
          <button
            onClick={() => handleDeletePermanently(selectedTask.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600"
          >
                Delete Permanently
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
      </div>
  
  ) }
    </div>
  );
}