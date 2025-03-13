import { useState } from "react";
import { CircleButton, Container, ErrorMessage, Input, InputStatus, ResultText } from "./Question.style";
import { Question, QuestionState, SpeechRecognitionEvent } from "../Types";
import { FaMicrophone, FaEllipsisH } from "react-icons/fa";

const QuestionComponent = ({question, isSpeakCorrection, onAnswer} : {question: Question, isSpeakCorrection: Boolean, onAnswer: (match: Boolean) => void}) => {

  const [spokenText, setSpokenText] = useState<string>("");
  const [state, setState] = useState<QuestionState>(QuestionState.Ready);
  const [status, setStatus] = useState<InputStatus>(InputStatus.Default);
  const [isMatch, setIsMatch] = useState<boolean | undefined>(undefined);  

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return <ErrorMessage>Seu navegador não suporta reconhecimento de fala.</ErrorMessage>;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "pt-BR";
  recognition.continuous = false;
  recognition.interimResults = false;
  
  const startListening = () => {
    setState(QuestionState.Waiting);
    setSpokenText("");
    recognition.start();

    setTimeout(() => {
      setState(QuestionState.Listening);
    }, 900);
  };

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    setSpokenText(transcript);
    setState(QuestionState.Ready);

    const match = transcript === question.answer.trim().toLowerCase();
    setIsMatch(match);
    speakResult(match);
  };

  recognition.onerror = () => {
    setState(QuestionState.Ready);
  };

  recognition.onend = () => {
    setState(QuestionState.Ready);
  };

  const speakResult = (match: boolean) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = "pt-BR";

    if (match) {
      setStatus(InputStatus.Correct);
      utterance.text = "Correto!";
      speechSynthesis.speak(utterance);
    } else {
        setStatus(InputStatus.Wrong);
        if (isSpeakCorrection) {
          utterance.text = `Errado! A palavra certa é ${question.answer}`;
          utterance.rate = 0.7; 
          speechSynthesis.speak(utterance);
        } else {
          utterance.text = `Errado!`;
          speechSynthesis.speak(utterance);  
        }
    }

    utterance.onend = () => {
      onAnswer(match);
      setSpokenText("");
      setStatus(InputStatus.Default);
    };
  };

  return (
    <Container>
      <Input
        type="text"
        value={question.value}
        status={status}
        disabled
      />
      <CircleButton onClick={state === "ready" ? startListening : undefined} state={state}>
        {state === "waiting" ? <FaEllipsisH /> : <FaMicrophone />}
      </CircleButton>

      {spokenText && !isMatch && (
        <ResultText match={isMatch}>
          {`Você disse: ${spokenText}`}
        </ResultText>
      )}
    </Container>
  );
};

export default QuestionComponent;

