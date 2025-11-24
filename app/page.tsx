import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 font-sans dark:bg-black">
      <main className="flex max-w-4xl flex-col items-center gap-12 rounded-lg bg-white p-12 shadow-lg dark:bg-gray-900 sm:flex-row sm:gap-24">
        <div className="max-w-md text-center sm:text-left">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-black dark:text-zinc-50">
            Bem-vindo ao CRM Pre Moldados
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Organize e acompanhe seus clientes com facilidade.  
            Gerencie contatos, negociações e obras fechadas em um só lugar.
          </p>
          <a
            href="/login"
            className="inline-block rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Faça seu Login
          </a>
        </div>

      </main>
    </div>
  );
}
