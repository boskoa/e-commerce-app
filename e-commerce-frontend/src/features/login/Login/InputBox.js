import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useLogin from "../../../customHooks/useLogin";

export const InputData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bg};
  height: 30px;
  padding: 5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const Button = styled.button`
  padding: 5px;
  background-color: inherit;
  color: ${({ theme }) => theme.color};
  border: 1px solid ${({ theme }) => theme.color};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Forgot = styled.p`
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bg};
`;

export const Error = styled.p`
  font-size: 14px;
  color: red;
  background-color: ${({ theme }) => theme.bg};
  text-align: center;
`;

function InputBox() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    setError,
    handleLogin,
  } = useLogin();
  const navigate = useNavigate();

  return (
    <InputData>
      <Input
        type="text"
        value={username}
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      ></Input>
      <Input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      ></Input>
      <ButtonGroup>
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button onClick={handleLogin}>Log in</Button>
      </ButtonGroup>
      <Forgot onClick={() => setError("Tough luck")}>Forgot password?</Forgot>
      <Error>{error}</Error>
    </InputData>
  );
}

export default InputBox;
