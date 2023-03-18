import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

export const ButtonContainer = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

function CloseButton({ setShow }) {
  return (
    <ButtonContainer
      onClick={() => {
        setShow(false);
      }}
    >
      <CloseIcon />
    </ButtonContainer>
  );
}

export default CloseButton;
