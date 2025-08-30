import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [base64String, setBase64String] = useState("");
  const navigate = useNavigate();

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setBase64String(base64);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-indigo-800 text-center mb-6">
            Upload File
          </h2>

          {/* File input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer 
                       file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                       file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 
                       hover:file:bg-indigo-200"
            />
          </div>

          {/* Preview */}
          {base64String && (
            <div className="mt-6 border border-gray-200 rounded-lg p-3 bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <img
                src={base64String}
                alt="preview"
                className="rounded-lg max-h-64 w-full object-contain mx-auto"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg 
                         hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;