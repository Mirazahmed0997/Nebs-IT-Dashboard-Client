import { useState } from "react";
type FormDataType = {
    target: string;
    noticeTitle: string;
    employeeId: string;
    employeeName: string;
    position: string;
    noticeType: string;
    publishDate: string;
    noticeBody: string;
    attachments: File[];
};

export default function AddNotice() {
    const [formData, setFormData] = useState<FormDataType>({
        target: "Individual",
        noticeTitle: "",
        employeeId: "",
        employeeName: "",
        position: "",
        noticeType: "",
        publishDate: "",
        noticeBody: "",
        attachments: [],
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileUpload = (e: any) => {
        const files = Array.from<File>(e.target.files);
        setFormData({ ...formData, attachments: files });

    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
    };

    return (
        <div className="p-8 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Create a Notice</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Target */}
                <div className="p-4 border rounded-lg bg-gray-50">
                    <label className="font-medium text-gray-600 block">
                        Target Department(s) or Individual
                    </label>
                    <select
                        name="target"
                        value={formData.target}
                        onChange={handleChange}
                        className="mt-2 w-full p-2 border rounded-lg"
                    >
                        <option>Individual</option>
                        <option>HR</option>
                        <option>Finance</option>
                        <option>IT</option>
                    </select>
                </div>

                {/* Basic Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                        <label className="block font-medium text-gray-600">Notice Title</label>
                        <input
                            type="text"
                            name="noticeTitle"
                            value={formData.noticeTitle}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Write the Title of Notice"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-600">Select Employee ID</label>
                        <select
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">Select employee designation</option>
                            <option value="E-101">E-101</option>
                            <option value="E-102">E-102</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium text-gray-600">Employee Name</label>
                        <input
                            type="text"
                            name="employeeName"
                            value={formData.employeeName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter employee full name"
                        />
                    </div>
                </div>

                {/* Position + Notice Type + Publish Date */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                        <label className="block font-medium text-gray-600">Position</label>
                        <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Select employee department"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-600">Notice Type</label>
                        <select
                            name="noticeType"
                            value={formData.noticeType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">Select Notice Type</option>
                            <option value="General">General</option>
                            <option value="Warning">Warning</option>
                            <option value="Update">Update</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium text-gray-600">Publish Date</label>
                        <input
                            type="date"
                            name="publishDate"
                            value={formData.publishDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                </div>

                {/* Notice Body */}
                <div>
                    <label className="block font-medium text-gray-600">Notice Body</label>
                    <textarea
                        name="noticeBody"
                        rows={4}
                        value={formData.noticeBody}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Write the details about notice"
                    ></textarea>
                </div>

                {/* File Upload */}
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <p className="text-green-600 font-medium">
                        Upload profile image or drag and drop. Accepted File Type: jpg, png, pdf
                    </p>

                    <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="mt-3"
                    />

                    {/* File Preview */}
                    {formData.attachments.length > 0 && (
                        <div className="mt-3">
                            {formData.attachments.map((file, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg mt-2">
                                    <span className="text-gray-700">{file.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        className="px-6 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="px-6 py-2 bg-gray-200 rounded-lg"
                    >
                        Save as Draft
                    </button>

                    <button
                        type="submit"
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg"
                    >
                        Publish Notice
                    </button>
                </div>
            </form>
        </div>
    );
}
