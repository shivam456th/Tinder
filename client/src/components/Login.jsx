import React, { useState } from "react";
// import { Link } from "react-router-dom";
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

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
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
      return navigate("/")
    } catch (error) {
      console.error(error.response.data);
      toast.error("Invalid credentials");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password},{},
        {withCredentials: true}
      );
      dispatch(addUser(res.data))
      return navigate("/profile")
    } catch (error) {
      console.error(error.response.data);
      toast.error("Invalid credentials"); 
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-96 shadow-sm justify-center">
        <div className="card-body">
          <h2 className="card-title">{isLoginFrom ? "Login" : "Sign Up"}</h2>
          <form onSubmit={handleLogin}>
            {!isLoginFrom && (
              <>
              <div className="form-control">
              <label htmlFor="email" className="label">
                FirstName 
              </label>
              <input
                type="email"
                id="email"
                name="firstName"
                placeholder="example@example.com"
                className="input input-bordered w-full max-w-xs"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="label">
                lastName
              </label>
              <input
                type="email"
                id="email"
                name="lastName"
                placeholder="example@example.com"
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
              <button type="btn btn-primary" className="btn btn-primary" onClick={isLoginFrom ? handleLogin : handleSignUp}>
                {isLoginFrom? "Login" : "Sign up"}
              </button>
            </div>
            <p className="text-red-500">{error}</p>
            <p className="m-auto cursor-pointer" onClick={()=>setIsLoginFrom(( value ) => !value)}>{isLoginFrom ? "New User? Signup Here" : "Existing user? Login Here"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
