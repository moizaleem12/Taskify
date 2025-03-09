import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signin() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.userlogin) {
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in...");
    try {
      await firebase.siginUserWithEmailAndPassword(email, password);
      console.log("Login successful.");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed: Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="mx-auto mt-8 p-4 w-full max-w-md md:mt-10 lg:p-8">
      <h3 className="font-semibold text-start mb-2 md:mb-3 text-sm md:text-base">
        Get Tasks Done, Fast and Easy!
      </h3>
      <h1 className="text-xl font-bold text-start mb-4 md:mb-6 md:text-2xl">
        Log in to your Taskify account
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-3 mt-8 md:space-y-4 md:mt-10">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-800 md:text-base"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border rounded-lg md:px-4 md:py-2"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-800 md:text-base"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full rounded-lg px-3 py-2 border md:px-4 md:py-2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-zinc-800 text-white hover:bg-[#e2e0e0] hover:text-zinc-800 p-2 cursor-pointer rounded-lg transition-all md:p-3"
        >
          Login
        </button>
      </form>

      <p className="text-sm font-regular text-zinc-800 my-4 text-center md:my-6">
        Don't have an account?
      </p>
      
      <Link to="/register" className="block w-full">
        <button
          type="submit"
          className="w-full bg-zinc-800 text-white hover:bg-[#e2e0e0] hover:text-zinc-800 cursor-pointer p-2 rounded-lg transition-all md:p-3"
        >
          Signup
        </button>
      </Link>
    </div>
  );
}