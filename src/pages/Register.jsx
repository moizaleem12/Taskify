import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (firebase.userlogin) {
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing up user...");
    await firebase.signupUserWithEmailAndPassword(email, password, username);
    console.log("Signup successful!", username);
  };

  return (
    <div className="max-w-md mx-auto mt-3 p-4 md:p-8 lg:mt-8">
      <h1 className="text-lg md:text-xl font-bold text-start mb-4 md:mb-6">
        Signup to your Taskify account
      </h1>
      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm md:text-base font-medium text-zinc-800">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="mt-1 p-2 md:p-3 border rounded-lg w-full"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm md:text-base font-medium text-zinc-800">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-1 p-2 md:p-3 border rounded-lg w-full"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm md:text-base font-medium text-zinc-800">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-1 p-2 md:p-3 border rounded-lg w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-zinc-800 text-white hover:bg-[#e2e0e0] hover:text-zinc-800 cursor-pointer p-2 md:p-3 rounded-lg transition-all"
        >
          Sign Up
        </button>
      </form>
      <p className="text-sm md:text-base font-regular text-zinc-800 my-3 md:my-4 text-center">
        Already have an account?
      </p>
      <Link to="/signin" className="block w-full">
        <button
          type="submit"
          className="w-full cursor-pointer p-2 md:p-3 rounded-lg bg-zinc-800 text-white hover:bg-[#e2e0e0] hover:text-zinc-800 transition-all"
        >
          Signin
        </button>
      </Link>
    </div>
  );
}