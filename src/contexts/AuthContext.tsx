import { User, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, provider } from "../lib/firebase";
import { localStorage } from "../lib/local-storage";

export type AuthContextType = {
  user: User | null | undefined;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setUser(null);
    toast.info("Logged out");
    localStorage.remove("user");
  }, []);

  const login = useCallback(() => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login successful");
        localStorage.set("user", user);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login failed");
      });
  }, [navigate]);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        localStorage.set("user", user);
      } else {
        localStorage.remove("user");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
