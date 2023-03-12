import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, selectLoginError } from "../features/login/loginSlice";
import { selectUserCreated } from "../features/users/usersSlice";

function useRegister() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [inputErrors, setInputErrors] = useState(new Set());
  const loginError = useSelector(selectLoginError);
  const registrationSuccess = useSelector(selectUserCreated);
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
      // prebaciti na registraciju
      setError("Registration failed");
    }
  }, [loginError]);

  useEffect(() => {
    if (registrationSuccess) {
      navigate("/");
    }
  }, [registrationSuccess, navigate]);

  function handleNameCheck() {
    if (name.length < 2 || name.length > 20) {
      setError("Name must be between 2 and 20 characters long");
      setInputErrors((prev) => prev.add("n"));
      return;
    }

    setInputErrors((prev) => (prev.has("n") ? prev.delete("n") : prev));
    return;
  }

  function handleUsernameCheck() {
    if (username.length < 2 || username.length > 20) {
      setError("Username must be between 2 and 20 characters long");
      setInputErrors((prev) => prev.add("u"));
      return;
    }

    setInputErrors((prev) => (prev.has("u") ? prev.delete("u") : prev));
    return;
  }

  function handleEmailCheck() {
    if (email.length < 2 || email.length > 20) {
      // popraviti
      setError("Please, enter a valid email");
      setInputErrors((prev) => prev.add("e"));
      return;
    }

    setInputErrors((prev) => (prev.has("e") ? prev.delete("e") : prev));
    return;
  }

  function handlePasswordCheck() {
    if (password.length < 6 || password.length > 20) {
      // popraviti
      setError("Password must be between 6 and 20 characters long");
      setInputErrors((prev) => prev.add("p"));
      return;
    }

    setInputErrors((prev) => (prev.has("p") ? prev.delete("p") : prev));
    return;
  }

  function handlePasswordConfirmCheck() {
    if (password !== passwordConfirm) {
      setError("Password confirmation failed");
      setInputErrors((prev) => prev.add("c"));
      return;
    }

    setInputErrors((prev) => (prev.has("c") ? prev.delete("c") : prev));
    return;
  }

  function handleRegister() {
    if (inputErrors.size > 0 || !(name && username && email && password)) {
      setError("Invalid credentials");
      return;
    }
    dispatch(loginUser({ username, password })); //popraviti
  }

  return {
    name,
    setName,
    handleNameCheck,
    username,
    setUsername,
    handleUsernameCheck,
    email,
    setEmail,
    handleEmailCheck,
    password,
    setPassword,
    handlePasswordCheck,
    passwordConfirm,
    setPasswordConfirm,
    handlePasswordConfirmCheck,
    error,
    setError,
    handleRegister,
    inputErrors,
  };
}

export default useRegister;
