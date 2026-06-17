"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import UserCard from "@/components/UserCard";
import UserForm from "@/components/UserForm";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/userService";

export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (!userString) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(userString);

    if (user.role !== "admin") {
      router.push("/dashboard");
      return;
    }

    setAuthorized(true);
    loadUsers();
  }, [router]);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  }

  async function handleCreate(data: any) {
    try {
      await createUser(data);
      await loadUsers();
    } catch (error) {
      console.error("Error creando usuario:", error);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "¿Está seguro de eliminar este usuario?"
    );

    if (!confirmed) return;

    try {
      await deleteUser(id);
      await loadUsers();
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  }

  function handleEdit(id: string) {
    const user = users.find((u) => u._id === id);
    setEditingUser(user);
  }

  async function handleUpdate(data: any) {
    if (!editingUser) return;

    try {
      await updateUser(editingUser._id, data);

      setEditingUser(null);
      await loadUsers();
    } catch (error) {
      console.error("Error actualizando usuario:", error);
    }
  }

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Validando acceso...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Administración de Usuarios
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <UserForm
        title="Crear Usuario"
        onSubmit={async (data) => {
          await handleCreate(data);
        }}
      />

      {editingUser && (
        <UserForm
          title="Editar Usuario"
          initialData={editingUser}
          onSubmit={async (data) => {
            await handleUpdate(data);
          }}
        />
      )}

      {users.length === 0 ? (
        <p>No hay usuarios registrados. ¡Crea el primero!</p>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <UserCard
              key={user._id}
              id={user._id}
              nombre={user.nombre}
              cc={user.cc}  //Opcional
              email={user.email}
              role={user.role}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}