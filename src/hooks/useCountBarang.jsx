import React, { useEffect } from "react";
import { supabase } from "../utils/SupaClient";

export default function useCountBarang() {
  const totalBarang = async () => {
    const { data } = await supabase
      .from("barang")
      .select("*", { count: "exact", head: true });

    console.log(data);
  };

  useEffect(() => {
    totalBarang();
  }, []);

  return { totalBarang };
}
