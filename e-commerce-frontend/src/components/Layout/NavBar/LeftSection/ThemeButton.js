import DarkModeIcon from "@mui/icons-material/DarkMode";
import styled, { useTheme } from "styled-components";

const IconContainer = styled.div`
  background-color: inherit;
  border-radius: 50%;
  box-shadow: 1px 1px 5px -1px grey;
  height: 2em;
  width: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:active {
    box-shadow: none;
  }
`;

function ThemeButton({ handleTheme }) {
  const theme = useTheme();

  return (
    <IconContainer onClick={handleTheme} title="Switch to dark/light mode">
      <DarkModeIcon
        style={{
          color: theme.icon,
          transition: "color 1s",
        }}
      />
    </IconContainer>
  );
}

export default ThemeButton;
