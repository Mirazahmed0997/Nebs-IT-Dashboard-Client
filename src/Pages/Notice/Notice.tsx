import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function Notice() {
  const [activePage, setActivePage] = useState(1);

  const notices = [
    {
      title: "Office closed on Friday for maintenance.",
      type: "General / Company-W",
      department: "All Department",
      date: "15-Jun-2025",
      status: "Published",
    },
    {
      title: "Eid al-Fitr holiday schedule.",
      type: "Holiday & Event",
      department: "Finance",
      date: "15-Jun-2025",
      status: "Published",
    },
    {
      title: "Updated code of conduct policy",
      type: "HR & Policy Update",
      department: "Sales Team",
      date: "15-Jun-2025",
      status: "Published",
    },
    {
      title: "Payroll for October will be processed on 28th",
      type: "Finance & Payroll",
      department: "Web Team",
      date: "15-Jun-2025",
      status: "Published",
    },
    {
      title: "System update scheduled",
      type: "IT / System Maintenance",
      department: "Database Team",
      date: "15-Jun-2025",
      status: "Published",
    },
    {
      title: "Design team sprint review moved to Tuesday.",
      type: "Department / Team",
      department: "Admin",
      date: "15-Jun-2025",
      status: "Published",
    },
    {
      title: "Unauthorized absence recorded on 18 Oct",
      type: "Warning / Disciplinary",
      department: "Individual",
      date: "15-Jun-2025",
      status: "Unpublished",
    },
    {
      title: "Office closed today due to severe weather",
      type: "Emergency / Urgent",
      department: "HR",
      date: "15-Jun-2025",
      status: "Draft",
    },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <div className="flex flex-wrap gap-4 mb-6">
        <select className="p-2 border rounded-lg text-gray-600">
          <option>Departments or Individuals</option>
        </select>

        <select className="p-2 border rounded-lg text-gray-600">
          <option>Employee ID or Name</option>
        </select>

        <select className="p-2 border rounded-lg text-gray-600">
          <option>Status</option>
        </select>

        <input
          type="date"
          className="p-2 border rounded-lg text-gray-600"
        />

        <button className="ml-auto px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
          Reset Filters
        </button>
      </div>




      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-600 text-sm">
              <th className="p-4">Title</th>
              <th className="p-4">Notice Type</th>
              <th className="p-4">Departments/Individual</th>
              <th className="p-4">Published On</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {notices.map((row, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">{row.title}</td>
                <td className="p-4">{row.type}</td>
                <td className="p-4 text-blue-600 cursor-pointer hover:underline">
                  {row.department}
                </td>
                <td className="p-4">{row.date}</td>

                {/* Status Badge */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium `}
                  >
                    {row.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-4 flex items-center gap-3 text-gray-500">
                  <Eye className="w-5 h-5 cursor-pointer hover:text-gray-700" />
                  <Pencil className="w-5 h-5 cursor-pointer hover:text-gray-700" />
                  <Trash2 className="w-5 h-5 cursor-pointer hover:text-red-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      <div className="flex justify-center items-center gap-4 mt-6">
        <button className="px-3 py-1 text-gray-500 border rounded-lg">
          &lt;
        </button>

        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`px-3 py-1 rounded-lg ${
              activePage === page
                ? "bg-blue-600 text-white"
                : "border text-gray-600"
            }`}
          >
            {page}
          </button>
        ))}

        <button className="px-3 py-1 text-gray-500 border rounded-lg">
          &gt;
        </button>
      </div>
    </div>
  );
}
