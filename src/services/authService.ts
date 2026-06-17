export async function login(email: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  // importante: forzar error si HTTP falla
  if (!response.ok) {
    return {
      success: false,
      message: data.message || "Error de autenticación",
    };
  }

  return data;
}