import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../redux/constants";
import toast from "react-hot-toast";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [firstName, setFirstName] = useState("Honey");
  const [lastName, setLastName] = useState("Singh");
  const [emailId, setEmailId] = useState("honeysingh@example.com");
  const [isLoginFrom, setIsLoginFrom] = useState(true);
  const [password, setPassword] = useState("shivams123@$%RR");
  const [loginError, setLoginError] = useState(""); // Error ke liye state

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(""); // Purana error clear kiya
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid credentials";
      console.error(errorMessage);
      toast.error(errorMessage);
      setLoginError(errorMessage); // Naya error state mein set kiya
    }
  };

  const handleSignUp = async (e) => {
    e?.preventDefault?.();
    setLoginError("");
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName, lastName, emailId, password,
          // Add these if backend validation requires:
          // gender, age, photoUrl, about, skills
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Sign up failed. Please try again.";
      toast.error(errorMessage);
      setLoginError(errorMessage);
    }
  };
  

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-96 shadow-sm justify-center">
        <div className="card-body">
          <h2 className="card-title">{isLoginFrom ? "Login" : "Sign Up"}</h2>
          <form onSubmit={handleLogin}>
            {!isLoginFrom && (
              <>
                <div className="form-control">
                  <label htmlFor="firstName" className="label">
                    FirstName
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Honey"
                    className="input input-bordered w-full max-w-xs"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="lastName" className="label">
                    lastName
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Singh"
                    className="input input-bordered w-full max-w-xs"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="form-control">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@example.com"
                className="input input-bordered w-full max-w-xs"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control mt-6 card-actions m-2">
              <button
                type="button" // ise "button" rakha hai taki page reload na ho
                className="btn btn-primary"
                onClick={isLoginFrom ? handleLogin : handleSignUp}
              >
                {isLoginFrom ? "Login" : "Sign up"}
              </button>
            </div>
            {/* Yahan error message display hoga */}
            <p className="text-red-500 text-center">{loginError}</p>
            <p
              className="m-auto cursor-pointer text-center mt-2"
              onClick={() => setIsLoginFrom((value) => !value)}
            >
              {isLoginFrom
                ? "New User? Signup Here"
                : "Existing user? Login Here"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;