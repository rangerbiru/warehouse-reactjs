import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { supabase } from "../../utils/SupaClient";
import { Link, useParams } from "react-router-dom";
import useFormatRupiah from "../../hooks/useFormatRupiah";
import { Divider, Spinner } from "@nextui-org/react";

const DetailBarang = () => {
  const [getBarangById, setGetBarangById] = useState({});

  const [loading, setLoading] = useState(true);

  const { formatRupiah } = useFormatRupiah();

  const { id } = useParams();

  const getIdBarang = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("barang")
        .select("*")
        .eq("id", id)
        .single();

      setGetBarangById(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIdBarang();
    document.getElementById("title").innerHTML = `Detail Barang`;
  }, []);

  return (
    <Layout>
      {loading ? (
        <Spinner className="m-auto" label="Tunggu Sebentar..." />
      ) : (
        <section className="py-16 px-40">
          <div className="flex gap-16">
            <img
              src={getBarangById.foto_barang}
              alt="Product"
              width={300}
              className="object-cover"
            />

            <div className="flex flex-col">
              <span className="text-sm text-gray-400 w-fit mb-1 capitalize">
                {getBarangById.jenis_barang}
              </span>

              <h2 className="text-4xl font-bold mb-2">
                {getBarangById.nama_barang}
              </h2>

              <h4 className="text-6xl font-bold mb-4">
                {formatRupiah(getBarangById.harga)}
              </h4>

              <div className="my-5">
                <h2 className="font-bold">Deskripsi Barang</h2>
                <Divider className="my-2" />
                <p>{getBarangById.deskripsi}</p>
              </div>

              <div className="mb-4">
                <h2 className="font-bold">Jumlah Barang</h2>
                <Divider className="my-2" />
                <span className="font-bold">{getBarangById.stok} Barang</span>
              </div>

              <Link
                to={"/table"}
                className="flex items-center gap-2 bg-cyan-800 text-white p-2 justify-center rounded-lg transition-all duration-300 hover:bg-cyan-950"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                  />
                </svg>{" "}
                Kembali
              </Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default DetailBarang;
