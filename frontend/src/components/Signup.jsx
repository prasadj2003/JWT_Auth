import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Signup() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post("http://localhost:3000/signup", {
      firstName,
      lastName,
      username,
      password,
    });
    navigate('/signin')
  }

  

  function Navigate(){
    navigate('/signin')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            onChange={(e) => setLastname(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sign Up
        </button>
        <p>already have account?<button className="underline underline-offset-2 text-blue-600" onClick={Navigate}>Signin</button></p>
      </form>
    </div>
  );
}

export default Signup;
