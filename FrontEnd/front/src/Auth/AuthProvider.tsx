import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    user: any | null;
    accessToken: string | null;
    refreshToken?: string | null;
    login: (user: any, accessToken: string, refreshToken?: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const token = localStorage.getItem("accessToken");
        const savedRefreshToken = localStorage.getItem("refreshToken");

        if (savedUser && token) {
            setUser(JSON.parse(savedUser));
            setAccessToken(token);
            setRefreshToken(savedRefreshToken);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (user: any, accessToken: string, refreshToken?: string) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
            setRefreshToken(refreshToken);
        }
        setAccessToken(accessToken);
        setUser(user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    return context;
};
