import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:3000/api/users/reset-password/${token}`, {
        password,
      });

      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Reset failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleReset} className="bg-black p-8 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-2 border border-gray-700 rounded bg-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 w-full py-2 rounded font-semibold"
        >
          Reset Password
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
