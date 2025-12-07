import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NoticeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [notice, setNotice] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchNotice = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/v1/Notice/${id}`);
            const data = await res.json();
            setNotice(data?.data || null);
        } catch (err) {
            console.error("Failed to fetch notice:", err);
        } finally {
            setLoading(false);
        }
    };
console.log(notice?.data?.employeeId?.name)
    useEffect(() => {
        fetchNotice();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] text-lg font-medium">
                Loading notice details...
            </div>
        );
    }

    if (!notice) {
        return (
            <div className="p-6 text-center text-red-500">
                Notice not found.
            </div>
        );
    }

    return (
        <div className="p-4 md:p-10">
            <div className="w-[1000px] mx-auto bg-white shadow-lg rounded-xl p-6 md:p-10">

                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                    ← Back
                </button>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {notice?.data?.title}
                </h1>

                <div className="grid md:grid-cols-2 gap-4 mb-8 text-gray-700">
                    <p>
                        <strong>Status:</strong>
                        <span
                            className={`ml-2 px-3 py-1 text-sm rounded-lg ${notice?.status === "PUBLISHED"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                        >
                            {notice?.data?.status}
                        </span>
                    </p>

                    <p>
                        <strong>Target:</strong> {notice?.data?.targetType}
                    </p>

                    <p>
                        <strong>Notice Type:</strong> {notice?.data?.noticeType}
                    </p>

                    <p>
                        <strong>Publish Date:</strong>{" "}
                        {new Date(notice?.data?.publishDate).toLocaleDateString()}
                    </p>

                    <p className="md:col-span-2">
                        <strong>Created At:</strong>{" "}
                        {new Date(notice?.data?.createdAt).toLocaleString()}
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">
                        Notice Body
                    </h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {notice?.data?.body}
                    </p>
                </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-3 text-gray-900">
                            Attachments
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                            <img
                                src={notice?.data?.attachments}
                                alt="Attachment"
                                className="w-full h-28 object-cover rounded-lg shadow"
                            />
                        </div>
                    </div>
            

                {notice?.data?.targetType === "DEPARTMENT" && notice?.data?.departmentIds?.title && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900">
                             Department
                        </h2>
                        <p className="text-gray-700">{notice?.data?.departmentIds?.title}</p>
                    </div>
                )}

                {notice?.data?.targetType === "INDIVIDUAL" && notice?.data?.employeeId?.name && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900">
                            Employee Name
                        </h2>
                        <p className="text-gray-700">
                            {notice?.data?.employeeId?.name} ({notice?.data?.employeeId?.name})
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoticeDetails;
