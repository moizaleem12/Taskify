import React from "react";
import { useFirebase } from "../../context/Firebase";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await firebase.logout();
    navigate("/signin");
  };

  return (
    <>
      
    <button
      className=" bg-zinc-800 text-white px-3 py-2 cursor-pointer rounded-full text-xs font-light hover:bg-[#e2e0e0]  hover:text-zinc-800"
      onClick={handleLogout}
    >
      Logout
    </button>
        
      
    </>
  );
}
