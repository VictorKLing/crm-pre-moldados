"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();
    setErro("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("Email ou senha incorretos");
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f5f5"
    }}>
      <form 
        onSubmit={handleLogin}
        style={{
          width: 300,
          padding: 20,
          background: "white",
          borderRadius: 10,
          boxShadow: "0 0 10px #ddd",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: 10,
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
          required
          style={{
            padding: 10,
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />

        {erro && (
          <p style={{ color: "red", fontSize: 14, textAlign: "center" }}>{erro}</p>
        )}

        <button
          type="submit"
          style={{
            padding: 10,
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
