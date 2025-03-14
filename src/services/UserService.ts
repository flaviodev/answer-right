import { User } from "../components/Types";


const UserService = {
    logged(){
        let user = localStorage.getItem("logged");

        if (user) {
            try {
            return JSON.parse(user) as User;
            } catch (error) {
            return null;
            }
        } else { 
            return null;
        }
    },

    login(user: User){
        localStorage.setItem("logged", JSON.stringify(user));
    },
}

export default UserService;