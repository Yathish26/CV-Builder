import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    education: "",
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const previewRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => previewRef.current, // Ensure the ref is correctly passed
    documentTitle: "CV", // Optional: Set a title for the generated PDF
    onBeforeGetContent: () => {
      console.log("Preparing to print...");
    },
    onAfterPrint: () => {
      console.log("Printing completed!");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">CV Builder</h1>

      {!isPreviewMode ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Fill Your Details</h2>
          <form className="space-y-6">
            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "Enter your name" },
              { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
              { label: "Phone", name: "phone", type: "tel", placeholder: "Enter your phone number" },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block text-gray-700 font-medium mb-2">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                />
              </div>
            ))}
            {[
              { label: "Skills", name: "skills", placeholder: "List your skills" },
              { label: "Experience", name: "experience", placeholder: "Describe your experience" },
              { label: "Education", name: "education", placeholder: "Describe your education" },
            ].map(({ label, name, placeholder }) => (
              <div key={name}>
                <label className="block text-gray-700 font-medium mb-2">{label}</label>
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                />
              </div>
            ))}
          </form>
          <div className="text-center mt-6">
            <button
              onClick={() => setIsPreviewMode(true)}
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Preview Section */}
          <div
            className="bg-gray-50 shadow-lg rounded-lg p-6"
            ref={previewRef} // Ensure this ref is properly assigned
          >
            <h2 className="text-2xl font-bold text-gray-700 mb-4">CV Preview</h2>
            <p className="text-lg">
              <strong>Name:</strong> {formData.name || "Your Name"}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {formData.email || "Your Email"}
            </p>
            <p className="text-lg">
              <strong>Phone:</strong> {formData.phone || "Your Phone"}
            </p>
            <p className="text-lg">
              <strong>Skills:</strong> {formData.skills || "Your Skills"}
            </p>
            <p className="text-lg">
              <strong>Experience:</strong> {formData.experience || "Your Experience"}
            </p>
            <p className="text-lg">
              <strong>Education:</strong> {formData.education || "Your Education"}
            </p>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-green-500 text-white font-medium rounded-md shadow-md hover:bg-green-600"
            >
              Download as PDF
            </button>
            <button
              onClick={() => setIsPreviewMode(false)}
              className="ml-4 px-6 py-2 bg-gray-500 text-white font-medium rounded-md shadow-md hover:bg-gray-600"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
