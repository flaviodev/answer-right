import { useState } from "react";
import { Container, ErrorMessage, WordContainer, InputStatus, ResultText, QuestionContainer, MicroButton, SpeakButton, ButtonContainer } from "./Question.style";
import { Lesson, LessonType, Question, QuestionState, SpeechRecognitionEvent } from "../Types";
import { FaMicrophone, FaEllipsisH, FaVolumeUp } from "react-icons/fa";

const QuestionComponent = ({question, lesson, isSpeakCorrection, onAnswer} : {question: Question, lesson: Lesson, isSpeakCorrection: Boolean, onAnswer: (match: Boolean) => void}) => {

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

  const speakQuestion = () => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = "pt-BR";
    utterance.text = question.value;
    speechSynthesis.speak(utterance);
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
    };
  };

  return (
    <Container>
      {lesson.type === LessonType.AlphabetActivity ? ( 
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
        {lesson.type !== LessonType.AlphabetActivity && (
          <SpeakButton onClick={speakQuestion} state={QuestionState.Ready}>
            <FaVolumeUp />
          </SpeakButton>
        )}
        <MicroButton onClick={state === "ready" ? startListening : undefined} state={state}>
          {state === "waiting" ? <FaEllipsisH /> : <FaMicrophone />}
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

