import styled from "styled-components";

export enum InputStatus {
  Default = "default",
  Correct = "correct",
  Wrong = "wrong",
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 400px;
  padding: 5px;
  background-color: #fff;
  margin: auto;
  text-align: center;
`;

export const WordContainer = styled.div<{ status: InputStatus }>`
  width: 100%;
  margin: 12px;
  padding: 12px;
  gap: 5px;
  align-items: center;
  border: 3px solid
    ${({ status }) =>
      status === InputStatus.Correct ? "green" : status === InputStatus.Wrong ? "red" : "#ccc"};
  border-radius: 8px;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border-color: ${({ status }) =>
      status === InputStatus.Correct ? "darkgreen" : status === InputStatus.Wrong ? "darkred" : "#666"};
  }
`;

export const NormalText = styled.div`
  margin-top: 5px;
  font-size: 2.2rem;
`;

export const CursiveText = styled.div`
  font-family: "Playwrite BR Guides", cursive;
  font-size: 2.2rem;
`;

export const QuestionContainer = styled.h2`
  font-size: 1.0rem;
  margin-bottom: 12px;
`;

export const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  direction: row;
  gap: 10px;
`;

export const MicroButton = styled.button<{ state: "ready" | "waiting" | "listening" | "locked" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 50%;
  background-color: ${({ state }) =>
    state === "locked" || state === "waiting" ? "gray" :  (state === "ready" ? "#007bff" : "green")
  };
  color: white;
  font-size: 1.8rem;
  cursor: ${({ state }) => (state === "ready" ? "pointer" : "not-allowed")};
  transition: background 0.3s ease;

  &:hover {
    background-color: ${({ state }) =>
      state === "ready" ? "#0056b3" : state === "waiting" ? "gray" : state === "locked" ? "gray" : "green"};
  }
`;

export const SpeakButton = styled.button<{ state: "ready" | "speaking" | "locked" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 50%;
  background-color: ${({ state }) =>
    state === 'locked' ? 'gray' : (state === 'speaking' ? 'red' : 'orange')
  };
  color: white;
  font-size: 1.8rem;
  cursor: ${({ state }) => (state === "ready" ? "pointer" : "not-allowed")};
  transition: background 0.3s ease;
`;

export const ResultText = styled.p<{ match?: boolean }>`
  margin-top: 12px;
  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ match }) => (match === undefined ? "#333" : match ? "green" : "red")};
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 12px;
  font-size: 1.2rem;
`;

export const SeparatingPhonemes = styled.div`
  margin-top: 5px;
`;

export const Button = styled.button`
  font-size: 1.9rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-left: 1px;
  margin-right: 1px;

  &:hover {
    background-color: #0056b3;
  }
`;