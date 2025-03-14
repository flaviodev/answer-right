import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import { useFetch } from '../../../hooks/useFetch';
import { User } from '../../Types';
import { List, ListContainer, ListItem, Title } from '../List.style';

const UserList = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useFetch<User[]>(`/api/users`);
  const { data: current, error: errorCurrent, isLoading: currentIsLoading, switchUser } = useCurrentUser();

  if (isLoading || currentIsLoading) return <p>Loading...</p>;
  if (error || errorCurrent) return <p>Error loading data</p>;

  const users = data?.filter(user => user.id !== current?.id) || [];

  const switich = (user: User) => { 
    switchUser(user);
    navigate('/');
  }

  return (
    <ListContainer>
      <Title>Trocar de usuário</Title>

      {users.length > 0 ? (
        <List>
          {users?.map((user: User) => (
            <ListItem onClick={() => switich(user)} key={user.id}>{user.name}</ListItem>
          ))}
        </List>
      ) : (
        <p>Nenhum usuário disponível</p>
      )}
    </ListContainer>
  );
};

export default UserList;
