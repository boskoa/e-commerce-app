import styled from "styled-components";
import { Title } from ".";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../../features/login/loginSlice";

const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  min-width: 250px;
`;

const Links = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 80px;
`;

const LinkItem = styled.p`
  font-size: 14px;
`;

const linkParams = {
  style: { textDecoration: "none", color: "inherit" },
  onClick: () => window.scroll({ top: 0, left: 0, behavior: "smooth" }),
};

function CenterComponent() {
  const loggedUser = useSelector(selectLoggedUser);

  return (
    <Center>
      <Title>Useful links</Title>
      <Links>
        <Link {...linkParams} to="/">
          <LinkItem>Home</LinkItem>
        </Link>
        <Link {...linkParams} to={`/cart/${loggedUser?.id}`}>
          <LinkItem>Cart</LinkItem>
        </Link>
        <Link {...linkParams} to="/category-products/men">
          <LinkItem>Men fashion</LinkItem>
        </Link>
        <Link {...linkParams} to="/category-products/women">
          <LinkItem>Women fashion</LinkItem>
        </Link>
        <Link {...linkParams} to="/category-products/accessories">
          <LinkItem>Accessories</LinkItem>
        </Link>
        <Link {...linkParams} to="/user-settings">
          <LinkItem>My account</LinkItem>
        </Link>
        <Link {...linkParams} to={`/cart/${loggedUser?.id}/wishlist`}>
          <LinkItem>Wishlist</LinkItem>
        </Link>
        <Link {...linkParams} to="/terms">
          <LinkItem>Terms</LinkItem>
        </Link>
      </Links>
    </Center>
  );
}

export default CenterComponent;
