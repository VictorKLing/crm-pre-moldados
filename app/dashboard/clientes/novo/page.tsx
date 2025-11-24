"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function NovoClientePage() {
  const router = useRouter();

  const [cliente, setCliente] = useState({
    nome: "",
    empresa: "",
    cargo: "",
    data_aniversario: "",
    status_negociacao: "Contato inicial",
    obras_fechadas: 0,
    observacoes: "",
    interesses: "",
  });

  const [loading, setLoading] = useState(false);

  async function adicionarCliente(e: any) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("clientes").insert([cliente]);

    setLoading(false);

    if (!error) {
      alert("Cliente adicionado com sucesso!");
      router.push("/dashboard/clientes");
    } else {
      alert("Erro ao adicionar cliente!");
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1>Novo Cliente</h1>

      <form
        onSubmit={adicionarCliente}
        style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}
      >
        <input
          type="text"
          value={cliente.nome}
          onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
          placeholder="Nome"
          required
          style={input}
        />

        <input
          type="text"
          value={cliente.empresa}
          onChange={(e) => setCliente({ ...cliente, empresa: e.target.value })}
          placeholder="Empresa"
          style={input}
        />

        <input
          type="text"
          value={cliente.cargo}
          onChange={(e) => setCliente({ ...cliente, cargo: e.target.value })}
          placeholder="Cargo"
          style={input}
        />

        <input
          type="date"
          value={cliente.data_aniversario}
          onChange={(e) => setCliente({ ...cliente, data_aniversario: e.target.value })}
          style={input}
        />

        <select
          value={cliente.status_negociacao}
          onChange={(e) => setCliente({ ...cliente, status_negociacao: e.target.value })}
          style={input}
        >
          <option>Contato inicial</option>
          <option>Em negociação</option>
          <option>Visita marcada</option>
          <option>Proposta enviada</option>
          <option>Fechado</option>
          <option>Perdido</option>
        </select>

        <input
          type="number"
          value={cliente.obras_fechadas}
          onChange={(e) => setCliente({ ...cliente, obras_fechadas: Number(e.target.value) })}
          placeholder="Obras fechadas"
          style={input}
        />

        <textarea
          value={cliente.observacoes}
          onChange={(e) => setCliente({ ...cliente, observacoes: e.target.value })}
          placeholder="Observações"
          rows={4}
          style={textarea}
        />

        <textarea
          value={cliente.interesses}
          onChange={(e) => setCliente({ ...cliente, interesses: e.target.value })}
          placeholder="Interesses"
          rows={4}
          style={textarea}
        />

        <button
          type="submit"
          style={{
            padding: 12,
            background: "#0070f3",
            color: "white",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Adicionar Cliente"}
        </button>
      </form>
    </div>
  );
}

const input: React.CSSProperties = {
  padding: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const textarea: React.CSSProperties = {
  padding: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
};
