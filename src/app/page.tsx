import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24">
        <div className="max-w-3xl text-center">
          <span className="rounded-full border border-zinc-200 bg-white px-4 py-1 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            Sistema de Gestión de Usuarios
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Administra usuarios y roles de forma simple
          </h1>

          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            Controla permisos, asigna roles y mantén la seguridad de tu
            plataforma desde un único lugar.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/login"
              className="rounded-xl bg-black px-6 py-3 text-white transition hover:opacity-90 dark:bg-white dark:text-black"
            >
              Comenzar
            </Link>

            <button className="rounded-xl border border-zinc-300 px-6 py-3 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">
              Más información
            </button>
          </div>
        </div>

        <div className="mt-20 grid w-full gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <h3 className="text-lg font-semibold">Gestión de Usuarios</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Crea, edita y administra usuarios de manera centralizada.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <h3 className="text-lg font-semibold">Control de Roles</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Define permisos específicos para cada tipo de usuario.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <h3 className="text-lg font-semibold">Seguridad</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Mantén el acceso protegido con una estructura clara de permisos.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}