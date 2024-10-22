import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TableBarang from "./pages/TableBarang";
import DetailBarang from "./pages/barang/DetailBarang";
import UbahBarang from "./pages/barang/UbahBarang";
import Login from "./auth/Login";
import AuthAdmin from "./auth/AuthAdmin";
import { useAuth } from "./auth/AuthProvider";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Dashboard />} />
        <Route path="/table" element={<TableBarang />} />
        <Route path="/detail/:id" element={<DetailBarang />} />

        <Route element={<AuthAdmin />}>
          {/* Edit Barang */}
          <Route path="/edit/:id" element={<UbahBarang />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
