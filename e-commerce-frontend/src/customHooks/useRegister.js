import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetError,
  createUser,
  selectUserCreated,
  selectUsersError,
  resetSuccess,
  BASE_URL,
} from "../features/users/usersSlice";

function useRegister() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [usernameExists, setUsernameExists] = useState(false);
  const usersError = useSelector(selectUsersError);
  const registrationSuccess = useSelector(selectUserCreated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let index;
    if (error) {
      index = setTimeout(() => setError(""), 3000);
    }

    return () => clearTimeout(index);
  }, [error]);

  useEffect(() => {
    if (usersError) {
      setError("Registration failed");
    }

    return () => dispatch(resetError());
  }, [usersError, dispatch]);

  useEffect(() => {
    if (registrationSuccess) {
      navigate("/login", { replace: true });
    }

    return () => dispatch(resetSuccess());
  }, [registrationSuccess, navigate, dispatch]);

  useEffect(() => {
    async function checkExistingUsername() {
      if (username.length > 0) {
        const response = await axios.post(`${BASE_URL}/check-username`, {
          username,
        });
        try {
          if (response.data > 0) {
            setInputErrors((prev) => {
              const { u, ...rest } = prev;
              return { ...rest, u: "red" };
            });
            setError("Username already exists");
            setUsernameExists(true);
          } else {
            setInputErrors((prev) => {
              const { u, ...rest } = prev;
              return rest;
            });
            setUsernameExists(false);
          }
          return;
        } catch (error) {
          setError(JSON.stringify(error));
        }
      }
    }

    checkExistingUsername();
  }, [username]);

  function handleNameCheck() {
    if (name.length < 2 || name.length > 20) {
      setError("Name must be between 2 and 20 characters long");
      setInputErrors((prev) => ({ ...prev, n: "red" }));
      return;
    }

    inputErrors.n &&
      setInputErrors((prev) => {
        const { n, ...rest } = prev;
        return rest;
      });
    return;
  }

  function handleUsernameCheck() {
    if (username.length < 2 || username.length > 20) {
      setError("Username must be between 2 and 20 characters long");
      setInputErrors((prev) => ({ ...prev, u: "red" }));
      return;
    }

    inputErrors.u &&
      !usernameExists &&
      setInputErrors((prev) => {
        const { u, ...rest } = prev;
        return rest;
      });
    return;
  }

  function handleEmailCheck() {
    const validEmail = /^\S+\w{1}@[a-z0-9-]+.[a-z]{2,4}$/i.test(email);
    if (!validEmail) {
      setError("Please, enter a valid email");
      setInputErrors((prev) => ({ ...prev, e: "red" }));
      return;
    }

    inputErrors.e &&
      setInputErrors((prev) => {
        const { e, ...rest } = prev;
        return rest;
      });
    return;
  }

  function handlePasswordCheck() {
    if (password.length < 6 || password.length > 20) {
      setError("Password must be between 6 and 20 characters long");
      setInputErrors((prev) => ({ ...prev, p: "red" }));
      return;
    }

    inputErrors.p &&
      setInputErrors((prev) => {
        const { p, ...rest } = prev;
        return rest;
      });
    return;
  }

  function handlePasswordConfirmCheck() {
    if (password !== passwordConfirm) {
      setError("Password confirmation failed");
      setInputErrors((prev) => ({ ...prev, c: "red" }));
      return;
    }

    inputErrors.c &&
      setInputErrors((prev) => {
        const { c, ...rest } = prev;
        return rest;
      });
    return;
  }

  function handleAddressCheck() {
    const validAddress =
      /^[a-z]+( [a-z]+){0,5} {1}\d{1,4}, \d{1,8} [a-z]+( [a-z]+){0,5}, [a-z]+( [a-z]+){0,3}$/i.test(
        address
      );
    if (!validAddress) {
      setError("Address format: Street name 42, 123 City, Country");
      setInputErrors((prev) => ({ ...prev, a: "red" }));
      return;
    }

    inputErrors.a &&
      setInputErrors((prev) => {
        const { a, ...rest } = prev;
        return rest;
      });
    return;
  }

  function handleRegister() {
    if (inputErrors.size > 0 || !(name && username && email && password)) {
      setError("Invalid inputs");
      return;
    }
    dispatch(createUser({ name, username, email, address, password }));
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
    address,
    setAddress,
    handleAddressCheck,
    error,
    setError,
    handleRegister,
    inputErrors,
  };
}

export default useRegister;
