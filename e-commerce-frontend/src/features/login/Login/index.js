import styled from "styled-components";
import InputBox from "./InputBox";

const Container = styled.div`
  height: 100vh;
  min-width: 320px;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.1)
    ),
    url(/public/data/defaults/backgrounds/login-register.webp);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 10px;
  width: 300px;
  height: 260px;
  box-shadow: 1px 1px 10px 2px black;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bg};
`;

function Login() {
  return (
    <Container>
      <Wrapper>
        <Title>Log in</Title>
        <InputBox />
      </Wrapper>
    </Container>
  );
}

export default Login;
