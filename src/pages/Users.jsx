import { useEffect, useState } from "react";

import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import UserModal from "../components/UserModal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [sort, setSort] =
    useState("asc");

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem("theme") ===
        "dark"
    );

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  useEffect(() => {
    let result = [...users];

    if (search) {
      result = result.filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          user.email
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    result.sort((a, b) =>
      sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    setFilteredUsers(result);
  }, [search, sort, users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok)
        throw new Error(
          "Failed to load users"
        );

      const data = await response.json();

      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b">
        <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-4 justify-between">
          <SearchBar
            onSearch={setSearch}
          />

          <div className="flex gap-3">
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="border rounded-lg px-3 py-2 text-black"
            >
              <option value="asc">
                Name A-Z
              </option>

              <option value="desc">
                Name Z-A
              </option>
            </select>

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="bg-black text-white px-4 rounded-lg"
            >
              {darkMode
                ? "☀ Light"
                : "🌙 Dark"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">
          User Management
        </h1>

        {loading && <Loader />}

        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          filteredUsers.length === 0 && (
            <EmptyState />
          )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(
            (user, index) => (
              <UserCard
                key={user.id}
                user={user}
                index={index}
                onClick={
                  setSelectedUser
                }
              />
            )
          )}
        </div>
      </div>

      <UserModal
        user={selectedUser}
        onClose={() =>
          setSelectedUser(null)
        }
      />
    </div>
  );
}