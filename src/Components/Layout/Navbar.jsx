import React from "react";
import { useFirebase } from "../../context/Firebase";
import Logout from '../Buttons/Logout'
import Signin from "../Buttons/Signinbutton";
import { Link } from "react-router-dom";
export default function Navbar() {
  const firebase = useFirebase();
  const user = firebase.userlogin ? firebase.user : null;
  return (
      <div className="flex container  justify-between items-center   ">
      
    <Link to='/'>  <h2 className="text-base  cursor-pointer">Taskify</h2></Link>
      <div className="flex items-center space-x-4 ">
        {user ? (
          <>    <span className="text-sm" >Welcome, {user.username || "Anonymous" } </span>
       
      
            <Logout/>       
          </>
              ) : (
            <>
          <Signin/>
          
          </>
        )}
      </div>
    </div>
  );
}
