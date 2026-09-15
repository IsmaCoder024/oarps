import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {

        try {

            const response = await api.get('/api/user');

            setUser(response.data);

        } catch (error) {

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