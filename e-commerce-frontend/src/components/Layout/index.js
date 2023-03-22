import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../../features/announcements/Announcement";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Newsletter from "./Newsletter";

const Container = styled.div`
  min-height: 100vh;
  min-width: 320px;
  background-image: ${({ theme }) =>
    `linear-gradient(to bottom right, ${theme.base[0]} 20%, ${theme.base[1]} 50%)`};
  color: ${({ theme }) => theme.color};
  transition: all 0.3s;
`;

function Layout({ handleTheme }) {
  return (
    <Container>
      <NavBar handleTheme={handleTheme} />
      <Announcement />
      <Outlet />
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default Layout;
