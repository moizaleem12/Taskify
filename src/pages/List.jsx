import { useState, useRef } from "react";
import { 
  GoArrowRight, 
} from "react-icons/go";
import { FaArrowUp, FaArrowDown, FaExchangeAlt, FaEraser, FaCode } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useFirebase } from "../context/Firebase";
import {
  toUpperCase,
  toLowerCase,
  reverseText,
  removeExtraSpaces,
  toHTML,
} from "../utils/textUtils";

const List = () => {
  const firebase = useFirebase();
  const [taskname, setTaskname] = useState("");
  const [tasknotes, setTasknotes] = useState("");
  const [taskstatus, setTaskstatus] = useState("Work");
  const [showDropdown, setShowDropdown] = useState(false); 
  const textAreaRef = useRef(null);

  const statuses = ["Work", "Personal", "Idea"];

  const handleUppercase = () => setTasknotes(toUpperCase(tasknotes));
  const handleLowercase = () => setTasknotes(toLowerCase(tasknotes));
  const handleReverse = () => setTasknotes(reverseText(tasknotes));
  const handleRemoveSpaces = () => setTasknotes(removeExtraSpaces(tasknotes));
  const handleToHTML = () => setTasknotes(toHTML(tasknotes));

  const handleStatusClick = (status) => {
    setTaskstatus(status);
    setShowDropdown(false); 
  };

  const handleSubmit = async () => {
    console.log({ taskname, tasknotes, taskstatus });

    if (!taskname.trim()) {
      alert("Task title is required!");
      return;
    }

    try {
      await firebase.handleCreateNewTask(taskname, tasknotes, taskstatus);
      console.log("Task added successfully!");

      setTaskname("");
      setTasknotes("");
      setTaskstatus("Work");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <>
      <div className="fixed bottom-10 sm:bottom-12  flex flex-col lg:p-5 sm:p-2 bg-zinc-900 rounded-lg w-[75%]">
        <div className="grid grid-cols-6 gap-3 items-start">
          <div className="col-span-2 sm:col-span-2">
            <input
              type="text"
              id="taskTitle"
              placeholder="Enter task title"
              className="text-xs  lg:w-full sm:w-full p-2  border
               text-white border-gray-300 rounded-lg h-9 "
              value={taskname}
              onChange={(e) => setTaskname(e.target.value)}
            />
          </div>
          <div className="col-span-2 sm:col-span-2">
            <textarea
              ref={textAreaRef}
              id="taskDescription"
              placeholder="Write your task details here."
              className="text-xs lg:w-full sm:w-52 p-2
               resize-none border text-white
                border-gray-300 rounded-lg h-9"
              value={tasknotes}
              onChange={(e) => setTasknotes(e.target.value)}
            />
          </div>
          <div className="col-span-2 flex space-x-5 sm:space-x-2 
          lg:justify-start sm:justify-end items-center">
                   {/* Status Dropdown */}
        <div className=" flex">
          <div className="relative">
            <button
              className="p-2 bg-slate-300 rounded-full text-black hover:bg-zinc-700 cursor-pointer hover:text-slate-300 transition flex items-center justify-center"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <BsThreeDotsVertical className="text-base" />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute left-0 mt-2  w-40 sm bg-zinc-800 rounded-lg shadow-lg z-10">
                {statuses.map((status) => (
                  <button
                    key={status}
                    className={`w-full text-left px-4 py-2 text-xs ${
                      taskstatus === status
                        ? " text-black bg-zinc-300"
                        : "text-zinc-400 hover:bg-slate-[#e2e0e0] "
                    }`}
                    onClick={() => handleStatusClick(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
            <button
              className="p-2 bg-slate-300 rounded-full text-black hover:bg-red-500 cursor-pointer hover:text-slate-300 transition flex items-center justify-center"
              onClick={handleSubmit}
            >
              <GoArrowRight className="text-base" />
            </button>
       
          </div>
         
        </div>

        

        {/* Buttons */}
        <div className="mt-2 flex flex-wrap gap-2  sm:gap:4">
  <button
    onClick={handleUppercase}
    className="flex items-center   gap-2 bg-zinc-800 text-white hover:bg-[#e2e0e0] hover:text-zinc-800 px-4 py-2 cursor-pointer rounded-full text-xs font-light"
  >
    <FaArrowUp />
    Uppercase
  </button>
  <button
    onClick={handleLowercase}
    className="flex items-center gap-2 bg-zinc-800 text-white hover:bg-[#e2e0e0] hover:text-zinc-800 px-4 py-2 cursor-pointer rounded-full text-xs font-light"
  >
    <FaArrowDown />
    Lowercase
  </button>
  <button
    onClick={handleReverse}
    className="flex items-center gap-2 bg-zinc-800 text-white hover:bg-[#e2e0e0] hover:text-zinc-800 lg:px-4 lg:py-2 sm:md-2 md:p-2 cursor-pointer rounded-full text-xs font-light"
  >
    <FaExchangeAlt />
    Reverse
  </button>
  <button
    onClick={handleRemoveSpaces}
    className="flex items-center gap-2 bg-zinc-800 text-white hover:bg-[#e2e0e0] hover:text-zinc-800 px-4 py-2 cursor-pointer rounded-full text-xs font-light"
  >
    <FaEraser />
    Remove Spaces
  </button>
  <button
    onClick={handleToHTML}
    className="flex items-center gap-2 bg-zinc-800 text-white hover:bg-[#e2e0e0] hover:text-zinc-800 px-4 py-2 cursor-pointer rounded-full text-xs font-light"
  >
    <FaCode />
    Convert to HTML
  </button>
</div>
      </div>
    </>
  );
};

export default List;