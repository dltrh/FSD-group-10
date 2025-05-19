import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseURL = import.meta.env.VITE_API_BASE_URL

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${baseURL}/user`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`Error ${res.status}: ${errorText}`);
                }

                const data = await res.json();
                setUser(data.user);
            } catch (error) {
                console.error("Auth check failed:", error.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};
