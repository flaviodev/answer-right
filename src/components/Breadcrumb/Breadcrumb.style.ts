import styled from "styled-components";

export const BreadcrumbContainer = styled.nav`
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #007bff;
  gap: 5px;
  margin-bottom: 15px;
`;

export const Crumb = styled.span`
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: #0056b3;
  }

  &:not(:last-child)::after {
    content: " > ";
    margin: 0 5px;
    color: #888;
  }
`;
