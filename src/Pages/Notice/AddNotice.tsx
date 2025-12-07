
import NoticeSuccessModal from "@/components/ui/Notice.SuccessModal";
import { useState, useEffect } from "react";

type FormDataType = {
    targetType: "DEPARTMENT" | "INDIVIDUAL";
    departmentIds?: string;
    employeeId?: string;
    title: string;
    noticeType: string;
    body: string;
    publishDate: string;
    attachments: File[];
};

type Department = {
    _id: string;
    title: string;
};

export default function AddNotice() {
    const [formData, setFormData] = useState<FormDataType>({
        targetType: "DEPARTMENT",
        departmentIds: "",
        employeeId: "",
        title: "",
        noticeType: "",
        body: "",
        publishDate: "",
        attachments: [],
    });

    const [departments, setDepartments] = useState<Department[]>([]);
    const [employees, setEmployees] = useState<{ _id: string; name: string }[]>([]);
    const [successModal, setSuccessModal] = useState(false);


    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await fetch("https://nebs-it-dashboard-server.onrender.com/api/v1/Department");
                const data = await res.json();
                setDepartments(data.data || []);
            } catch (err) {
                console.error("Failed to fetch departments", err);
            }
        };

        console.log(departments)

        const fetchEmployees = async () => {
            try {
                const res = await fetch("https://nebs-it-dashboard-server.onrender.com/api/v1/Employee");
                const data = await res.json();
                setEmployees(data.data || []);
            } catch (err) {
                console.error("Failed to fetch employees", err);
            }
        };

        fetchDepartments();
        fetchEmployees();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setFormData({ ...formData, attachments: files });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload = new FormData();
            payload.append(
                "data",
                JSON.stringify({
                    targetType: formData.targetType,
                    departmentIds: formData.departmentIds || null,
                    employeeId: formData.employeeId || null,
                    title: formData.title,
                    noticeType: formData.noticeType,
                    body: formData.body,
                    publishDate: formData.publishDate,
                    status: "PUBLISHED",
                })
            );

            formData.attachments.forEach((file) => payload.append("file", file));

            const res = await fetch("https://nebs-it-dashboard-server.onrender.com/api/v1/Notice/create", {
                method: "POST",
                body: payload,
            });

            const result = await res.json();
            console.log("Notice created:", result);
            setSuccessModal(true);
            setFormData({
                targetType: "DEPARTMENT",
                departmentIds: "",
                employeeId: "",
                title: "",
                noticeType: "",
                body: "",
                publishDate: "",
                attachments: [],
            });
        } catch (err) {
            console.error("Error creating notice:", err);
        }
    };


 


    return (
        <div className="">
            <div className="w-[1000px] bg-white rounded-2xl p-6 md:p-10">

                <h2 className="text-3xl font-semibold mb-8 text-gray-800">
                    Create a Notice
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium mb-1 text-gray-700">Target</label>
                            <select
                                name="targetType"
                                value={formData.targetType}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                            >
                                <option value="DEPARTMENT">Department</option>
                                <option value="INDIVIDUAL">Individual</option>
                            </select>
                        </div>

                        {formData.targetType === "DEPARTMENT" && (
                            <div>
                                <label className="block font-medium mb-1 text-gray-700">
                                    Select Department
                                </label>
                                <select
                                    name="departmentIds"
                                    value={formData.departmentIds}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                                >
                                    <option value="">Select department</option>
                                    {departments?.data?.map((d: any) => (
                                        <option key={d._id} value={d._id}>
                                            {d.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {formData.targetType === "INDIVIDUAL" && (
                            <div>
                                <label className="block font-medium mb-1 text-gray-700">
                                    Select Employee
                                </label>
                                <select
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                                >
                                    <option value="">Select employee</option>
                                    {employees?.data?.map((e: any) => (
                                        <option key={e._id} value={e._id}>
                                            {e.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                            placeholder="Notice title"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-gray-700">Notice Type</label>
                        <input
                            type="text"
                            name="noticeType"
                            value={formData.noticeType}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                            placeholder="e.g., Holiday, HR, Warning"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-gray-700">Body</label>
                        <textarea
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                            placeholder="Write the notice details"
                            rows={5}
                        />
                    </div>

                    <div className="md:w-1/2">
                        <label className="block font-medium mb-1 text-gray-700">Publish Date</label>
                        <input
                            type="date"
                            name="publishDate"
                            value={formData.publishDate}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-gray-700">Attachments</label>

                        <div className="border rounded-lg p-3 bg-gray-50">
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="w-full"
                            />

                            {formData.attachments.length > 0 && (
                                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                    {formData.attachments.map((file, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            📄 {file.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-3 bg-orange-500 hover:bg-orange-600 
                       text-white rounded-lg font-medium transition shadow-md"
                        >
                            Publish Notice
                        </button>
                    </div>
                </form>
            </div>


            <NoticeSuccessModal
                isOpen={successModal}
                onClose={() => setSuccessModal(false)}
                onView={() => {
                    setSuccessModal(false);
                    window.location.href = "/notice"; // change to your page
                }}
                onCreateAnother={() => {
                    setSuccessModal(false);
                    setFormData({
                        targetType: "DEPARTMENT",
                        departmentIds: "",
                        employeeId: "",
                        title: "",
                        noticeType: "",
                        body: "",
                        publishDate: "",
                        attachments: [],
                    });
                }}
            />

        </div>
    );

}
