import styled from "styled-components";

export const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: auto;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 1.0rem;
  margin-bottom: 12px;
`;

export const Instructions = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2px;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 5px;
  background: #e0e0e0;
  margin-top: 15px;
  margin-bottom: 15px;
  overflow: hidden;
`;

export const Progress = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background: #007bff;
  transition: width 0.4s ease;
`;

export const Button = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
