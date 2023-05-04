import { Input } from "../../styledElements";
import { TopButton } from "../../../../features/orderedProducts/Cart/ShoppingBag/TopComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../../../features/login/loginSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../features/users/usersSlice";
import {
  Button,
  Form,
  PseudoButton,
} from "../../../../features/users/UserSettings/Avatar";
import {
  Container,
  Error,
  ImageContainer,
  InputContainer,
  Label,
  ProductInfo as UserInfo,
} from "../../AdminProducts/SingleProductAdmin/ProductData";
import { updateUser } from "../../../../features/users/usersSlice";
import styled from "styled-components";
import NamingError from "./NamingError";

const Image = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin: 20px 60px;
  box-shadow: 0 0 5px -1px black;
`;

function UserData() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [namingError, setNamingError] = useState("");
  const [username, setUsername] = useState("");
  const [uName, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [disabled, setDisabled] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [name, setName] = useState("Choose avatar");
  const [file, setFile] = useState();
  const admin = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    await axios.post(`/api/avatars/${user.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `bearer ${admin.token}`,
      },
    });

    window.location.reload();
  }

  useEffect(() => {
    async function handleUserFetch() {
      if (!id) {
        setError("ID missing");
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/${id}`, {
          headers: {
            Authorization: `bearer ${admin.token}`,
          },
        });
        setError("");
        setUser(response.data);
      } catch {
        setError("No such user");
      }
    }

    handleUserFetch();
  }, [id, admin, dispatch]);

  useEffect(() => {
    if (user?.id) {
      setUsername(user.username);
      setUName(user.name);
      setEmail(user.email);
      setAddress(user.address);
      setDisabled(user.disabled);
      setIsAdmin(user.admin);
    }
  }, [user]);

  async function handleUsernameUpdate() {
    if (username === user.username) {
      return;
    }

    if (username.length < 2 || username.length > 20) {
      setNamingError("Username must be between 2 and 20 characters long");
      return;
    }

    const response = await axios.post(`${BASE_URL}/check-username`, {
      username,
    });
    if (response.data > 0) {
      setNamingError("Username already exists");
      return;
    } else {
      setNamingError("");
    }

    dispatch(
      updateUser({ id: user.id, token: admin.token, newData: { username } })
    );

    setNamingError("");
  }

  function handleUNameUpdate() {
    if (uName === user.username) {
      return;
    }

    if (uName.length < 2 || uName.length > 20) {
      setNamingError("Name must be between 2 and 20 characters long");
      return;
    }

    dispatch(
      updateUser({
        id: user.id,
        token: admin.token,
        newData: { uName },
      })
    );

    setNamingError("");
  }

  function handleEmailUpdate() {
    if (email === user.email) {
      return;
    }

    const validEmail = /^\S+\w{1}@[a-z0-9-]+.[a-z]{2,4}$/i.test(email);
    if (!validEmail) {
      setNamingError("Please, enter a valid email");
      return;
    }

    dispatch(
      updateUser({
        id: user.id,
        token: admin.token,
        newData: { email },
      })
    );

    setNamingError("");
  }

  function handleAddressUpdate() {
    if (address === user.address) {
      return;
    }

    const validAddress =
      /^[a-z]+( [a-z]+){0,5} {1}\d{1,4}, \d{1,8} [a-z]+( [a-z]+){0,5}, [a-z]+( [a-z]+){0,3}$/i.test(
        address
      );
    if (!validAddress) {
      setNamingError("Address format: Street name 42, 123 City, Country");
      return;
    }

    dispatch(
      updateUser({
        id: user.id,
        token: admin.token,
        newData: { address },
      })
    );

    setNamingError("");
  }

  function handleDisabledUpdate() {
    if (disabled === user.disabled) {
      return;
    }

    dispatch(
      updateUser({
        id: user.id,
        token: admin.token,
        newData: {
          disabled: disabled === "true" ? true : user.id === 1 ? true : false,
        },
      })
    );
  }

  function handleIsAdminUpdate() {
    if (isAdmin === user.admin) {
      return;
    }

    dispatch(
      updateUser({
        id: user.id,
        token: admin.token,
        newData: {
          admin: isAdmin === "true" ? true : user.id === 1 ? true : false,
        },
      })
    );
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <Container>
      <ImageContainer>
        <Image
          alt="user image"
          src={`/public/data/uploads/avatars/${user.id}.webp`}
          onError={(e) =>
            (e.currentTarget.src = "/data/defaults/user_avatar.webp")
          }
        />
        <Form id="user-form" encType="multipart/form-data">
          <label htmlFor="user" style={{ maxWidth: "70%" }}>
            <input
              style={{
                display: "none",
              }}
              id="user"
              type="file"
              name="user"
              onChange={(e) => {
                setName(user.id);
                setFile(e.target.files[0]);
              }}
            />
            <PseudoButton>Choose avatar</PseudoButton>
          </label>
          <Button disabled={!file} onClick={(e) => handleSubmit(e)}>
            Set
          </Button>
        </Form>
        {file && (
          <Image alt="chosen avatar" src={file && URL.createObjectURL(file)} />
        )}
      </ImageContainer>
      <UserInfo>
        <NamingError error={namingError} />
        <InputContainer>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TopButton type="checkout" onClick={handleUsernameUpdate}>
            Change
          </TopButton>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="uName">Name</Label>
          <Input
            type="text"
            id="uName"
            placeholder="Name"
            value={uName}
            onChange={(e) => setUName(e.target.value)}
          />
          <TopButton type="checkout" onClick={handleUNameUpdate}>
            Change
          </TopButton>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            id="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TopButton type="checkout" onClick={handleEmailUpdate}>
            Change
          </TopButton>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TopButton type="checkout" onClick={handleAddressUpdate}>
            Change
          </TopButton>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="disabled">Blocked</Label>
          <Input
            type="text"
            id="disabled"
            placeholder="disabled"
            value={disabled}
            onChange={(e) => setDisabled(e.target.value)}
          />
          <TopButton type="checkout" onClick={handleDisabledUpdate}>
            Change
          </TopButton>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="isAdmin">Admin</Label>
          <Input
            type="text"
            id="isAdmin"
            placeholder="isAdmin"
            value={isAdmin}
            onChange={(e) => setIsAdmin(e.target.value)}
          />
          <TopButton type="checkout" onClick={handleIsAdminUpdate}>
            Change
          </TopButton>
        </InputContainer>
      </UserInfo>
    </Container>
  );
}

export default UserData;
