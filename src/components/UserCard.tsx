type UserCardProps = {
  id: string;
  nombre: string;
  cc: string;
  email: string;
  role: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function UserCard({
  id,
  nombre,
  cc,
  email,
  role,
  onEdit,
  onDelete,
}: UserCardProps) {
  return (
    <div
      className={`rounded-lg p-4 shadow-md ${
        role === "admin"
          ? "bg-blue-100"
          : "bg-gray-100"
      }`}
    >
      <h2 className="text-lg font-bold">
        {nombre}
      </h2>

      <p>
        <strong>CC:</strong> {cc}
      </p>

      <p>
        <strong>Email:</strong> {email}
      </p>

      <p>
        <strong>Rol:</strong> {role}
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(id)}
          className="rounded bg-yellow-500 px-3 py-1 text-white"
        >
          ✏️ Editar
        </button>

        <button
          onClick={() => onDelete(id)}
          className="rounded bg-red-500 px-3 py-1 text-white"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}