import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useUpdateProfile from "../../../customHooks/useUpdateProfile";

const InputData = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 50%;
  min-height: 360px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bg};
  height: 30px;
  min-width: 50%;
  padding: 5px;
`;

const Button = styled.button`
  padding: 5px;
  width: 140px;
  background-color: inherit;
  color: ${({ theme }) => theme.color};
  border: 1px solid ${({ theme }) => theme.color};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Error = styled.div`
  width: 100%;
  font-size: 14px;
  color: red;
  text-align: center;
`;

function UserData({ user }) {
  const {
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
  } = useUpdateProfile(user);
  const navigate = useNavigate();

  return (
    <InputData>
      <Input
        style={{ borderColor: inputErrors?.n && "red" }}
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleNameCheck}
      ></Input>
      <Input
        style={{ borderColor: inputErrors?.u && "red" }}
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={handleUsernameCheck}
      ></Input>
      <Input
        style={{ borderColor: inputErrors?.e && "red" }}
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleEmailCheck}
      ></Input>
      <Input
        style={{ borderColor: inputErrors?.a && "red" }}
        type="text"
        placeholder="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onBlur={handleAddressCheck}
      ></Input>
      <Input
        style={{ borderColor: inputErrors?.p && "red" }}
        type="password"
        placeholder="new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        onBlur={handlePasswordCheck}
      ></Input>
      <Button
        disabled={Object.keys(inputErrors)?.length > 0}
        onClick={handleUpdate}
      >
        Update
      </Button>
      <Button
        onClick={() => {
          setError("");
          navigate("/");
        }}
      >
        Back
      </Button>
      <Error>{error}</Error>
    </InputData>
  );
}

export default UserData;
