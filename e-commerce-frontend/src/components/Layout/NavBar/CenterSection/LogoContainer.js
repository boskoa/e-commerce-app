import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;

  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

function LogoContainer({ name }) {
  return (
    <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
      <Logo>{name}</Logo>
    </Link>
  );
}

export default LogoContainer;
