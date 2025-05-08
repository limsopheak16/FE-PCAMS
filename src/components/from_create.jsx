import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";

const Fromadduser = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    khmerName: "",
    englishName: "",
    age: "",
    position: "coordinator", // default position
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
      position: "coordinator", // reset to default position
      national: "",
    });
  };

  const handleCancel = () => {
    setFormData({
      khmerName: "",
      englishName: "",
      age: "",
      position: "coordinator", // reset to default position
      national: "",
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen  flex justify-center items-start">
      <form
        onSubmit={handleCreate}
        className="bg-white p-16 rounded shadow-md w-full max-w-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <AiOutlineLeft className="text-xl" />
          <h2 className="text-2xl font-bold text-gray-700">Add New User</h2>
          <div style={{ width: 24 }} /> {/* Placeholder for spacing */}
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {[
            { label: "Khmer Name", name: "khmerName" },
            { label: "English Name", name: "englishName" },
            { label: "Age", name: "age", type: "number" },
            { label: "National", name: "national" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="block text-lg mb-1">{label}</label>
              <input
                type={type}
                name={name}
                placeholder={label}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded text-gray-600"
              />
            </div>
          ))}

          {/* Position Dropdown */}
          <div>
            <label className="block text-lg mb-1">Position</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded text-gray-600"
            >
              <option value="coordinator">Coordinator</option>
              <option value="monitor">Monitor</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-4">
          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
            >
              Create
            </button>
          </div>
          <div className="w-full">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-300 text-gray-700 py-3 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Fromadduser;
