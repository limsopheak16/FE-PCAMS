// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// import addUserAccount from "../api/addUserAccount";
// import SidebarMenu from "../components/sidebar";

// const CreateUserPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     role_id: "",
//     khmer_name: "",
//     english_name: "",
//     password: "",
//     date_of_birth: "",
//     nationality: "",
//     position: "",
//     email: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await addUserAccount(formData, navigate);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <SidebarMenu />
//       <div className="flex-1 md:ml-[272px]">
//         <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
//           <h1 className="text-2xl font-bold text-gray-900">Create New User</h1>
//           <button
//             onClick={() => navigate("/users")}
//             className="text-[#4F7CFF] hover:text-[#3B65E6] transition"
//             aria-label="Back to staff list"
//           >
//             Back to Staff List
//           </button>
//         </header>
//         <main className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
//           <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="role_id" className="block text-sm font-medium text-gray-700">
//                   Role ID
//                 </label>
//                 <input
//                   type="text"
//                   name="role_id"
//                   id="role_id"
//                   value={formData.role_id}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4F7CFF] focus:ring-[#4F7CFF]"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="khmer_name" className="block text-sm font-medium text-gray-700">
//                   Khmer Name
//                 </label>
//                 <input
//                   type="text"
//                   name="khmer_name"
//                   id="khmer_name"
//                   value={formData.khmer_name}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4F7CFF] focus:ring-[#4F7CFF]"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="english_name" className="block text-sm font-medium text-gray-700">
//                   English Name
//                 </label>
//                 <input
//                   type="text"
//                   name="english_name"
//                   id="english_name"
//                   value={formData.english_name}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4F7CFF] focus:ring-[#4F7CFF]"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4F7CFF] focus:ring-[#4F7CFF]"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4F7CFF] focus:ring-[#4F7CFF]"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
//                   Date of Birth
//                 </label>
//                 <input
//                   type="date"
//                   name="date_of_birth"
//                   id="date_of_birth"
//                   value={formData.date_of_birth}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4F7CFF] focus:ring-[#4F7CFF]"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="position" className="block text-sm font-medium text-gray-700">
//                   Position
//                 </label>
//                 <input
//                   type="text"
//                   name="position"
//                   id="position"
//                   value={formData.position}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4F7CFF] focus:ring-[#4F7CFF]"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
//                   Nationality
//                 </label>
//                 <input
//                   type="text"
//                   name="nationality"
//                   id="nationality"
//                   value={formData.nationality}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4F7CFF] focus:ring-[#4F7CFF]"
//                   required
//                 />
//               </div>
//               <div>
//                 <button
//                   type="submit"
//                   className="w-full bg-[#4F7CFF] text-white px-4 py-2 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md"
//                 >
//                   Create User
//                 </button>
//               </div>
//             </form>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CreateUserPage;