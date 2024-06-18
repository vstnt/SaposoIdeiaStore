import UserPreferences from "../pages/userPreferences";
import { useAuth } from "../hooks/useAuth";

export const RequireNotAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth()

    if(auth.user) {
        return <UserPreferences/>
    }
    return children  
}