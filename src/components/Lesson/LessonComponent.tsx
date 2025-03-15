import { useEffect, useState } from "react";
import { Question } from "../Types";
import QuestionComponent from "../Question/QuestionComponent";
import { shuffle } from "../../utils";
import { Button, Container, Instructions, Progress, ProgressBarContainer, Title } from "./Lesson.style";
import { useLesson } from "../../hooks/useLesson";
import { useNavigate } from "react-router-dom";

const LessonComponent = ({lessonId} : {lessonId: string}) => {
  const navigate = useNavigate();
  const { data, error, isLoading, completeLesson } = useLesson(lessonId);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setQuestions(shuffle([...data.questions || []])); 
    }
  }, [data]); 
  
  if (isLoading || !data) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const onAnswer = (match: Boolean) => {
    setCurrentIndex(currentIndex + 1);
    let correct = correctCount;
    if (match) {
      setCorrectCount(correctCount + 1);
      correct++;
    } else {
      setWrongCount(wrongCount + 1);
    }
    setCompleted(((currentIndex + 1) / questions.length) * 100);

    if (correct === questions.length) {
      completeLesson(data);
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setCompleted(0);
    setWrongCount(0);
  };

  return (
    <Container> 
      {currentIndex < questions.length ? (
        <>
          <Title>{data.name}</Title>
          <Instructions>{data.instructions}</Instructions>
          <QuestionComponent question={questions[currentIndex]} allowSpeakQuestion={data.allowSpeakQuestion || false} onAnswer={onAnswer} isSpeakCorrection={true}/>
          <ProgressBarContainer>
            <Progress progress={completed} />
          </ProgressBarContainer>
        </>
      ) : (
        <>
          <h2>{correctCount === questions.length ? "🎉 Parabéns! Você acertou tudo!" : "❌ Você errou algumas palavras!"}</h2>
          {correctCount !== questions.length && <p>Seu resultado: {correctCount}/{questions.length}</p>}
          {correctCount === questions.length ? <Button onClick={() => navigate(-1)}>Completar novas lições</Button> : <Button onClick={restartGame}>Tentar Novamente</Button>}
        </>
      )}
    </Container>
  );
};

export default LessonComponent;

