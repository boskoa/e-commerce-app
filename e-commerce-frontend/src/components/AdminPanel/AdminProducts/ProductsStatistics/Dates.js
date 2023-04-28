import styled from "styled-components";
import { Input } from "../../styledElements";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 3px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.newsletter};
  color: ${({ theme }) => theme.color};
  border: none;
  box-shadow: 0 0 5px 0 black;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    box-shadow: none;
    transform: scale(0.99);
  }
`;

function Dates({ start, setStart, end, setEnd, handleDateObjects }) {
  return (
    <Container>
      <Input
        placeholder="Enter start date (yyyy-mm--dd)"
        type="text"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        style={{ minWidth: "200px" }}
      />
      <Button onClick={handleDateObjects}>Refetch</Button>
      <Input
        placeholder="Enter end date (yyyy-mm--dd)"
        type="text"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        style={{ minWidth: "200px" }}
      />
    </Container>
  );
}

export default Dates;
