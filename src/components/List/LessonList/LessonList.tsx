import { useFetch } from '../../../hooks/useFetch';
import { Lesson } from '../../Types';
import { Link } from 'react-router-dom';
import { CheckIcon, List, ListContainer, ListItem } from '../List.style';

const LessonList = ({moduleId} : {moduleId: string}) => {
  const { data, error, isLoading } = useFetch<Lesson[]>(`/api/modules/${moduleId}/lessons`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ListContainer>
      <List>
        {data?.map((lesson: Lesson) => (
          <Link to={`/lessons/${lesson.id}`} style={{ textDecoration: "none" }}><ListItem key={lesson.id}><CheckIcon completed={lesson.completed||false} />{lesson.name}</ListItem></Link>
        ))}
      </List>
    </ListContainer>
  );
};

export default LessonList;
