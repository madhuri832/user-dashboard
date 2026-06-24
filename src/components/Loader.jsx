export default function Loader() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="bg-gray-200 h-40 rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
}