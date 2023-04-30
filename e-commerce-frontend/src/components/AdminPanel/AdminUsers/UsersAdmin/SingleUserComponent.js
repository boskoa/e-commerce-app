import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../../../features/login/loginSlice";
import {
  Button,
  ButtonsContainer,
  Info,
  Title,
} from "../../AdminProducts/ProductsAdmin/SingleProductComponent";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BlockIcon from "@mui/icons-material/Block";

const Container = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-wrap: wrap;
  gap: 5px;
  height: 120px;
  max-width: 280px;
  min-width: 200px;
  overflow: hidden;
  color: ${({ theme }) => theme.color};
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.7);
  transition: all 0.3s;
`;

const ImageContainer = styled.div`
  width: 60px;
  height: 60px;
  align-self: stretch;
  position: relative;
  margin: 2px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const Data = styled.p`
  font-size: 12px;
`;

const IconContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 5px;
  bottom: 5px;
`;

function SingleUserComponent({ user }) {
  const admin = useSelector(selectLoggedUser);

  return (
    <Container>
      <Info>
        <Title>{user.name}</Title>
        <Data>Username: {user.username}</Data>
        <Data>ID: {user.id}</Data>
        <Data>{user.email}</Data>
        <IconContainer>
          {user.admin && <AdminPanelSettingsIcon sx={{ fontSize: "20px" }} />}
          {/*dodati tooltip*/}
          {user.disabled && <BlockIcon sx={{ fontSize: "20px" }} />}
        </IconContainer>
        <ButtonsContainer>
          <Link to={`/${admin.id}/admin-panel/users/single-stats/${user.id}`}>
            <Button>Stats</Button>
          </Link>
          <Link to={`/${admin.id}/admin-panel/users/single/${user.id}`}>
            <Button>Change</Button>
          </Link>
        </ButtonsContainer>
      </Info>
      <ImageContainer>
        <Image
          alt="user image"
          src={`/public/data/uploads/avatars/${user.id}.webp`}
        />
      </ImageContainer>
    </Container>
  );
}

export default SingleUserComponent;
