import styled from "styled-components";
import { Search } from "@mui/icons-material";
import ThemeButton from "./ThemeButton";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid grey;
  display: flex;
  align-items: center;
  margin-left: 10px;
  height: 30px;
`;

const Input = styled.input`
  border: none;
  height: 100%;
  background-color: inherit;
  color: inherit;
  width: 120px;
  transition: all 0.5s;

  @media only screen and (max-width: 520px) {
    width: ${({ inputActive }) => (inputActive ? "150px" : "40px")};
  }
`;

function LeftSection({ handleTheme, inputActive, setInputActive }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickaway(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setInputActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickaway);

    return () => document.removeEventListener("mousedown", handleClickaway);
  }, [setInputActive]);

  function handleInput() {
    if (window.innerWidth <= 520) {
      setInputActive(true);
    }
  }

  return (
    <>
      <Left>
        <ThemeButton handleTheme={handleTheme} />
        <SearchContainer>
          <Input
            ref={inputRef}
            onClick={handleInput}
            inputActive={inputActive}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Link onClick={() => setTitle("")} to={`/searched-products/${title}`}>
            <Search
              style={{ color: "grey", fontSize: "18px", margin: "0 5px" }}
            />
          </Link>
        </SearchContainer>
      </Left>
    </>
  );
}

export default LeftSection;
