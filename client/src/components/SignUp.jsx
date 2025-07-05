import { useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Separator } from "../components/ui/Separator";
import { useNavigate, Link } from "react-router-dom";

import { Eye, Github, Twitter, ArrowLeft } from "lucide-react";

function SignUp({ setUser, setIsAuthenticated }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/signup", {
        username,
        email,
        password,
      
      },{
        withCredentials: true, // ✅ allow cookies to be sent/received
      }
    );

      const user = response.data.user;
      setUser(user);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      alert("Signup failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-purple-900 via-red-950 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-purple-300 hover:text-purple-200 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Eye className="h-8 w-8 text-purple-300" />
            <span className="text-2xl font-bold text-white">Gnosis</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Join the Community
          </h1>
        </div>

        <Card className="bg-gradient-to-r from-gray-800/60 via-purple-900/40 to-red-900/50 border-purple-700/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-center">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-gray-300 text-center">
              Choose your preferred sign-up method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Sign Up (optional buttons, currently non-functional) */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full border-purple-600/50 text-gray-200 hover:bg-purple-800/50 hover:text-white bg-transparent hover:border-purple-500">
                <Github className="h-5 w-5 mr-2" />
                Continue with GitHub
              </Button>
              <Button variant="outline" className="w-full border-red-600/50 text-gray-200 hover:bg-red-800/50 hover:text-white bg-transparent hover:border-red-500">
                <Twitter className="h-5 w-5 mr-2" />
                Continue with Twitter
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-gradient-to-r from-purple-600/30 to-red-600/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gradient-to-r from-gray-800 via-purple-900 to-red-900 px-2 text-gray-300">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email Sign Up Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-200">User Name</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800/50 border-purple-600/30 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800/50 border-purple-600/30 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-gray-200">Student ID</Label>
                <Input
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="bg-gray-800/50 border-red-600/30 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800/50 border-red-600/30 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-200">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-800/50 border-purple-600/30 text-white placeholder-gray-400"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white shadow-lg"
              >
                Create Account
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-300 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-300 hover:text-purple-200 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-xs">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
