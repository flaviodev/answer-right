import { useFetch } from '../../../hooks/useFetch';
import { Module } from '../../Types';
import { Link } from 'react-router-dom';
import { List, ListContainer, ListItem } from '../List.style';

const ModuleList = ({courseId} : {courseId: string}) => {
  const { data, error, isLoading } = useFetch<Module[]>(`/api/courses/${courseId}/modules`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ListContainer>
      <List>
        {data?.map((module: Module) => (
          <Link to={`/modules/${module.id}`} style={{ textDecoration: "none" }}><ListItem key={module.id}>{module.name}</ListItem></Link>
        ))}
      </List>
    </ListContainer>
  );
};

export default ModuleList;
