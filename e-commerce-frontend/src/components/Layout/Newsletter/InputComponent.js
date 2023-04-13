import { Send } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 80%;
  height: 40px;
  padding: 2px;
  background-color: ${({ theme }) => theme.bg};
  transition: all 0.3s;
`;

const Input = styled.input`
  border: none;
  height: 100%;
  flex: 1;
  font-size: 100%;
  padding-left: 5px;
`;

const Button = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
  margin: 0 3px;
  height: 100%;
  transition: all 0.3s;
  color: ${({ theme }) => theme.color};

  &:active {
    transform: scale(0.9);
  }
`;

function InputComponent() {
  const [mail, setMail] = useState("");

  return (
    <InputContainer>
      <Input
        placeholder="Your email"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />
      <Button onClick={() => setMail("")}>
        <Send />
      </Button>
    </InputContainer>
  );
}

export default InputComponent;
