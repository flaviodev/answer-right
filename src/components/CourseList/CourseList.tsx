import { useFetch } from '../../hooks/useFetch';
import { Course, User } from '../Types';
import { Link } from 'react-router-dom';
import { List, ListContainer, ListItem } from './CourseList.style';

const CourseList = () => {
  const { data, error, isLoading } = useFetch<User>(`/api/users/logged`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ListContainer>
      <List>
        {data?.courses?.map((course: Course) => (
          <ListItem key={course.id}><Link to={`/courses/${course.id}`} style={{ textDecoration: "none" }}>{course.name}</Link></ListItem>
        ))}
      </List>
    </ListContainer>
  );
};

export default CourseList;
