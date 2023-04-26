import styled from "styled-components";
import { TopButton } from "../../features/orderedProducts/Cart/ShoppingBag/TopComponent";

export const Button = styled(TopButton)`
  width: 150px;
  box-shadow: ${({ active }) => (active ? "0 0 5px 0 black" : "")};
`;

export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.color};
  background-color: transparent;
  outline: none;
  padding: 3px;
  transition: all 0.3s;

  &:focus {
    border: 1px solid lime;
    box-shadow: 0 0 3px 0 lime;
  }
`;

export const Textarea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.color};
  background-color: transparent;
  outline: none;
  padding: 3px;
  max-width: 100%;
  transition: all 0.3s;

  &:focus {
    border: 1px solid lime;
    box-shadow: 0 0 3px 0 lime;
  }
`;
