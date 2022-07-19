import { useSelector } from "react-redux";

export default function useAuth(){
    const reduxUser = useSelector(state => state);
    const user = JSON.parse(JSON.stringify(reduxUser));
    return user && user.auth.user.isLoggedIn;
};
  