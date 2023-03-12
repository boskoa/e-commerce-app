import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useRegister from "../../customHooks/useRegister";
import {
  Button,
  ButtonGroup,
  Error,
  Input,
  InputData,
} from "../../features/login/Login/InputBox";

const Agreement = styled.span`
  font-size: 12px;
  text-align: center;
`;

function InputBox() {
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
  } = useRegister();
  const navigate = useNavigate();

  return (
    <InputData>
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleNameCheck}
      ></Input>
      <Input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={handleUsernameCheck}
      ></Input>
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleEmailCheck}
      ></Input>
      <Input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={handlePasswordCheck}
      ></Input>
      <Input
        placeholder="confirm password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        onBlur={handlePasswordConfirmCheck}
      ></Input>
      <Agreement>
        By creating an account, I consent to the processing of my personal data
        in accordance with the <b>PRIVACY POLICY</b>
      </Agreement>
      <ButtonGroup>
        <Button
          onClick={() => {
            setError("");
            navigate("/");
          }}
        >
          Cancel
        </Button>
        <Button disabled={inputErrors?.length > 0} onClick={handleRegister}>
          Submit
        </Button>
      </ButtonGroup>
      <Error>{error}</Error>
    </InputData>
  );
}

export default InputBox;
