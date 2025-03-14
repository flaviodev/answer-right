import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { User } from "../Types";
import { BottomBarContainer, UserContainer } from "./BottomBar.style";

const BottomBar = () => {
    const { data, error, isLoading } = useFetch<User>(`/api/users/logged`);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    return (
      <BottomBarContainer>
        <UserContainer>
          {data ? (
            <div><Link to={`/users`} style={{ textDecoration: "none" }}>{data.name}</Link></div>
          ) : (
            <div>Not Logged In</div>
          )}
        </UserContainer>
      </BottomBarContainer>
    );
  };
  
  export default BottomBar;