import React from "react";
import DropdownUser from "./nextui/DropdownUser";
import { Theme } from "./Theme";
import { useAuth } from "../auth/AuthProvider";
import { Button } from "@nextui-org/react";

const Header = ({ handleSidebarToggle }) => {
  return (
    <header className="h-20 shadow-lg flex items-center px-8 dark:bg-blue-500">
      <button onClick={handleSidebarToggle} className="md:hidden mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <h2 className="text-2xl" id="title"></h2>

      <div className="ml-auto flex gap-5">
        <Theme />
        <DropdownUser />
      </div>
    </header>
  );
};

export default Header;
