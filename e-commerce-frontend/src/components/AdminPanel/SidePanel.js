import { Link } from "react-router-dom";
import styled from "styled-components";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PeopleIcon from "@mui/icons-material/People";
import CampaignIcon from "@mui/icons-material/Campaign";
import CategoryIcon from "@mui/icons-material/Category";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  background-color: ${({ theme }) => theme.secondary};
  color: white;
  gap: 10px;
  padding: 3px;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

function SidePanel({ user }) {
  return (
    <Container>
      <LinkContainer>
        <CheckroomIcon />
        <Link
          to={`/${user.id}/admin-panel/products`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          products
        </Link>
      </LinkContainer>
      <LinkContainer>
        <PeopleIcon />
        <Link
          to={`/${user.id}/admin-panel/users`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          users
        </Link>
      </LinkContainer>
      <LinkContainer>
        <CampaignIcon />
        <Link
          to={`/${user.id}/admin-panel/announcements`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          announcements
        </Link>
      </LinkContainer>
      <LinkContainer>
        <CategoryIcon />
        <Link
          to={`/${user.id}/admin-panel/categories`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          categories
        </Link>
      </LinkContainer>
    </Container>
  );
}

export default SidePanel;
