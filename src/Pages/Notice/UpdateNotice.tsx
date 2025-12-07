import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateNotice() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [notice, setNotice] = useState<any>(null);

    const [formData, setFormData] = useState({
        targetType: "",
        departmentIds: "",
        employeeId: "",
        title: "",
        noticeType: "",
        body: "",
        publishDate: "",
        attachments: [],
    });

    const fetchNotice = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/v1/Notice/${id}`);
            const json = await res.json();

            if (!res.ok) {
                setError(json.message || "Failed to load notice");
                return;
            }

            const data = json.data;

            setNotice(data);

            setFormData({
                targetType: data.targetType || "",
                departmentIds: data.departmentIds || "",
                employeeId: data.employeeId || "",
                title: data.title || "",
                noticeType: data.noticeType || "",
                body: data.body || "",
                publishDate: data.publishDate?.split("T")[0] || "",
                attachments: [],
            });
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to fetch notice");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotice();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e: any) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({ ...prev, attachments: files }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setUpdating(true);
        setError("");
        setSuccess("");

        try {
            const payload = new FormData();

            payload.append(
                "data",
                JSON.stringify({
                    targetType: formData.targetType,
                    departmentIds: formData.departmentIds,
                    employeeId: formData.employeeId,
                    title: formData.title,
                    noticeType: formData.noticeType,
                    body: formData.body,
                    publishDate: formData.publishDate,
                })
            );

            formData.attachments.forEach((file) =>
                payload.append("file", file)
            );

            const res = await fetch(
                `http://localhost:5000/api/v1/Notice/update/${id}`,
                { method: "PATCH", body: payload }
            );

            const result = await res.json();

            if (!res.ok) {
                setError(result.message || "Failed to update notice");
                setUpdating(false);
                return;
            }

            setSuccess("Notice updated successfully!");
        } catch (err) {
            setError("Error updating notice");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-lg">Loading...</div>;

    return (
        <div className="w-[1100px] mx-auto bg-white p-6 md:p-10 rounded-xl shadow mt-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
                ← Back
            </button>

            <h1 className="text-3xl font-bold text-gray-800 mb-6">Update Notice</h1>

            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{success}</div>
            )}

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-1 font-medium">Target Type</label>
                    <select
                        name="targetType"
                        value={formData.targetType}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    >
                        <option value="">Select Target</option>
                        <option value="DEPARTMENT">DEPARTMENT</option>
                        <option value="INDIVIDUAL">INDIVIDUAL</option>
                    </select>
                </div>

                {formData.targetType === "DEPARTMENT" && (
                    <div>
                        <label className="block mb-1 font-medium">Department ID</label>
                        <input
                            type="text"
                            name="departmentIds"
                            value={formData.departmentIds}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>
                )}

                {formData.targetType === "INDIVIDUAL" && (
                    <div>
                        <label className="block mb-1 font-medium">Employee ID</label>
                        <input
                            type="text"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>
                )}

                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Notice Type</label>
                    <input
                        type="text"
                        name="noticeType"
                        value={formData.noticeType}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Body</label>
                    <textarea
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        rows={5}
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Publish Date</label>
                    <input
                        type="date"
                        name="publishDate"
                        value={formData.publishDate}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Attachments</label>
                    <input type="file" multiple onChange={handleFileUpload} />

                    {formData.attachments.length > 0 && (
                        <ul className="mt-2 text-sm text-gray-700">
                            {formData.attachments.map((file, idx) => (
                                <li key={idx}>📎 {file.name}</li>
                            ))}
                        </ul>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={updating}
                    className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow"
                >
                    {updating ? "Updating..." : "Update Notice"}
                </button>
            </form>
        </div>
    );
}
