import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { Button, Spinner } from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

const UbahBarang = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formEdit, setFormEdit] = useState({
    nama_barang: "",
    harga: 0,
    jenis_barang: "",
    stok: 0,
    deskripsi: "",
    foto_barang: "",
  });

  // Untuk menampung data gambar
  const [imagePreview, setImagePreview] = useState([]);

  //   Membuat Loading
  const [loading, setLoading] = useState(true);

  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  //   get barang by id
  const getBarangById = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("barang")
        .select("*")
        .eq("id", id)
        .single();

      setFormEdit(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //   edit barang
  const updateBarangById = async (e) => {
    e.preventDefault();

    // Membuat loading pada button ubah data
    setLoadingBtn(true);

    try {
      if (imagePreview.length === 0) {
        const { data: updateData } = await supabase
          .from("barang")
          .update(formEdit)
          .eq("id", id)
          .select();

        if (updateData) {
          alert("Berhasil diupdate");
          navigate("/table");
        } else {
          alert("Gagal update product");
        }
      } else {
        const removeUrlImage = formEdit.foto_barang.replace(
          "https://pxgyeyeyqjeewvltjcww.supabase.co/storage/v1/object/public/imageCatalog/foto_product/",
          ""
        );

        const { data: deleteImage } = await supabase.storage
          .from("imageCatalog")
          .remove([`foto_product/${removeUrlImage}`]);

        if (deleteImage) {
          const { data: uploadImage } = await supabase.storage
            .from("imageCatalog")
            .upload(`foto_product/${imagePreview.name}`, imagePreview, {
              cacheControl: 3600,
              upsert: true,
            });

          if (uploadImage) {
            const { data } = await supabase
              .from("barang")
              .update({
                ...formEdit,
                foto_barang: `https://pxgyeyeyqjeewvltjcww.supabase.co/storage/v1/object/public/imageCatalog/foto_product/${imagePreview.name}`,
              })
              .eq("id", id)
              .select("*");

            if (data) {
              alert("Data dan gambar berhasil dirubah");
              navigate("/table");
            } else {
              alert("Gambar gagal dirubah");
            }
          }
        } else {
          alert("Gagal hapus gambar");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBtn(false);
    }
  };

  const handleImage = (e) => {
    setImagePreview(e.target.files[0]);

    console.log(e.target.files[0]);
  };

  useEffect(() => {
    getBarangById();
    document.getElementById("title").innerHTML = "Halaman Edit Barang";
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner label="Tunggu sebentar" />
        </div>
      ) : (
        <section id="halaman-edit" className="px-20 py-12">
          <form className="flex flex-col gap-4" onSubmit={updateBarangById}>
            <label>
              Nama Barang
              <input
                type="text"
                name="nama_barang"
                className="form-input rounded-lg w-full mt-1"
                value={formEdit.nama_barang}
                onChange={handleChange}
              />
            </label>

            <label>
              Harga
              <input
                type="number"
                name="harga"
                className="form-input rounded-lg w-full mt-1"
                value={formEdit.harga}
                onChange={handleChange}
              />
            </label>

            <label>
              Jenis Barang
              <select
                name="jenis_barang"
                className="form-select rounded-lg w-full mt-1"
                value={formEdit.jenis_barang}
                onChange={handleChange}
              >
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
                <option value="atk">Atk</option>
              </select>
            </label>

            <label>
              Stok
              <input
                type="number"
                className="form-input rounded-lg w-full mt-1"
                value={formEdit.stok}
                onChange={handleChange}
                name="stok"
              />
            </label>

            <label>
              Deskripsi
              <textarea
                className="form-textarea rounded-lg w-full mt-1"
                onChange={handleChange}
                name="deskripsi"
                value={formEdit.deskripsi}
              >
                {formEdit.deskripsi}
              </textarea>
            </label>

            <label>
              Gambar Barang
              <input
                type="file"
                className="form-input rounded-lg w-full mt-1"
                onChange={handleImage}
                name="foto_barang"
              />
            </label>

            <img
              src={formEdit.foto_barang}
              alt={formEdit.nama_barang}
              className="size-8"
            />

            <div className="flex gap-2">
              <Button onClick={() => navigate("/table")} color="danger">
                Kembali
              </Button>

              {loadingBtn ? (
                <Button color="primary" disabled>
                  Loading...
                </Button>
              ) : (
                <Button type="submit" color="primary">
                  Ubah Data
                </Button>
              )}
            </div>
          </form>
        </section>
      )}
    </Layout>
  );
};

export default UbahBarang;
