export default function Dashboard() {
    return (
      <div style={{ padding: 20 }}>
        <h1>Dashboard</h1>
        <p>Você está logado. 🎉</p> 
        <a className="block w-max mt-4 py-2.5 px-4 bg-blue-600 text-white rounded-md font-bold" href="/dashboard/clientes">Ver Clientes</a>
      </div>
    );
  }
  