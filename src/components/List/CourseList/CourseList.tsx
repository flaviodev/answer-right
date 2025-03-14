import { useFetch } from '../../../hooks/useFetch';
import { Course, User } from '../../Types';
import { Link } from 'react-router-dom';
import { List, ListContainer, ListItem } from '../List.style';

const CourseList = () => {
  const { data, error, isLoading } = useFetch<User>(`/api/users/logged`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ListContainer>
      <List>
        {data?.courses?.map((course: Course) => (
          <Link to={`/courses/${course.id}`} style={{ textDecoration: "none" }}><ListItem key={course.id}>{course.name}</ListItem></Link>
        ))}
      </List>
    </ListContainer>
  );
};

export default CourseList;
