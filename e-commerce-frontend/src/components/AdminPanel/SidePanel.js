import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PeopleIcon from "@mui/icons-material/People";
import CampaignIcon from "@mui/icons-material/Campaign";
import CategoryIcon from "@mui/icons-material/Category";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  background-color: rgba(0, 0, 0, 0.2);
  gap: 10px;
  padding: 3px;
  overflow: hidden;

  @media only screen and (max-width: 520px) {
    width: 30px;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

function SidePanel({ user }) {
  return (
    <Container>
      <NavLink
        to={`/${user.id}/admin-panel/products`}
        style={({ isActive }) => ({
          textDecoration: "none",
          fontWeight: "bold",
          color: isActive ? "red" : "inherit",
        })}
      >
        <LinkContainer>
          <CheckroomIcon />
          products
        </LinkContainer>
      </NavLink>
      <NavLink
        to={`/${user.id}/admin-panel/users`}
        style={({ isActive }) => ({
          textDecoration: "none",
          fontWeight: "bold",
          color: isActive ? "red" : "inherit",
        })}
      >
        <LinkContainer>
          <PeopleIcon />
          users
        </LinkContainer>
      </NavLink>
      <NavLink
        to={`/${user.id}/admin-panel/announcements`}
        style={({ isActive }) => ({
          textDecoration: "none",
          fontWeight: "bold",
          color: isActive ? "red" : "inherit",
        })}
      >
        <LinkContainer>
          <CampaignIcon />
          announcements
        </LinkContainer>
      </NavLink>
      <NavLink
        to={`/${user.id}/admin-panel/categories`}
        style={({ isActive }) => ({
          textDecoration: "none",
          fontWeight: "bold",
          color: isActive ? "red" : "inherit",
        })}
      >
        <LinkContainer>
          <CategoryIcon />
          categories
        </LinkContainer>
      </NavLink>
    </Container>
  );
}

export default SidePanel;
