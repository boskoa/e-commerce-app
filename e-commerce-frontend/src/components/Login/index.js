import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.1)
    ),
    url("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Women%27s_clothes_store_%28Unsplash%29.jpg/2560px-Women%27s_clothes_store_%28Unsplash%29.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 10px;
  max-width: 350px;
  box-shadow: 1px 1px 10px 2px black;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const InputData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.color};
  height: 30px;
  padding: 5px;
`;

const Button = styled.button`
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
`;

function Login() {
  return (
    <Container>
      <Wrapper>
        <Title>Log in</Title>
        <InputData>
          <Input placeholder="username"></Input>
          <Input placeholder="password"></Input>
          <Button>Log in</Button>
          <Forgot>Forgot password?</Forgot>
        </InputData>
      </Wrapper>
    </Container>
  );
}

export default Login;