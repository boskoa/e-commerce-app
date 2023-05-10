import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
      transform: rotate(0deg);
    }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 6px solid teal;
  border-top: 6px solid orange;
  border-radius: 50%;
  margin: 40vh calc(50% - 25px);
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
  box-shadow: 0px -3px 5px 0px rgba(0, 0, 0, 0.5),
    inset 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
`;

function Spinner() {
  return <Loader data-testid="spinner" />;
}

export default Spinner;
