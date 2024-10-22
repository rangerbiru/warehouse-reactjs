import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// function login
const login = (email, password) => {
  supabase.auth.signInWithPassword({ email, password });
};

// function logout
const logout = () => supabase.auth.signOut();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;

      setUser(currentUser ?? null);
      setAuth(currentUser ? true : false);

      if (currentUser) {
        getDataUser(currentUser.id);
      } else {
        console.log("Data User Tidak Tersedia");
        setLoading(false);
      }
    };

    getUser();

    const getDataUser = async (userId) => {
      try {
        const { data: userData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId);

        setUsername(userData[0].username);
        setRole(userData[0].role);
        setEmail(userData[0].email);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, user, role, username, auth, loading, email }}
    >
      {loading ? <h2>Loading...</h2> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
