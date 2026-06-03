export async function getUsers() {
  const response = await fetch("/api/users");

  const data = await response.json();

  return data.users;
}

export async function deleteUser(
  id: string
) {
  const response = await fetch(
    `/api/users/${id}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
}

export async function updateUser(
  id: string,
  userData: any
) {
  const response = await fetch(
    `/api/users/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return response.json();
}


export async function createUser(
  userData: any
) {
  const response = await fetch(
    "/api/users",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return response.json();
}