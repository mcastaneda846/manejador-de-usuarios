"use client";

import { useState } from "react";

type UserFormProps = {
  initialData?: {
    nombre: string;
    cc: string;
    email: string;
    password?: string;
    role: string;
  };

  title: string;

  onSubmit: (data: any) => Promise<void>;
};

export default function UserForm({
  initialData,
  title,
  onSubmit,
}: UserFormProps) {
  const [nombre, setNombre] = useState(initialData?.nombre || "");

  const [cc, setCc] = useState(initialData?.cc || "");

  const [email, setEmail] = useState(initialData?.email || "");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState(initialData?.role || "user");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: any = {
      nombre,
      cc,
      email,
      role,
    };

    // solo incluir password si tiene valor
    if (password.trim() !== "") {
      payload.password = password;
    }

    await onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 rounded-lg border p-4">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>

      <div className="mb-3">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="w-full rounded border p-2"
        />
      </div>

      <div className="mb-3">
        <input
          value={cc}
          onChange={(e) => setCc(e.target.value)}
          placeholder="CC"
          className="w-full rounded border p-2"
        />
      </div>

      <div className="mb-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded border p-2"
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded border p-2"
        />
      </div>

      <div className="mb-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="user">User</option>

          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Guardar
      </button>
    </form>
  );
}
