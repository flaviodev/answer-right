
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

export interface Question {
  id: string;
  value: string;
  answer: string;
  extras: any[];
}

export interface Lesson {
  id: string;
  name: string;
  moduleId: number;
  type: string;
  separatingPhonemes?: boolean;
  instructions: string;
  questionIds: string[];
  questions?: Question[];
  completed?: boolean;
}

export interface Module {
  id: number;
  name: string;
  courseId: number;
}

export interface Course {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  courseIds: number[];
  courses?: Course[];
}

export interface CompletedLesson {
  lessonId: number;
  userId: number;
}

export interface Item {
  id: string|number;
  name: string;
}