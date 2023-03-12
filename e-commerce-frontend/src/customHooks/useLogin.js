import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  selectLoggedUser,
  selectLoginError,
} from "../features/login/loginSlice";

function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const loginError = useSelector(selectLoginError);
  const loggedUser = useSelector(selectLoggedUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let index;
    if (error) {
      index = setTimeout(() => setError(""), 5000);
    }

    return () => clearTimeout(index);
  }, [error]);

  useEffect(() => {
    if (loginError) {
      setError("Wrong credentials");
    }
  }, [loginError]);

  useEffect(() => {
    if (loggedUser) {
      navigate("/");
    }
  }, [loggedUser, navigate]);

  function handleLogin() {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    dispatch(loginUser({ username, password }));
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    setError,
    handleLogin,
  };
}

export default useLogin;
