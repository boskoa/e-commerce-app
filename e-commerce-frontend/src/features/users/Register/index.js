import styled from "styled-components";
import InputBox from "./InputBox";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../login/loginSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
  height: 480px;
  box-shadow: 1px 1px 10px 2px black;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bg};
`;

function Register() {
  const logged = useSelector(selectLoggedUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (logged?.id) {
      navigate("/");
    }
  }, [logged, navigate]);

  return (
    <Container>
      <Wrapper>
        <Title>Register an account</Title>
        <InputBox />
      </Wrapper>
    </Container>
  );
}

export default Register;
