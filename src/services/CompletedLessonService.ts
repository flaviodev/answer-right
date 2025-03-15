import { User } from "../components/Types";

const CompletedLessonService = {
    completedLessons(user: User){
        let completedLessons = localStorage.getItem(`completedLessons-${user.id}`);

        if (completedLessons) {
            try {
                return JSON.parse(completedLessons) as string[];
            } catch (error) {
                return [];
            }
        } else {
            return [];
        }
    },

    completeLesson(user: User, lessonId: string){
        let completedLessons = this.completedLessons(user);
        completedLessons.push(lessonId);
        localStorage.setItem(`completedLessons-${user.id}`, JSON.stringify(completedLessons));
    }
}

export default CompletedLessonService;