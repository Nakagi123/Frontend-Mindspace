import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const InputField = ({ placeholder, type = "text", value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700
               placeholder-gray-400 outline-none border-2 border-transparent
               focus:border-gray-300 focus:bg-white transition-all duration-200"
  />
);

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    // 👇 Replace with your actual API call later
    if (isLogin) {
      login({ name: email });
    } else {
      login({ name: name });
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-sm w-full max-w-sm px-8 py-10 flex flex-col items-center gap-6">

        {/* Logo */}
        <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
          mindpace 🙂
        </h1>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {isLogin ? "Login to continue your journey" : "Start your learning journey"}
          </p>
        </div>

        {/* Form fields */}
        <div className="w-full flex flex-col gap-3">
          {!isLogin && (
            <InputField
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <InputField
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            placeholder={isLogin ? "Enter your password" : "Create a password"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gray-900 text-white text-sm font-semibold py-3 rounded-xl
                     hover:bg-gray-700 active:scale-95 transition-all duration-200"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {/* Toggle */}
        <p className="text-sm text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold text-gray-900 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>

        {/* Bottom bar decoration */}
        <div className="w-12 h-1 bg-gray-200 rounded-full mt-2" />

      </div>
    </div>
  );
}