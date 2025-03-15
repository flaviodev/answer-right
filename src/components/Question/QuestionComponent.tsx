import { useState } from "react";
import { Container, ErrorMessage, WordContainer, InputStatus, ResultText, QuestionContainer, MicroButton, SpeakButton, ButtonContainer } from "./Question.style";
import { Question, SpeechRecognitionEvent } from "../Types";
import { FaMicrophone, FaEllipsisH, FaVolumeUp } from "react-icons/fa";

const QuestionComponent = ({question, allowSpeakQuestion, isSpeakCorrection, onAnswer} : {question: Question, allowSpeakQuestion: boolean, isSpeakCorrection: Boolean, onAnswer: (match: Boolean) => void}) => {

  const [spokenText, setSpokenText] = useState<string>("");
  const [micState, setMicState] = useState<"ready" | "waiting" | "listening" | "locked">("ready");
  const [speakState, setSpeakState] = useState<"ready" | "speaking" | "locked">("ready");
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
    setMicState("waiting");
    setSpeakState("locked");
    setSpokenText("");
    recognition.start();

    setTimeout(() => {
      setMicState("listening");
    }, 900);
  };

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    setSpokenText(transcript);
    setMicState("ready");
  

    const match = transcript === question.answer.trim().toLowerCase();
    setIsMatch(match);
    speakResult(match);
  };

  recognition.onerror = () => {
    setMicState("ready");
    setSpeakState("ready");
  };

  recognition.onend = () => {
    setMicState("ready");
    setSpeakState("ready");
  };

  const speakQuestion = () => {
    setMicState("locked");
    setSpeakState("speaking");
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = "pt-BR";
    utterance.text = question.value;
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
      setMicState("ready");
      setSpeakState("ready");
    };
  }

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
          utterance.text = `Errado! A resposta certa é ${question.answer}`;
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
      setSpeakState("ready");
    };
  };

  return (
    <Container>
      {!allowSpeakQuestion ? ( 
        <WordContainer
          type="text"
          value={question.value}
          status={status}
          disabled
        />
      ) : (
        <QuestionContainer>{question.value}</QuestionContainer>
      )}
      <ButtonContainer>
        {allowSpeakQuestion && (
          <SpeakButton onClick={speakState === "ready" ? speakQuestion : undefined} state={speakState}>
            <FaVolumeUp />
          </SpeakButton>
        )}
        <MicroButton onClick={micState === "ready" ? startListening : undefined} state={micState}>
          {micState === "waiting" ? <FaEllipsisH /> : <FaMicrophone />}
        </MicroButton>
      </ButtonContainer>

      {spokenText && !isMatch && (
        <ResultText match={isMatch}>
          {`Você disse: ${spokenText}`}
        </ResultText>
      )}
    </Container>
  );
};

export default QuestionComponent;

