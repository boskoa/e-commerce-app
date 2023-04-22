import { NavLink } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PeopleIcon from "@mui/icons-material/People";
import CampaignIcon from "@mui/icons-material/Campaign";
import CategoryIcon from "@mui/icons-material/Category";

const Container = styled.div`
  flex: 0 0 160px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  gap: 10px;
  padding: 3px;
  overflow: hidden;
  box-shadow: 0 0 5px 0 black;
  clip-path: inset(0 -15px 0 0);

  @media only screen and (max-width: 520px) {
    flex: 0 0 30px;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

function SidePanel({ user }) {
  const color = useTheme().sidebar;

  return (
    <Container>
      <NavLink
        to={`/${user.id}/admin-panel/products`}
        style={({ isActive }) => ({
          textDecoration: "none",
          fontWeight: "bold",
          color: isActive ? color : "inherit",
          textShadow: isActive && `0 0 3px ${color}`,
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
          color: isActive ? color : "inherit",
          textShadow: isActive && `0 0 3px ${color}`,
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
          color: isActive ? color : "inherit",
          textShadow: isActive && `0 0 3px ${color}`,
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
          color: isActive ? color : "inherit",
          textShadow: isActive && `0 0 3px ${color}`,
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
