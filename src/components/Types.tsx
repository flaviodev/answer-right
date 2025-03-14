
export interface SpeechRecognitionResult {
  transcript: string;
}

export interface SpeechRecognitionEvent extends Event {
  results: { [key: number]: { [key: number]: SpeechRecognitionResult } };
}

export interface Word {
  word: string;
  correct: boolean;
  errors: number;
}

export interface Answer {
  questionId: string;
  userId: number;
  status: boolean;
}

export enum LessonType {
  AlphabetTraining = "alphabet-training",
  AlphabetActivity = "alphabet-activity",
  AlphabetTest = "alphabet-test",
}

export enum QuestionState {
  Ready = "ready",
  Waiting = "waiting",
  Listening = "listening",
}

export interface Question {
  id: string;
  value: string;
  answer: string;
  extras: any[];
}

export interface Lesson extends Item {
  moduleId: number;
  type: LessonType;
  instructions: string;
  questionIds: string[];
  questions?: Question[];
  completed?: boolean;
}

export interface Module extends Item {
  courseId: number;
}

export interface Course extends Item {}

export interface User {
  id: number;
  name: string;
  courseIds: number[];
  courses?: Course[];
}

export interface Item {
  id: number;
  name: string;
}

export interface CompletedLesson {
  lessonId: number;
  userId: number;
}
