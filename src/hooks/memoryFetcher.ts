import { Course, Lesson, LessonType, Module, Question, User } from "../components/Types";
import data from "../data/data.json"
import CompletedLessonService from "../services/CompletedLessonService";
import UserService from "../services/UserService";

export const memoryFetcher = (key: string): Promise<any> => {
  const users: User[] = data?.users || [];
  const courses: Course[] = data?.courses || [];
  const modules: Module[] = data?.modules || [];
  const lessons: Lesson[] = data?.lessons.map((lesson) => ({...lesson, type: lesson.type as LessonType})) || [];
  const questions: Question[] = data?.questions || [];

  const looggedUser = () => {
    let user = UserService.logged();

    if (!user) {
      user = users[0];
      UserService.login(user);
    }

    return {...user, courses: courses.filter((course) => user.courseIds.includes(course.id))};
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const getData: Record<string, any> = {
        '/api/users': users,
        '/api/users/logged': looggedUser(),

        '/api/courses': courses,
      };

      const matchGetCourses = key.match(/^\/api\/courses\/([\w-]+)$/);
      if (matchGetCourses) {
        const id = Number.parseInt(matchGetCourses[1]);
        const result = courses.find((course) => course.id === id);

        if (result) {
          resolve(result);
        } else {
          reject(new Error('Course not found'));
        }
        return;
      }

      const matchGetModules = key.match(/^\/api\/modules\/([\w-]+)$/);
      if (matchGetModules) {
        const id = Number.parseInt(matchGetModules[1]);
        const result = modules.find((module) => module.id === id);

        if (result) {
          resolve(result);
        } else {
          reject(new Error('Module not found'));
        }
        return;
      }

      const matchGetCourseModules = key.match(/^\/api\/courses\/([\w-]+)\/modules$/);
      if (matchGetCourseModules) {
        const id = Number.parseInt(matchGetCourseModules[1]);
        const result = modules.filter((module) => module.courseId === id);

        if (result) {
          resolve(result);
        } else {
          reject(new Error('Course not found'));
        }
        return;
      }

      const matchGetModuleLessons = key.match(/^\/api\/modules\/([\w-]+)\/lessons$/);
      if (matchGetModuleLessons) {
        const id = Number.parseInt(matchGetModuleLessons[1]);
        const result = lessons.filter((lesson) => lesson.moduleId === id);

        const loggedUser = looggedUser();
        const completedLessons = CompletedLessonService.completedLessons(loggedUser);

        if (result) {
          resolve(result.map((lesson) => ({...lesson, completed: completedLessons.includes(lesson.id)})));
        } else {
          reject(new Error('Module not found'));
        }
        return;
      }

      const matchGetLessons = key.match(/^\/api\/lessons\/([\w-]+)$/);
      if (matchGetLessons) {
        const id = Number.parseInt(matchGetLessons[1]);
        const result = lessons.find((lesson) => lesson.id === id);

        if (result) {
          const lessonQuestions = questions.filter((question) => result.questionIds.includes(question.id));

          resolve({...result, questions: lessonQuestions});
        } else {
          reject(new Error('Lesson not found'));
        }
        return;
      }

      let getResource = getData[key];

      if (getResource) {
          resolve(getResource);
      } else {
          reject(new Error('Resource not found'));
      }
    }, 200); 
  });
};
