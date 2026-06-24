import { useEffect } from "react";

const colors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-green-500",
  "bg-orange-500",
];

export default function UserModal({ user, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () =>
      document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const color = colors[user.id % colors.length];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 animate-fadeIn max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            User Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <div
            className={`w-16 h-16 rounded-full text-white flex items-center justify-center text-xl font-bold ${color}`}
          >
            {initials}
          </div>

          <div>
            <h3 className="text-xl font-bold">
              {user.name}
            </h3>
            <p className="text-gray-500">
              {user.company.name}
            </p>
          </div>
        </div>

        <hr className="my-5" />

        <div className="space-y-4">
          <p>
            📧{" "}
            <a
              href={`mailto:${user.email}`}
              className="text-blue-600"
            >
              {user.email}
            </a>
          </p>

          <p>
            📞{" "}
            <a
              href={`tel:${user.phone}`}
              className="text-blue-600"
            >
              {user.phone}
            </a>
          </p>

          <p>
            🏢 {user.company.name}
          </p>

          <p className="italic text-gray-600">
            "{user.company.catchPhrase}"
          </p>

          <p>
            🌐{" "}
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >
              {user.website}
            </a>
          </p>

          <div>
            <h4 className="font-semibold">
              📍 Address
            </h4>

            <p>{user.address.street}</p>
            <p>{user.address.suite}</p>
            <p>{user.address.city}</p>
            <p>{user.address.zipcode}</p>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(
                user.email
              );
              alert("Email copied!");
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Copy Email
          </button>
        </div>
      </div>
    </div>
  );
}