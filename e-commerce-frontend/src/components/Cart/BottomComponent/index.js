import styled from "styled-components";
import InfoComponent from "./InfoComponent";
import SummaryComponent from "./SummaryComponent";

const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  gap: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

function BottomComponent() {
  return (
    <Bottom>
      <InfoComponent />
      <SummaryComponent />
    </Bottom>
  );
}

export default BottomComponent;
