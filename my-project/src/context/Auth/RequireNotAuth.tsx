import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import UserPreferences from "../../pages/userPreferences";

export const RequireNotAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);

    if(auth.user) {
        return <UserPreferences/>
    }

    return children
}