import styled from "styled-components";
import LogoContainer from "./LogoContainer";

const Center = styled.div`
  flex: 1;
  max-width: ${({ inputActive }) => (inputActive ? "0px" : "200px")};
  overflow: hidden;
  transition: ${({ inputActive }) =>
    inputActive ? "all 0.5s" : "all 0.5s 0.2s"};
`;

function CenterSection({ inputActive }) {
  return (
    <Center inputActive={inputActive}>
      <LogoContainer name="Rags!" />
    </Center>
  );
}

export default CenterSection;
