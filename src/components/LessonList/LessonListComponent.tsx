import { useFetch } from '../../hooks/useFetch';
import { Lesson } from '../Types';
import { Link } from 'react-router-dom';

const LessonListComponent = ({moduleId} : {moduleId: string}) => {
  const { data, error, isLoading } = useFetch<Lesson[]>(`/api/modules/${moduleId}/lessons`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ul>
      {data?.map((lesson: Lesson) => (
        <li key={lesson.id}><Link to={`/lessons/${lesson.id}`}>{lesson.name}</Link> {lesson.completed ? ' (Completed)' : ''}</li>
      ))}
    </ul>
  );
};

export default LessonListComponent;
