import { useFetch } from '../../hooks/useFetch';
import { Module } from '../Types';
import { Link } from 'react-router-dom';

const ModuleListComponent = ({courseId} : {courseId: string}) => {
  const { data, error, isLoading } = useFetch<Module[]>(`/api/courses/${courseId}/modules`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ul>
      {data?.map((module: Module) => (
        <li key={module.id}><Link to={`/modules/${module.id}`}>{module.name}</Link></li>
      ))}
    </ul>
  );
};

export default ModuleListComponent;
