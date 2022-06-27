import { useContext } from "react";
import { AuthContext } from "../contexts/AunthContext";

export function useAuth() {
    const value = useContext(AuthContext)

    return value
}