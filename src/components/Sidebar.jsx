import { link } from "@nextui-org/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <aside
      className={`fixed md:relative z-10 bg-cyan-950 text-white h-screen w-1/5 max-md:w-3/4 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="h-20 shadow-lg flex justify-center items-center">
        <h2 className="flex items-center text-2xl font-bold gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4 6V4h16v2H4Zm0 14v-6H3v-2l1-5h16l1 5v2h-1v6h-2v-6h-4v6H4Zm2-2h6v-4H6v4Z"
            />
          </svg>{" "}
          Toko Naga Api
        </h2>
      </div>

      {/* Navigasi */}
      <nav className="flex justify-center pt-8">
        <ul className="flex flex-col gap-8">
          <li>
            <LinkSidebar link={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M13.545 2.1a.75.75 0 0 1 .274 1.025l-3.472 6.007a3 3 0 1 1-1.208-.908l1.759-3.042a6.5 6.5 0 0 0-2.148-.639V5a.75.75 0 1 1-1.5 0v-.457a6.5 6.5 0 0 0-1.829.49l.229.396a.75.75 0 1 1-1.3.75l-.228-.396a6.5 6.5 0 0 0-1.339 1.34l.396.227a.75.75 0 0 1-.75 1.3l-.396-.229a6.5 6.5 0 0 0-.498 1.905a.75.75 0 0 1-1.492-.155A8 8 0 0 1 11.65 3.88l.87-1.506a.75.75 0 0 1 1.025-.274Zm-.107 4.047a.75.75 0 0 1 1.047.169a8 8 0 0 1 1.51 4.963a.75.75 0 1 1-1.499-.052a6.5 6.5 0 0 0-1.227-4.033a.75.75 0 0 1 .17-1.047ZM9.5 11a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Z"
                  clip-rule="evenodd"
                />
              </svg>{" "}
              Dashboard
            </LinkSidebar>
          </li>

          <li>
            <LinkSidebar link={"/table"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 2048 2048"
              >
                <path
                  fill="currentColor"
                  d="M1024 1000v959l-64 32l-832-415V536l832-416l832 416v744h-128V680l-640 320zm-64-736L719 384l621 314l245-122l-625-312zm-64 1552v-816L256 680v816l640 320zM335 576l625 312l238-118l-622-314l-241 120zm1073 1216v-128h640v128h-640zm0-384h640v128h-640v-128zm-256 640v-128h128v128h-128zm0-512v-128h128v128h-128zm0 256v-128h128v128h-128zm-128 24h1h-1zm384 232v-128h640v128h-640z"
                />
              </svg>{" "}
              Tabel Barang
            </LinkSidebar>
          </li>

          <li>
            <LinkSidebar link={"/all-barang"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 2048 2048"
              >
                <path
                  fill="currentColor"
                  d="m1344 2l704 352v785l-128-64V497l-512 256v258l-128 64V753L768 497v227l-128-64V354L1344 2zm0 640l177-89l-463-265l-211 106l497 248zm315-157l182-91l-497-249l-149 75l464 265zm-507 654l-128 64v-1l-384 192v455l384-193v144l-448 224L0 1735v-676l576-288l576 288v80zm-640 710v-455l-384-192v454l384 193zm64-566l369-184l-369-185l-369 185l369 184zm576-1l448-224l448 224v527l-448 224l-448-224v-527zm384 576v-305l-256-128v305l256 128zm384-128v-305l-256 128v305l256-128zm-320-288l241-121l-241-120l-241 120l241 121z"
                />
              </svg>{" "}
              Semua Barang
            </LinkSidebar>
          </li>
        </ul>
      </nav>

      <div className="flex justify-center p-4 md:hidden">
        <button
          className="text-white text-5xl focus:outline-none"
          onClick={closeSidebar}
        >
          &times; {/* Simbol X */}
        </button>
      </div>
    </aside>
  );
};

const LinkSidebar = ({ link, children }) => {
  return (
    <Link
      to={link}
      className={`${
        location.pathname === `${link}` ? `text-cyan-400` : ``
      } flex items-center gap-2 text-xl`}
    >
      {children}
    </Link>
  );
};

export default Sidebar;
