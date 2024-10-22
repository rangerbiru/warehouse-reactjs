import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <main className="flex w-full dark:bg-slate-900">
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div className="flex flex-col w-4/5 max-md:w-full">
        <Header handleSidebarToggle={handleSidebarToggle} />
        {children}
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
