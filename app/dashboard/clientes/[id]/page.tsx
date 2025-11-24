"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function ClienteDetalhesPage() {
  const params = useParams();
  const id = params.id as string;

  const [cliente, setCliente] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function carregarCliente() {
    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {
      setCliente(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    carregarCliente();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 50 }}>Carregando...</p>;
  }

  if (!cliente) {
    return <p style={{ textAlign: "center", marginTop: 50 }}>Cliente não encontrado.</p>;
  }

  function formatarData(data: string) {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  // Cores do status
  const statusColors: Record<string, string> = {
    "Contato inicial": "#6b7280",
    "Em negociação": "#f59e0b",
    "Visita marcada": "#0ea5e9",
    "Proposta enviada": "#3b82f6",
    "Fechado": "#10b981",
    "Perdido": "#ef4444",
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <a
        href="/dashboard/clientes"
        style={{
          display: "inline-block",
          marginBottom: 20,
          fontSize: 14,
          color: "#0070f3",
          textDecoration: "none",
        }}
      >
        ← Voltar
      </a>

      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ marginBottom: 10 }}>{cliente.nome}</h1>
        <p style={{ marginBottom: 6 }}>
          <strong>Empresa:</strong> {cliente.empresa}
        </p>
        <p style={{ marginBottom: 6 }}>
          <strong>Cargo:</strong> {cliente.cargo}
        </p>
        <p style={{ marginBottom: 6 }}>
          <strong>Aniversário:</strong>{" "}
          {cliente.data_aniversario
            ? formatarData(cliente.data_aniversario)
            : "—"}
        </p>

        <p style={{ marginBottom: 6 }}>
          <strong>Status:</strong>{" "}
          <span
            style={{
              padding: "4px 10px",
              background: statusColors[cliente.status_negociacao] || "#ddd",
              color: "white",
              borderRadius: 6,
              fontSize: 13,
            }}
          >
            {cliente.status_negociacao}
          </span>
        </p>

        <p style={{ marginBottom: 6 }}>
          <strong>Obras fechadas:</strong> {cliente.obras_fechadas}
        </p>

        <div style={{ marginTop: 15 }}>
          <strong>Observações:</strong>
          <p
            style={{
              background: "#f9f9f9",
              padding: 10,
              borderRadius: 8,
              marginTop: 4,
              whiteSpace: "pre-wrap",
            }}
          >
            {cliente.observacoes || "Nenhuma observação registrada."}
          </p>
        </div>

        <div style={{ marginTop: 15 }}>
          <strong>Interesses:</strong>
          <p
            style={{
              background: "#f9f9f9",
              padding: 10,
              borderRadius: 8,
              marginTop: 4,
              whiteSpace: "pre-wrap",
            }}
          >
            {cliente.interesses || "Nenhum interesse informado."}
          </p>
        </div>
        <div style={{ marginTop: 30, display: "flex", gap: 10 }}>
            <a
                href={`/dashboard/clientes/${cliente.id}/editar`}
                style={{
                padding: "10px 16px",
                background: "#0070f3",
                color: "white",
                borderRadius: 6,
                textDecoration: "none",
                fontWeight: "bold",
                }}
            >
                Editar
            </a>

            <button
                onClick={async () => {
                if (!confirm("Tem certeza que deseja excluir este cliente?")) return;

                const { error } = await supabase
                    .from("clientes")
                    .delete()
                    .eq("id", cliente.id);

                if (!error) {
                    alert("Cliente excluído com sucesso!");
                    window.location.href = "/dashboard/clientes";
                } else {
                    alert("Erro ao excluir cliente!");
                }
                }}
                style={{
                padding: "10px 16px",
                background: "#ef4444",
                color: "white",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                }}
            >
                Excluir
            </button>
            </div>
      </div>
    </div>
  );
}
