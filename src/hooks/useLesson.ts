import { Lesson } from '../components/Types';
import { useFetch } from './useFetch';
import UserService from '../services/UserService';
import CompletedLessonService from '../services/CompletedLessonService';

export function useLesson(lessonId: string) {
  const { data, error, mutate } = useFetch<Lesson>(`/api/lessons/${lessonId}`);

  const completeLesson = (lesson: Lesson) => {
    const loggedUser = UserService.logged();

    if (loggedUser) {
      CompletedLessonService.completeLesson(loggedUser, lesson.id);
    }
    mutate();
  };

  return {
    data,
    error,
    isLoading: !data && !error,
    completeLesson,
  };
}
