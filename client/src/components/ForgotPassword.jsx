import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/users/forgot-password", { email });
      setMessage("Check your email for the reset link.");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-black p-8 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-700 rounded bg-gray-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 w-full py-2 rounded font-semibold"
        >
          Send Reset Link
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;