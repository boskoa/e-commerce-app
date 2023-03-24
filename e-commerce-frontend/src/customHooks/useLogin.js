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
      navigate(-1, { replace: true });
    }
  }, [loggedUser, navigate]);

  function handleLogin() {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    if (username.length > 20 || username.length < 2) {
      setError("Username must be between 2 and 20 characters long");
      return;
    }

    if (password.length > 20 || password.length < 6) {
      setError("Password must be between 6 and 20 characters long");
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
