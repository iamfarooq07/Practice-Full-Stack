import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  console.log(users);

  const getData = async (e) => {
    // e.preventDefault();
    try {
      const res = await axios.get("http://localhost:3000/api/user");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/user", {
        name,
        email,
        password,
      });

      setName("");
      setEmail("");
      setPassword("");

      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Normal From</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Your Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Submit
          </button>
        </form>

        <ul className="mt-6 space-y-4">
          {users.map((value, index) => {
            return (
              <li
                key={index}
                className="bg-white p-4 rounded-xl shadow-md border hover:shadow-lg transition"
              >
                <h1 className="text-lg font-semibold text-gray-800">
                  {value.name}
                </h1>
                <p className="text-gray-600">{value.email}</p>
                <p className="text-gray-500 text-sm">{value.password}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
