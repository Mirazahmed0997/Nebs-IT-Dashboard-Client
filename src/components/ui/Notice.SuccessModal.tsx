import React from "react";
import { CheckCircle } from "lucide-react";

export default function NoticeSuccessModal({
  isOpen,
  onClose,
  onView,
  onCreateAnother,
}: {
  isOpen: boolean;
  onClose: () => void;
  onView: () => void;
  onCreateAnother: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 text-center animate-fadeIn">

        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500" size={70} />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">
          Notice Published Successfully
        </h2>

       

        <div className="mt-8 flex flex-col md:flex-row justify-center gap-3">

          <button
            onClick={onView}
            className="px-6 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            View Notice
          </button>

          <button
            onClick={onCreateAnother}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            + Create Another
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
