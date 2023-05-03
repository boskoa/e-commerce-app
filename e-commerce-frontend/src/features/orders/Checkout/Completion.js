import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

function Completion() {
  const navigate = useNavigate();

  useEffect(() => {
    const index = setTimeout(() => navigate("/"), 5000);

    return () => clearTimeout(index);
  }, [navigate]);

  return (
    <Container>
      <h4>Payment was successful</h4>
    </Container>
  );
}

export default Completion;
