import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { supabase } from "../utils/SupaClient";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Input cara ke-2
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        alert("Login Gagal!");
      } else if (data) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex h-screen justify-center items-center">
      <div className="card">
        <form
          className="flex flex-col gap-3 p-3 border rounded-lg border-black"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-center">Login Page</h2>

          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md"
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md"
            />
          </label>

          <Button color="primary" type="submit">
            Login Now
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
