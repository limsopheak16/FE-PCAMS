import React, { useState } from 'react';

export default function CreateChildForm() {
  const [formData, setFormData] = useState({
    familyId: '',
    khmerName: '',
    englishName: '',
    age: '',
    gender: '',
    camp: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle API call here
    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-semibold mb-6">Create New Children</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 border-2 border-purple-400 rounded-md">
        <label className="block mb-2">Family ID</label>
        <input
          type="text"
          name="familyId"
          placeholder="id"
          value={formData.familyId}
          onChange={handleChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />

        <label className="block mb-2">Khmer Name</label>
        <input
          type="text"
          name="khmerName"
          placeholder="English name"
          value={formData.khmerName}
          onChange={handleChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />

        <label className="block mb-2">English Name</label>
        <input
          type="text"
          name="englishName"
          placeholder="English name"
          value={formData.englishName}
          onChange={handleChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />

        <label className="block mb-2">Age</label>
        <input
          type="number"
          name="age"
          placeholder="age"
          value={formData.age}
          onChange={handleChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />

        <label className="block mb-2">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        >
          <option value="">gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label className="block mb-2">Camps</label>
        <select
          name="camp"
          value={formData.camp}
          onChange={handleChange}
          className="mb-6 w-full p-2 border border-gray-300 rounded"
        >
          <option value="">position</option>
          <option value="Camp A">Camp A</option>
          <option value="Camp B">Camp B</option>
        </select>

        <button type="submit" className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded mb-2">
          Create
        </button>
        <button type="button" className="w-full bg-gray-300 hover:bg-gray-400 text-black py-2 rounded">
          Cancel
        </button>
      </form>
    </div>
  );
}
