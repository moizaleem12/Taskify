import React from "react";
import { Link } from "react-router-dom";
export default function Signinbutton() {
  return (
    <>
        <Link to="/signin">
        <button className="bg-zinc-800 text-white  hover:bg-[#e2e0e0]  hover:text-zinc-800 px-4 py-2 cursor-pointer rounded-full text-xs font-light">Signin</button>
      </Link>
    </>
  );
}
