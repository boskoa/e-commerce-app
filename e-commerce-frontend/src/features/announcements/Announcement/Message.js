import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

function Message({ text }) {
  return <Container>{text}</Container>;
}

export default Message;
