import { useFetch } from '../../hooks/useFetch';
import { Lesson } from '../Types';
import { Link } from 'react-router-dom';
import { List, ListContainer, ListItem } from './LessonList.style';

const LessonListComponent = ({moduleId} : {moduleId: string}) => {
  const { data, error, isLoading } = useFetch<Lesson[]>(`/api/modules/${moduleId}/lessons`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ListContainer>
      <List>
        {data?.map((lesson: Lesson) => (
          <ListItem key={lesson.id}><Link to={`/lessons/${lesson.id}`} style={{ textDecoration: "none" }}>{lesson.name}</Link></ListItem>
        ))}
      </List>
    </ListContainer>
  );
};

export default LessonListComponent;
