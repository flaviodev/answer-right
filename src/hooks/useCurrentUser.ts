import { User } from '../components/Types';
import { useFetch } from './useFetch';
import UserService from '../services/UserService';

export function useCurrentUser() {
  const { data, error, mutate } = useFetch<User>("/api/users/logged");

  const switchUser = (user: User) => {
    UserService.login(user);
    mutate();
  };

  return {
    data,
    error,
    isLoading: !data && !error,
    switchUser,
  };
}
