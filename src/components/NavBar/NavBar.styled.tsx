import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  font-family: 'Poppins', sans-serif;
  width: 100%;
  height: 60px;
  background-color: #333;
  display: flex;
  align-items: center;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 15px;
  position: fixed;

  &:hover {
    color: #e0e0e0;
  }
`;

export const Title = styled.div`
  display: flex;
  gap: 20px;
  margin-left: auto;  
  margin-right: auto;  
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
`;
