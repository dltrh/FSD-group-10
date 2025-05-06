import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/user', {
          method: 'GET',
          credentials: 'include',
        });
        
        const data = await res.json();
        console.log('User data:', data);
        setUser(data);
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      }finally {
        setLoading(false); // done fetching
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
}
