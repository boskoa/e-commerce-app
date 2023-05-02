import styled from "styled-components";

const Error = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  font-size: 14px;
  color: white;
  background-color: red;
  border-radius: 3px;
  box-shadow: 0 0 5px 0 black;
  transform: translateX(${({ error }) => (error ? "" : "250")}px);
  transition: all 0.8s;
`;

function NamingError({ error }) {
  return <Error error={error}>{error}</Error>;
}

export default NamingError;
