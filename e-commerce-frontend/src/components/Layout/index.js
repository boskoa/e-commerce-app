import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Announcement from "./Announcement";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Newsletter from "./Newsletter";

const Container = styled.div`
  min-height: 100vh;
  min-width: 320px;
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
