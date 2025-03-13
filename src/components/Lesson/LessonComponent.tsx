import { useEffect, useState } from "react";
import { Lesson, Question } from "../Types";
import { useFetch } from "../../hooks/useFetch";
import QuestionComponent from "../Question/QuestionComponent";
import { shuffle } from "../../utils";
import { Button, Container, Instructions, Progress, ProgressBarContainer, Title } from "./Lesson.style";

const LessonComponent = ({lessonId} : {lessonId: string}) => {
  const { data, error, isLoading } = useFetch<Lesson>(`/api/lessons/${lessonId}`);
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
    if (match) {
      setCorrectCount(correctCount + 1);
    } else {
      setWrongCount(wrongCount + 1);
    }
    setCompleted(((currentIndex + 1) / questions.length) * 100);
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
          <QuestionComponent question={questions[currentIndex]} onAnswer={onAnswer} isSpeakCorrection={true}/>
          <ProgressBarContainer>
            <Progress progress={completed} />
          </ProgressBarContainer>
        </>
      ) : (
        <>
          <h2>{correctCount === questions.length ? "🎉 Parabéns! Você acertou tudo!" : "❌ Você errou algumas palavras!"}</h2>
          {correctCount !== questions.length && <p>Seu resultado: {correctCount}/{questions.length}</p>}
          <Button onClick={restartGame}>Tentar Novamente</Button>
        </>
      )}
    </Container>
  );
};

export default LessonComponent;

