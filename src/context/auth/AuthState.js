import AuthContext from "./authContext";
import { useState } from "react";

const AuthState = (props) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const login = async (email, password) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const json = await response.json();

            if (json.success) {
                localStorage.setItem('token', json.authToken);
                setIsAuthenticated(true);
                return { success: true, authToken: json.authToken };
            } else {
                return { success: false, error: json.error };
            }
        } catch (error) {
            return { success: false, error: "Something went wrong. Please try again." };
        }
    };

    const signup = async (name, email, password) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/userjoin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();

            if (json.success) {
                localStorage.setItem('token', json.authToken);
                setIsAuthenticated(true);
                return { success: true, authToken: json.authToken };
            } else {
                return { success: false, error: json.error };
            }
        } catch (error) {
            return { success: false, error: "Something went wrong. Please try again." };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    const getUser = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setUser(json);
            return json;
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, getUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;