import { useFetch } from '../../hooks/useFetch';
import { Module } from '../Types';
import { Link } from 'react-router-dom';
import { List, ListContainer, ListItem } from './ModuleList.style';

const ModuleListComponent = ({courseId} : {courseId: string}) => {
  const { data, error, isLoading } = useFetch<Module[]>(`/api/courses/${courseId}/modules`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ListContainer>
      <List>
        {data?.map((module: Module) => (
          <ListItem key={module.id}><Link to={`/modules/${module.id}`} style={{ textDecoration: "none" }}>{module.name}</Link></ListItem>
        ))}
      </List>
    </ListContainer>
  );
};

export default ModuleListComponent;
