"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function EditarClientePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [cliente, setCliente] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function carregarCliente() {
    const { data } = await supabase
      .from("clientes")
      .select("*")
      .eq("id", id)
      .single();

    setCliente(data);
    setLoading(false);
  }

  useEffect(() => {
    carregarCliente();
  }, []);

  async function salvar(e: any) {
    e.preventDefault();

    const { error } = await supabase
      .from("clientes")
      .update({
        nome: cliente.nome,
        empresa: cliente.empresa,
        cargo: cliente.cargo,
        data_aniversario: cliente.data_aniversario,
        status_negociacao: cliente.status_negociacao,
        observacoes: cliente.observacoes,
        interesses: cliente.interesses,
        obras_fechadas: cliente.obras_fechadas,
      })
      .eq("id", id);

    if (!error) {
      alert("Cliente atualizado com sucesso!");
      router.push(`/dashboard/clientes/${id}`);
    } else {
      alert("Erro ao atualizar cliente!");
    }
  }

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 50 }}>Carregando...</p>;
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1>Editar Cliente</h1>

      <form
        onSubmit={salvar}
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
          value={cliente.data_aniversario || ""}
          onChange={(e) =>
            setCliente({ ...cliente, data_aniversario: e.target.value })
          }
          style={input}
        />

        <select
          value={cliente.status_negociacao}
          onChange={(e) =>
            setCliente({ ...cliente, status_negociacao: e.target.value })
          }
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
          onChange={(e) =>
            setCliente({ ...cliente, obras_fechadas: Number(e.target.value) })
          }
          placeholder="Obras fechadas"
          style={input}
        />

        <textarea
          value={cliente.observacoes}
          onChange={(e) =>
            setCliente({ ...cliente, observacoes: e.target.value })
          }
          placeholder="Observações"
          rows={4}
          style={textarea}
        />

        <textarea
          value={cliente.interesses}
          onChange={(e) =>
            setCliente({ ...cliente, interesses: e.target.value })
          }
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
        >
          Salvar
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
