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
    address,
    setAddress,
    handleAddressCheck,
    error,
    setError,
    handleRegister,
    inputErrors,
  } = useRegister();
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
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={handlePasswordCheck}
      ></Input>
      <Input
        style={{ borderColor: inputErrors?.c && "red" }}
        type="password"
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
        <Button
          disabled={Object.keys(inputErrors)?.length > 0}
          onClick={handleRegister}
        >
          Submit
        </Button>
      </ButtonGroup>
      <Error>{error}</Error>
    </InputData>
  );
}

export default InputBox;
