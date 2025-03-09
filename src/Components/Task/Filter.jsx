import React from "react";
import { useFirebase } from "../../context/Firebase";
const Filter = ({ filter, setFilter }) => {
    const firebase = useFirebase();
    const user = firebase.userlogin ? firebase.user : null;
  return (
 <>
 {
  user?( <>
  
      <div className="relative">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="block appearance-none bg-zinc-800 w-32 text-white px-3 py-2 cursor-pointer rounded-lg text-xs font-light "
        >
          <option value="all">All</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="idea">Idea</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06-.02L10 10.86l3.71-3.67a.75.75 0 111.04 1.08l-4.24 4.2a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
  
  
  </>):(null)
 }
 </>
  );
};

export default Filter;
