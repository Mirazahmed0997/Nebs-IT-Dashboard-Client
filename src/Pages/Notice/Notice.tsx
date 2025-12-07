import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import router from "@/Routes/Index";
import { Link } from "react-router";

export default function Notice() {
    const [activePage, setActivePage] = useState(1);

    const [notices, setNotices] = useState([])

    const fetchNotices = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/v1/Notice")
            const data = await res.json()
            setNotices(data?.data || [])
        } catch (err) {
            console.log("Failed to fetch departments:", err)
        }
    }
    useEffect(() => {
        fetchNotices()
    }, [])


    const handleToggleStatus = async (id: string, currentStatus: string) => {
        const newStatus =
            currentStatus === "PUBLISHED" ? "UNPUBLISHED" : "PUBLISHED";

        try {
            const res = await fetch(`http://localhost:5000/api/v1/Notice/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json();

            if (data.success) {
                setNotices((prev: any) =>
                    prev.map((n: any) =>
                        n._id === id ? { ...n, status: newStatus } : n
                    )
                );
            }
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this notice?");
        if (!confirmed) return;

        try {
            const res = await fetch(`http://localhost:5000/api/v1/Notice/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };



    return (
        <div className="p-6 bg-white shadow">
            <div className="flex flex-wrap gap-4 mb-6  w-[1100px]">
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
                            <th className="p-4"></th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Notice Type</th>
                            <th className="p-4">Departments/Individual</th>
                            <th className="p-4">Published On</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {notices?.data?.map((row: any, i: any) => (
                            <tr
                                key={i}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="p-2">
                                    <img
                                        src={row.attachments}
                                        alt="notice"
                                        className="w-14 h-14 rounded-lg object-cover"
                                    />
                                </td>
                                <td className="p-4">{row.title}</td>
                                <td className="p-4">{row.noticeType}</td>
                                <td className="p-4 text-blue-600 cursor-pointer hover:underline">
                                    {row.targetType}
                                </td>
                                <td className="p-4">{row.publishDate}</td>

                                <td className="p-4">
                                    <button
                                        onClick={() => handleToggleStatus(row._id, row.status)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition 
                                                ${row.status === "PUBLISHED"
                                                ? "bg-green-100 text-green-700 border border-green-300"
                                                : "bg-red-100 text-red-700 border border-red-300"
                                            }`}
                                    >
                                        {row.status === "PUBLISHED" ? "Published" : "Unpublished"}
                                    </button>
                                </td>


                                <td className="p-4 flex items-center gap-3 text-gray-500">
                                    <Link to={`/NoticeDetails/${row._id}`}>
                                        <Eye className="w-5 h-5 cursor-pointer hover:text-gray-700" />
                                    </Link>
                                    <Link to={`/updateNotice/${row._id}`}>
                                        <Pencil className="w-5 h-5 cursor-pointer hover:text-gray-700" />
                                    </Link>                    
                                    <Trash2
                                        onClick={() => handleDelete(row._id)}
                                        className="w-5 h-5 cursor-pointer hover:text-red-600"
                                    />
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
                        className={`px-3 py-1 rounded-lg ${activePage === page
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
