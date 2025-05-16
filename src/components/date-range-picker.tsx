// "use client"

// import React from "react"

// import { useState } from "react"
// import { Calendar, ChevronDown } from "lucide-react"

// interface DateRangePickerProps {
//   initialDateRange?: string
//   onDateRangeChange?: (dateRange: string) => void
// }

// const DateRangePicker: React.FC<DateRangePickerProps> = ({
//   initialDateRange = "05 May, 2025 — 06 May, 2025",
//   onDateRangeChange,
// }) => {
//   const [dateRange, setDateRange] = useState(initialDateRange)
//   const [isOpen, setIsOpen] = useState(false)

//   // This is a simplified version. In a real app, you'd implement a proper date picker
//   const predefinedRanges = ["05 May, 2025 — 06 May, 2025", "07 May, 2025 — 08 May, 2025", "09 May, 2025 — 10 May, 2025"]

//   const handleSelectRange = (range: string) => {
//     setDateRange(range)
//     if (onDateRangeChange) {
//       onDateRangeChange(range)
//     }
//     setIsOpen(false)
//   }

//   return (
//     <div className="relative">
//       <button
//         className="flex items-center gap-2 border bg-white px-4 py-2 rounded-md text-gray-700"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <Calendar size={20} />
//         <span>{dateRange}</span>
//         <ChevronDown size={16} />
//       </button>

//       {isOpen && (
//         <div className="absolute z-10 mt-1 w-64 bg-white border rounded-md shadow-lg">
//           {predefinedRanges.map((range) => (
//             <div
//               key={range}
//               className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
//               onClick={() => handleSelectRange(range)}
//             >
//               {range}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default DateRangePicker
