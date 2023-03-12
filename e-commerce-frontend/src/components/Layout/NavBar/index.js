import styled from "styled-components";
import CenterSection from "./CenterSection";
import RightSection from "./RightSection";
import LeftSection from "./LeftSection";
import { useEffect, useRef, useState } from "react";

const Container = styled.div`
  height: 60px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.5s;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.color};
`;

function NavBar({ handleTheme }) {
  const [inputActive, setInputActive] = useState(false);
  const nav = useRef(null);

  useEffect(() => {
    let lastPosition = 0;

    function handleChange() {
      let newPosition = window.scrollY;
      if (newPosition >= lastPosition) {
        nav.current.style.top = "-60px";
      } else {
        nav.current.style.top = "0px";
      }

      lastPosition = newPosition <= 0 ? 0 : newPosition;
    }
    document.addEventListener("scroll", handleChange);

    return () => document.removeEventListener("scroll", handleChange);
  }, []);

  return (
    <Container ref={nav}>
      <Wrapper>
        <LeftSection
          handleTheme={handleTheme}
          inputActive={inputActive}
          setInputActive={setInputActive}
        />
        <CenterSection inputActive={inputActive} />
        <RightSection inputActive={inputActive} />
      </Wrapper>
    </Container>
  );
}

export default NavBar;
