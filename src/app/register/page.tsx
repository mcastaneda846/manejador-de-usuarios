"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Button,
  Input,
  Label,
  TextField,
  FieldError,
} from "@heroui/react";

export default function RegisterPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Error al registrar el usuario");
        return;
      }

      router.push("/login");
    } catch {
      setError("Error al registrar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Crear Cuenta</h1>
          <p className="mt-2 text-sm text-gray-500">
            Completa la información para registrarte
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField isRequired name="name">
            <Label>Nombre completo</Label>
            <Input placeholder="Juan Pérez" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Ingrese un correo válido";
              }

              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="correo@ejemplo.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "La contraseña debe tener al menos 6 caracteres";
              }

              return null;
            }}
          >
            <Label>Contraseña</Label>
            <Input placeholder="********" />
            <FieldError />
          </TextField>

          <TextField isRequired name="confirmPassword" type="password">
            <Label>Confirmar contraseña</Label>
            <Input placeholder="********" />
            <FieldError />
          </TextField>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full" isDisabled={loading}>
            {loading ? "Registrando..." : "Crear cuenta"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-500">
              ¿Ya tienes una cuenta?{" "}
            </span>
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}