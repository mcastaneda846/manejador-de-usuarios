"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Input, Label, TextField, FieldError } from "@heroui/react";

import { login } from "@/services/authService";

export default function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;

    const password = formData.get("password") as string;

    try {
      const res = await login(email, password);

      if (!res.success) {
        setError(res.message || "Email o contraseña incorrectos");
        return;
      }

      // guardar sesión
      localStorage.setItem("user", JSON.stringify(res.user));

      // redirigir
      if (res.user.role === "admin") {
        router.push("/admin/users");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
          <p className="mt-2 text-sm text-gray-500">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {/* CAMBIO CLAVE: FORM NATIVO */}
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Ingrese un correo válido";
              }

              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="correo@ejemplo.com" />
            <FieldError />
          </TextField>

          <TextField isRequired name="password" type="password">
            <Label>Contraseña</Label>
            <Input placeholder="********" />
            <FieldError />
          </TextField>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button className="w-full" type="submit">
            Iniciar sesión
          </Button>
        </form>
      </div>
    </main>
  );
}
