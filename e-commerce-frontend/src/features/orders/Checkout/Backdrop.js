import styled from "styled-components";

const BackdropElement = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  pointer: none;
`;

function Backdrop() {
  return <BackdropElement />;
}

export default Backdrop;
