import { Course, Lesson, LessonType, Module, Question, User } from "../components/Types";
import data from "../data/data.json"

export const memoryFetcher = (url: string): Promise<any> => {

    const users: User[] = data?.users || [];
    const courses: Course[] = data?.courses || [];
    const modules: Module[] = data?.modules || [];
    const lessons: Lesson[] = data?.lessons.map((lesson) => ({...lesson, type: lesson.type as LessonType})) || [];
    const questions: Question[] = data?.questions || [];

    const loggedUserId = () => {
      return 1;
    }

    const loggedUser = () => {
      const user = users.find((user) => user.id === loggedUserId());

      if (user) {
        return {...user, courses: courses.filter((course) => user.courseIds.includes(course.id))};
      } else {
        return null;
      }
    }; 

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockData: Record<string, any> = {
          '/api/users': users,
          '/api/users/logged': loggedUser(),

          '/api/courses': courses,
        };

        const matchCourses = url.match(/^\/api\/courses\/([\w-]+)$/);
        if (matchCourses) {
          const id = Number.parseInt(matchCourses[1]);
          const result = courses.find((course) => course.id === id);
  
          if (result) {
            resolve(result);
          } else {
            reject(new Error('Course not found'));
          }
          return;
        }

        const matchModules = url.match(/^\/api\/modules\/([\w-]+)$/);
        if (matchModules) {
          const id = Number.parseInt(matchModules[1]);
          const result = modules.find((module) => module.id === id);
  
          if (result) {
            resolve(result);
          } else {
            reject(new Error('Module not found'));
          }
          return;
        }

        const matchCourseModules = url.match(/^\/api\/courses\/([\w-]+)\/modules$/);
        if (matchCourseModules) {
          const id = Number.parseInt(matchCourseModules[1]);
          const result = modules.filter((module) => module.courseId === id);
  
          if (result) {
            resolve(result);
          } else {
            reject(new Error('Course not found'));
          }
          return;
        }

        const matchModuleLessons = url.match(/^\/api\/modules\/([\w-]+)\/lessons$/);
        if (matchModuleLessons) {
          const id = Number.parseInt(matchModuleLessons[1]);
          const result = lessons.filter((lesson) => lesson.moduleId === id);
  
          if (result) {
            resolve(result);
          } else {
            reject(new Error('Module not found'));
          }
          return;
        }

        const matchLessons = url.match(/^\/api\/lessons\/([\w-]+)$/);
        if (matchLessons) {
          const id = Number.parseInt(matchLessons[1]);
          const result = lessons.find((lesson) => lesson.id === id);
  
          if (result) {
            const lessonQuestions = questions.filter((question) => result.questionIds.includes(question.id));

            resolve({...result, questions: lessonQuestions});
          } else {
            reject(new Error('Lesson not found'));
          }
          return;
        }

        let resource = mockData[url];

        if (resource) {
            resolve(resource);
        } else {
            reject(new Error('Resource not found'));
        }
      }, 200); 
    });
  };
  