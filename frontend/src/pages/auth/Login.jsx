import { useState } from "react";
import { loginUser } from "../../services/auth.service";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending Data:", formData);

    try {
      setLoading(true);

      const response = await loginUser(formData);

      console.log("API Response:", response);

      // Save JWT Token
      localStorage.setItem("token", response.token);

      alert("Login Successful!");

      // Redirect to dashboard later
      // window.location.href = "/";
    } catch (error) {
      console.error("Login Error:", error.response?.data);

      alert(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Pharmacy Login
        </h1>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;