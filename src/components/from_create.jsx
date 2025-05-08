import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Fromadduser = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    khmerName: "",
    englishName: "",
    age: "",
    position: "",
    national: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      ...formData,
    };
    setUsers([...users, newUser]);
    setFormData({
      khmerName: "",
      englishName: "",
      age: "",
      position: "",
      national: "",
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Form */}
      <form
        onSubmit={handleCreate}
        className="bg-white p-6 rounded shadow-md mb-6 max-w-2xl mx-auto"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700 flex items-center gap-2">
          <FaPlus /> Create New User
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="khmerName"
            placeholder="Khmer Name"
            value={formData.khmerName}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="englishName"
            placeholder="English Name"
            value={formData.englishName}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="national"
            placeholder="National"
            value={formData.national}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </form>
     
    </div>
  );
};

export default Fromadduser;
