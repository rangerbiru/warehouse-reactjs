import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

export default function ModalAddBarang({ isOpen, onOpenChange }) {
  const [formData, setFormData] = useState({
    nama_barang: "",
    harga: "",
    jenis_barang: "",
    stok: "",
    deskripsi: "",
    foto_barang: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: uploadImage, error: uploadError } = await supabase.storage
        .from("imageCatalog")
        .upload(
          `foto_product/${formData.foto_barang.name}`,
          formData.foto_barang,
          {
            cacheControl: "3600",
            upsert: true,
          }
        );

      if (uploadError) {
        throw uploadError;
      }

      if (uploadImage) {
        const imageUrl = supabase.storage
          .from("imageCatalog")
          .getPublicUrl(`foto_product/${formData.foto_barang.name}`)
          .data.publicUrl;

        const updatedFormData = {
          ...formData,
          foto_barang: imageUrl,
        };

        const { data, error } = await supabase
          .from("barang")
          .insert(updatedFormData)
          .select();

        if (error) {
          throw error;
        }

        if (data) {
          Swal.fire({
            title: "Sukses Input",
            text: "Data berhasil di input ke database",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat mengupload gambar atau menyimpan data",
        icon: "error",
      });
    }
  };

  const jenisBarang = [
    {
      key: "makanan",
      value: "Makanan",
    },
    {
      key: "minuman",
      value: "Minuman",
    },
    {
      key: "atk",
      value: "Atk",
    },
  ];

  const handleImage = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Tambah Barang
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <label>
                  Nama Barang
                  <input
                    type="text"
                    name="nama_barang"
                    value={formData.nama_barang}
                    onChange={handleChange}
                    className="w-full rounded-md"
                  />
                </label>

                <label>
                  Harga
                  <input
                    type="number"
                    name="harga"
                    value={formData.harga}
                    onChange={handleChange}
                    className="w-full rounded-md"
                  />
                </label>

                <label>
                  Jenis Barang
                  <select
                    name="jenis_barang"
                    value={formData.jenis_barang}
                    onChange={handleChange}
                    className="w-full rounded-md"
                  >
                    {jenisBarang.map((item) => (
                      <option key={item.key} value={item.key}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Stok
                  <input
                    type="number"
                    name="stok"
                    onChange={handleChange}
                    className="w-full rounded-md"
                    value={formData.stok}
                  />
                </label>

                <label>
                  Deskripsi
                  <textarea
                    className="w-full rounded-md resize-none"
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                  ></textarea>
                </label>

                <label>
                  Gambar
                  <input
                    type="file"
                    name="foto_barang"
                    onChange={handleImage}
                    className="w-full border border-black p-2 rounded-md"
                  />
                </label>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Tambah Barang
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
