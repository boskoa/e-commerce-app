import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetError,
  selectUserCreated,
  selectUsersError,
  resetSuccess,
  BASE_URL,
  updateUser,
} from "../features/users/usersSlice";
import { logout } from "../features/login/loginSlice";

function useUpdateProfile(loggedUser) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [usernameExists, setUsernameExists] = useState(false);
  const usersError = useSelector(selectUsersError);
  const updateSuccess = useSelector(selectUserCreated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser) {
      setName(loggedUser.name);
      setUsername(loggedUser.username);
      setEmail(loggedUser.email);
      setAddress(loggedUser.address);
    }
  }, [loggedUser, setName, setUsername, setEmail, setAddress]);

  useEffect(() => {
    let index;
    if (error) {
      index = setTimeout(() => setError(""), 3000);
    }

    return () => clearTimeout(index);
  }, [error]);

  useEffect(() => {
    if (usersError) {
      setError("Update failed");
    }

    return () => dispatch(resetError());
  }, [usersError, dispatch]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(logout());
    }

    return () => dispatch(resetSuccess());
  }, [updateSuccess, newPassword, dispatch]);

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

    if (username !== loggedUser?.username) {
      checkExistingUsername();
    }
  }, [username, loggedUser]);

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
    if (
      (newPassword.length > 0 && newPassword.length < 6) ||
      newPassword.length > 20
    ) {
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

  function handleUpdate() {
    if (inputErrors.size > 0 || !(name && username && email)) {
      setError("Invalid inputs");
      return;
    }

    if (
      name === loggedUser.name &&
      username === loggedUser.username &&
      email === loggedUser.email &&
      address === loggedUser.address &&
      !newPassword
    ) {
      setError("Nothing to change");
      return;
    }
    if (!newPassword) {
      dispatch(
        updateUser({
          token: loggedUser.token,
          newData: { name, username, email, address },
          id: loggedUser.id,
        })
      );
    } else {
      dispatch(
        updateUser({
          token: loggedUser.token,
          newData: { name, username, email, address, password: newPassword },
          id: loggedUser.id,
        })
      );
    }
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
    newPassword,
    setNewPassword,
    handlePasswordCheck,
    address,
    setAddress,
    handleAddressCheck,
    error,
    setError,
    handleUpdate,
    inputErrors,
  };
}

export default useUpdateProfile;
