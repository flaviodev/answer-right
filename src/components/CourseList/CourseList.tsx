import { useFetch } from '../../hooks/useFetch';
import { Course, User } from '../Types';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const { data, error, isLoading } = useFetch<User>(`/api/users/logged`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ul>
      {data?.courses?.map((course: Course) => (
        <li key={course.id}><Link to={`/courses/${course.id}`}>{course.name}</Link></li>
      ))}
    </ul>
  );
};

export default CourseList;
