"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {
    const userString =
      localStorage.getItem("user");

    // No existe sesión
    if (!userString) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(userString);

    // Si es admin no debería estar aquí
    if (user.role === "admin") {
      router.push("/admin/users");
      return;
    }

    setUser(user);
    setAuthorized(true);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("user");

    router.push("/login");
  }

  if (!authorized) {
    return <p>Validando acceso...</p>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl rounded-lg border p-6 shadow">
        <h1 className="mb-6 text-3xl font-bold">
          Dashboard Usuario
        </h1>

        <div className="space-y-3">
          <p>
            <strong>Nombre:</strong>{" "}
            {user.nombre}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user.email}
          </p>

          <p>
            <strong>Rol:</strong>{" "}
            {user.role}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 rounded bg-red-500 px-4 py-2 text-white"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}