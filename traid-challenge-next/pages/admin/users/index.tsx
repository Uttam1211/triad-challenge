import { useState } from "react";
import { AdminLayout } from "../../../components/layouts/AdminLayout";

// Define types
type User = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "User";
  status: "Active" | "Inactive";
};

const UserManagement = () => {
  // Mock user data
  const users: User[] = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User", status: "Active" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", role: "User", status: "Inactive" },
    { id: 4, name: "Bob Brown", email: "bob.brown@example.com", role: "Admin", status: "Active" },
    { id: 5, name: "Charlie Davis", email: "charlie.davis@example.com", role: "User", status: "Inactive" },
    { id: 6, name: "Eve White", email: "eve.white@example.com", role: "User", status: "Active" },
    { id: 7, name: "Frank Wilson", email: "frank.wilson@example.com", role: "Admin", status: "Active" },
    { id: 8, name: "Grace Lee", email: "grace.lee@example.com", role: "User", status: "Inactive" },
    { id: 9, name: "Henry Harris", email: "henry.harris@example.com", role: "User", status: "Active" },
    { id: 10, name: "Ivy Clark", email: "ivy.clark@example.com", role: "Admin", status: "Inactive" },
  ];

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<"All" | "Admin" | "User">("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");

  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 5;

  // Filtered and searched users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Total pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle edit user
  const handleEditUser = (userId: number) => {
    alert(`Edit user with ID: ${userId}`);
  };

  // Handle delete user
  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      alert(`Delete user with ID: ${userId}`);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-[#005EB8]">
          User Management
        </h1>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border-2 rounded-md focus:border-[#005EB8] focus:outline-none"
            />
          </div>

          <div className="flex space-x-4">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as "All" | "Admin" | "User")}
              className="p-2 border-2 rounded-md focus:border-[#005EB8] focus:outline-none"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "All" | "Active" | "Inactive")}
              className="p-2 border-2 rounded-md focus:border-[#005EB8] focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#005EB8] text-white">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.role}</td>
                  <td className="p-4">{user.status}</td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleEditUser(user.id)}
                      className="bg-[#005EB8] text-white px-4 py-2 rounded-md hover:bg-[#004B9C] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-[#005EB8] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;