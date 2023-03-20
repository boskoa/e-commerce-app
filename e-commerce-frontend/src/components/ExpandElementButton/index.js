import styled, { keyframes } from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const IconContainer = styled.div`
  position: absolute;
  bottom: 14px;
  width: 30px;
  height: 25px;
  left: calc(50% - 15px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  cursor: pointer;
  box-shadow: 1px 1px 15px 0;
  border-radius: 5px;
  z-index: 20;
`;

const arrowAnimation = keyframes`
  from {
    transform: translateY(0px)
  }
  50% {
    transform: translateY(4px)
  }
  to {
    transform: translateY(0px)
  }
`;

const AnimationContainer = styled.div`
  width: 30px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    animation: ${arrowAnimation} 1s infinite;
  }
`;

function ExpandElementButton({ showAll, setShowAll }) {
  return (
    <IconContainer onClick={() => setShowAll((prev) => !prev)}>
      <AnimationContainer>
        {showAll ? (
          <KeyboardArrowUpIcon fontSize="large" style={{ color: "white" }} />
        ) : (
          <KeyboardArrowDownIcon fontSize="large" style={{ color: "white" }} />
        )}
      </AnimationContainer>
    </IconContainer>
  );
}

export default ExpandElementButton;
