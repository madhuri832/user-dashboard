const colors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-green-500",
  "bg-orange-500",
];

export default function UserCard({ user, onClick, index }) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      onClick={() => onClick(user)}
      className="bg-white rounded-xl shadow-md p-5 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${colors[index % colors.length]}`}
        >
          {initials}
        </div>

        <div>
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.company.name}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-sm">📧 {user.email}</p>
        <p className="text-sm">📞 {user.phone}</p>
      </div>
    </div>
  );
}