export default function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="text-6xl">😕</div>
      <h2 className="text-xl font-semibold mt-4">
        No Users Found
      </h2>
      <p className="text-gray-500">
        Try a different search keyword.
      </p>
    </div>
  );
}