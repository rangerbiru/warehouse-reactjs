import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Button,
} from "@nextui-org/react";
import { useAuth } from "../../auth/AuthProvider";
import { Theme } from "../Theme";
import { supabase } from "../../utils/SupaClient";
import { Link, useNavigate } from "react-router-dom";

export default function DropdownUser() {
  const { username, email } = useAuth();

  const [theme, setTheme] = useState(() => {
    const initialTheme = localStorage.getItem("theme");
    return initialTheme ? initialTheme : "light";
  });

  const getThemeFromLocalStorage = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    getThemeFromLocalStorage();
  }, [theme]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Anda gagal logout");
    } else {
      alert("Anda berhasil Logout");
      // navigate("/");
      window.location.reload();
    }
  };

  const { user, role } = useAuth();

  return (
    <div className="flex items-center gap-4">
      {user && role === "admin" ? (
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
              className="transition-transform"
              description={email}
              name={username}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">@tonyreichert</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Link to={"/login"}>
          <Button color="default">Login</Button>
        </Link>
      )}
    </div>
  );
}
