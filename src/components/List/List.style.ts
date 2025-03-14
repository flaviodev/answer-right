import { FaCheckCircle } from "react-icons/fa";
import styled from "styled-components";

export const ListContainer = styled.div`
  max-width: 400px;
  margin: 20px auto;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ListItem = styled.li`
  font-family: 'Poppins', sans-serif;
  background: white;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  color: #333;
  transition: background 0.2s ease-in-out;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

export const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.0rem;
  margin-bottom: 12px;
`;

export const CheckIcon = styled(FaCheckCircle)<{ completed: boolean }>`
  color: ${(props) => (props.completed ? "#10b981" : "#d1d5db")};
  font-size:  1rem;
  margin-right: 12px;
`;
