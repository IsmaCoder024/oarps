import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {

        try {

            const token = localStorage.getItem('auth_token');

            // No token means the user is not authenticated
            if (!token) {
                setUser(null); 
                return;
            }

            const response = await api.get('/api/user');

            setUser(response.data);

        } catch (error) {

            // Token is invalid/expired
            localStorage.removeItem('auth_token');

            setUser(null);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                getUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
