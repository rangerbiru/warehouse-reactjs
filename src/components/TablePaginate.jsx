import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { EyeIcon } from "./icons/EyeIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import useFormatRupiah from "../hooks/useFormatRupiah";
import useTruncateText from "../hooks/useTruncateText";
import { Link } from "react-router-dom";
import { supabase } from "../utils/SupaClient";
import Swal from "sweetalert2";
import { useAuth } from "../auth/AuthProvider";

const columns = [
  {
    key: "nama_barang",
    label: "Nama Barang",
  },
  {
    key: "harga",
    label: "Harga",
  },
  {
    key: "jenis_barang",
    label: "Jenis Barang",
  },
  {
    key: "stok",
    label: "Stok",
  },
  {
    key: "deskripsi",
    label: "Deskripsi",
  },
  {
    key: "action",
    label: "Action",
  },
];

export default function TablePaginate({ allBarang, search }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Handle Search
  const filteredBarang = useMemo(() => {
    return allBarang.filter(
      (barang) =>
        barang.nama_barang.toLowerCase().includes(search.toLowerCase()) ||
        barang.deskripsi.toLowerCase().includes(search.toLowerCase())
    );
  }, [allBarang, search]);

  const pages = Math.ceil(filteredBarang.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredBarang.slice(start, end);
  }, [page, filteredBarang]);

  const { formatRupiah } = useFormatRupiah();

  const { truncateText } = useTruncateText();

  // Hapus Barang
  const deleteBarangById = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Mengambil data gambar berdasarkan ID
          const { data: getImageById } = await supabase
            .from("barang")
            .select("foto_barang")
            .eq("id", id)
            .single();

          // Ini menghapus url image
          const removeUrlImage = String(getImageById.foto_barang).replace(
            "https://pxgyeyeyqjeewvltjcww.supabase.co/storage/v1/object/public/imageCatalog/foto_product/",
            ""
          );

          if (getImageById) {
            // Ini hapus dari bucket
            const { data: removeImage } = await supabase.storage
              .from("imageCatalog")
              .remove([`foto_product/${removeUrlImage}`]);

            if (removeImage) {
              // fungsi delete data table dari supabase
              const { data } = await supabase
                .from("barang")
                .delete()
                .eq("id", id)
                .select();

              if (data) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                }).then(() => window.location.reload());
              }
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { user, role } = useAuth();

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        {columns.map((col) => (
          <TableColumn key={col.key}>{col.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {columnKey === "action" ? (
                  <div className="relative flex items-center gap-3">
                    {user && role === "admin" ? (
                      <>
                        <Link to={`/detail/${item.id}`}>
                          <Tooltip content="Detail Barang">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <EyeIcon />
                            </span>
                          </Tooltip>
                        </Link>
                        <Link to={`/edit/${item.id}`}>
                          <Tooltip content="Ubah Barang">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <EditIcon />
                            </span>
                          </Tooltip>
                        </Link>
                        <Tooltip color="danger" content="Hapus Barang">
                          <span
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                            onClick={() => deleteBarangById(item.id)}
                          >
                            <DeleteIcon />
                          </span>
                        </Tooltip>
                      </>
                    ) : (
                      <Link to={`/detail/${item.id}`}>
                        <Button color="primary">Detail Barang</Button>
                      </Link>
                    )}
                  </div>
                ) : columnKey === "harga" ? (
                  formatRupiah(getKeyValue(item, columnKey))
                ) : columnKey === "jenis_barang" ? (
                  <span className="capitalize">
                    {getKeyValue(item, columnKey)}
                  </span>
                ) : columnKey === "deskripsi" ? (
                  truncateText(getKeyValue(item, columnKey), 30)
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
