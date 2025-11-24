"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function ListaClientesPage() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarClientes() {
    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setClientes(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 50 }}>Carregando...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Clientes</h1>

      <table
        style={{
          width: "100%",
          marginTop: 20,
          borderCollapse: "collapse",
          background: "white",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
        <thead style={{ background: "#f0f0f0" }}>
          <tr>
            <th style={th}>Nome</th>
            <th style={th}>Empresa</th>
            <th style={th}>Cargo</th>
            <th style={th}>Status</th>
            <th style={th}>Obras Fechadas</th>
            <th style={th}></th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td style={td}>{c.nome}</td>
              <td style={td}>{c.empresa}</td>
              <td style={td}>{c.cargo}</td>
              <td style={td}>{c.status_negociacao}</td>
              <td style={td}>{c.obras_fechadas}</td>
              <td style={td}>
                <a
                  href={`/dashboard/clientes/${c.id}`}
                  style={{
                    padding: "6px 12px",
                    background: "#0070f3",
                    color: "white",
                    borderRadius: 6,
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  Ver detalhes
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: 12,
  borderBottom: "1px solid #ddd",
  textAlign: "left",
  fontWeight: "bold"
};

const td: React.CSSProperties = {
  padding: 12,
  borderBottom: "1px solid #eee"
};
