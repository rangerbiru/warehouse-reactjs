import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TablePaginate from "../components/TablePaginate";
import { supabase } from "../utils/SupaClient";
import { Button, useDisclosure } from "@nextui-org/react";
import ModalAddBarang from "../components/nextui/ModalAddBarang";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const TableBarang = () => {
  const [allBarang, setAllBarang] = useState([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getAllBarang = async () => {
    try {
      const { data } = await supabase
        .from("barang")
        .select("*")
        .order("id", { ascending: false });
      setAllBarang(data);
    } catch (error) {
      console.log(error);
    }
  };

  const { user, role } = useAuth();

  useEffect(() => {
    getAllBarang();
    document.getElementById("title").innerHTML = "Table Barang";
  }, []);

  // Search
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <Layout>
      <section id="table-barang" className="p-8">
        <div className="flex justify-between mb-5">
          <h2 className="text-4xl font-bold">Table Barang</h2>

          {/* Jika user & admin maka bisa menambahkan barang */}
          {user && role === "admin" ? (
            <>
              <Button color="primary" onPress={onOpen}>
                + Tambah Barang
              </Button>
              <ModalAddBarang isOpen={isOpen} onOpenChange={onOpenChange} />
            </>
          ) : (
            // Jika bukan admin & user
            <Link to={"/login"}>
              <Button color="primary" onPress={onOpen}>
                Login Sebagai Admin
              </Button>
            </Link>
          )}
        </div>

        <div className="my-3">
          <SearchBar handleSearch={handleSearch} />
        </div>

        <TablePaginate
          allBarang={allBarang}
          user={user}
          role={role}
          search={search}
        />
      </section>
    </Layout>
  );
};

export default TableBarang;
