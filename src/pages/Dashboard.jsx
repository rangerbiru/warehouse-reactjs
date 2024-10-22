import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient";
import LoadingSkeleton from "../components/nextui/LoadingSkeleton";
import Layout from "../components/Layout";

const Dashboard = () => {
  const [barang, setBarang] = useState(0);
  const [jenisBarangCount, setJenisBarangCount] = useState({});

  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  const totalBarang = async () => {
    setLoadingSkeleton(true);

    try {
      // get total count barang
      const countTotalBarang = supabase
        .from("barang")
        .select("*", { count: "exact", head: true });

      //get count per jenis_barang
      const jenisBarang = ["makanan", "minuman"];

      const countTotalJenisBarang = jenisBarang.map((jenis) =>
        supabase
          .from("barang")
          .select("*", { count: "exact", head: true })
          .eq("jenis_barang", jenis)
      );

      const results = await Promise.all([
        countTotalBarang,
        ...countTotalJenisBarang,
      ]);

      const totalCount = results[0].count;
      let counts = {};
      results.slice(1).forEach((hasil, index) => {
        counts[jenisBarang[index]] = hasil.count;
      });

      setBarang(totalCount);
      setJenisBarangCount(counts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSkeleton(false);
    }
  };

  useEffect(() => {
    totalBarang();

    document.getElementById("title").innerHTML = "Dashboard";
  }, []);

  return (
    <Layout>
      <section id="dashboard" className="p-10 max-md:p-2">
        <div className="bg-cyan-800 text-white rounded-lg h-48 p-10">
          <h2 className="text-4xl font-semibold">
            Selamat Datang {import.meta.env.VITE_NAMA_USER}
          </h2>
          <p className="text-lg mt-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-2 w-full max-md:grid-cols-1">
          {loadingSkeleton ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : (
            <>
              {/* Total Barang */}
              <div className="p-8 bg-green-600 text-white h-44 rounded-lg">
                <h2 className="text-2xl font-bold">Total Keseluruhan Barang</h2>
                <p className="text-5xl font-bold mt-2">{barang} Barang</p>
              </div>
              {/* Total Makanan */}
              <div className="p-8 bg-blue-600 text-white h-44 rounded-lg">
                <h2 className="text-2xl font-bold">Total Makanan</h2>
                <p className="text-5xl font-bold mt-2">
                  {jenisBarangCount.makanan} Barang
                </p>
              </div>
              {/* Total Minuman */}
              <div className="p-8 bg-pink-600 text-white h-44 rounded-lg">
                <h2 className="text-2xl font-bold">Total Minuman</h2>
                <p className="text-5xl font-bold mt-2">
                  {jenisBarangCount.minuman} Barang
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
