// import React, { useEffect, useState } from "react";
// import axios from "../../util/axiosInstance";
// import toast from "react-hot-toast";
// import { FiUpload, FiDownload, FiTrash2 } from "react-icons/fi";

// function DocumentManagement() {
//   const [documents, setDocuments] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [form, setForm] = useState({
//     employee: "",
//     kind: "",
//     title: "",
//     file: null,
//   });

//   // ✅ Fetch all documents
//   const fetchDocuments = async () => {
//     try {
//       const res = await axios.get("/api/documents");
//       setDocuments(res.data || []);
//     } catch (error) {
//       toast.error("Failed to fetch documents");
//     }
//   };

//   // ✅ Fetch employees for select dropdown
//   const fetchEmployees = async () => {
//     try {
//       const res = await axios.get("/api/users?role=Employee"); // adjust your API if needed
//       setEmployees(res.data.users || []);
//     } catch (error) {
//       toast.error("Failed to fetch employees");
//     }
//   };

//   useEffect(() => {
//     fetchDocuments();
//     fetchEmployees();
//   }, []);

//   // ✅ Handle form field changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "file") {
//       setForm({ ...form, file: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   // ✅ Handle upload document
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.file) return toast.error("Please select a file");

//     const data = new FormData();
//     data.append("employee", form.employee);
//     data.append("kind", form.kind);
//     data.append("title", form.title);
//     data.append("file", form.file);

//     try {
//       await axios.post("/api/documents/upload", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Document uploaded!");
//       setShowForm(false);
//       setForm({ employee: "", kind: "", title: "", file: null });
//       fetchDocuments();
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Upload failed");
//     }
//   };

//   // ✅ Download document
//   const handleDownload = (id) => {
//     window.open(`/api/documents/download/${id}`, "_blank");
//   };

//   // ✅ Delete document
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/documents/${id}`);
//       toast.success("Document deleted!");
//       fetchDocuments();
//     } catch (error) {
//       toast.error("Delete failed");
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-bold text-gray-800">Document Management</h2>
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
//         >
//           <FiUpload /> Upload Document
//         </button>
//       </div>

//       {/* Upload Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg relative">
//             <h3 className="text-lg font-semibold mb-4">Upload New Document</h3>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//               {/* Employee Select */}
//               <select
//                 name="employee"
//                 value={form.employee}
//                 onChange={handleChange}
//                 required
//                 className="border rounded-lg px-3 py-2"
//               >
//                 <option value="">Select Employee</option>
//                 {employees.map((emp) => (
//                   <option key={emp._id} value={emp._id}>
//                     {emp.firstName} {emp.lastName} ({emp.email})
//                   </option>
//                 ))}
//               </select>

//               {/* Kind */}
//               <input
//                 type="text"
//                 name="kind"
//                 placeholder="Kind (e.g., Resume, Certificate)"
//                 value={form.kind}
//                 onChange={handleChange}
//                 required
//                 className="border rounded-lg px-3 py-2"
//               />

//               {/* Title */}
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Document Title"
//                 value={form.title}
//                 onChange={handleChange}
//                 required
//                 className="border rounded-lg px-3 py-2"
//               />

//               {/* File */}
//               <input
//                 type="file"
//                 name="file"
//                 onChange={handleChange}
//                 required
//                 className="border rounded-lg px-3 py-2"
//               />

//               <div className="flex justify-end gap-3 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="px-4 py-2 border rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                 >
//                   Upload
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Documents Table */}
//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
//             <tr>
//               <th className="px-6 py-3">Title</th>
//               <th className="px-6 py-3">Kind</th>
//               <th className="px-6 py-3">Employee</th>
//               <th className="px-6 py-3">Uploaded By</th>
//               <th className="px-6 py-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {documents.length > 0 ? (
//               documents.map((doc) => (
//                 <tr key={doc._id}>
//                   <td className="px-6 py-4">{doc.title}</td>
//                   <td className="px-6 py-4">{doc.kind}</td>
//                   <td className="px-6 py-4">
//                     {doc.employee?.firstName} {doc.employee?.lastName}
//                   </td>
//                   <td className="px-6 py-4">
//                     {doc.uploadedBy?.firstName} {doc.uploadedBy?.lastName}
//                   </td>
//                   <td className="px-6 py-4 flex justify-center gap-3">
//                     <button
//                       onClick={() => handleDownload(doc._id)}
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       <FiDownload />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(doc._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <FiTrash2 />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="text-center text-gray-500 px-6 py-4"
//                 >
//                   No documents found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "../../util/axiosInstance";
import toast from "react-hot-toast";
import { FiUpload, FiDownload, FiTrash2, FiEye } from "react-icons/fi";
import Sidebar from "../sideBar";

function HRDocuments() {
  const [documents, setDocuments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [viewDoc, setViewDoc] = useState(null);
  const [form, setForm] = useState({
    employee: "",
    kind: "",
    title: "",
    file: null,
  });

  // ✅ Fetch all documents
  const fetchDocuments = async () => {
    try {
      const res = await axios.get("/api/documents");
      setDocuments(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch documents");
    }
  };

  // ✅ Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/api/Employee/");
      setEmployees(res.data.employees || []);
    } catch (error) {
      toast.error("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchDocuments();
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.file) return toast.error("Please select a file");

    const data = new FormData();
    data.append("employee", form.employee);
    data.append("kind", form.kind);
    data.append("title", form.title);
    data.append("file", form.file);

    try {
      await axios.post("/api/documents/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Document uploaded!");
      setShowForm(false);
      setForm({ employee: "", kind: "", title: "", file: null });
      fetchDocuments();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Upload failed");
    }
  };

  const handleDownload = async (id) => {
    try {
      const res = await axios.get(`/api/documents/download/${id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = res.headers["content-disposition"];
      let fileName = "document";
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match?.[1]) fileName = match[1];
      }
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Download failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/documents/${id}`);
      toast.success("Document deleted!");
      fetchDocuments();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full sm:w-64 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 mt-12 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Reports Management
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2 shadow-md text-sm sm:text-base"
          >
            <FiUpload /> Upload Report
          </button>
        </div>

        {/* Upload Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-3">
            <div className="bg-white p-4 sm:p-6 rounded-2xl w-full max-w-md shadow-xl">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Upload New Report
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <select
                  name="employee"
                  value={form.employee}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.firstName} {emp.lastName} ({emp.email})
                    </option>
                  ))}
                </select>

                <select
                  name="kind"
                  value={form.kind}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Kind</option>
                  <option value="CONTRACT">CONTRACT</option>
                  <option value="LETTER">LETTER</option>
                  <option value="PAYSLIP">PAYSLIP</option>
                  <option value="POLICY">POLICY</option>
                  <option value="OTHER">OTHER</option>
                </select>

                <input
                  type="text"
                  name="title"
                  placeholder="Document Title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-3 py-2"
                />

                <div className="flex justify-end gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-3 py-2 border rounded-lg hover:bg-gray-100 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 shadow-md text-sm"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Modal */}
        {viewDoc && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-3">
            <div className="bg-white p-4 sm:p-6 rounded-2xl w-full max-w-lg shadow-xl">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Report Details
              </h3>
              <div className="space-y-2 text-gray-700 text-sm sm:text-base">
                <p>
                  <strong>Title:</strong> {viewDoc.title}
                </p>
                <p>
                  <strong>Kind:</strong> {viewDoc.kind}
                </p>
                <p>
                  <strong>Employee:</strong> {viewDoc.employee?.firstName}{" "}
                  {viewDoc.employee?.lastName} ({viewDoc.employee?.email})
                </p>
                <p>
                  <strong>Uploaded By:</strong>{" "}
                  {viewDoc.uploadedBy?.firstName} {viewDoc.uploadedBy?.lastName}{" "}
                  ({viewDoc.uploadedBy?.email})
                </p>
                <p>
                  <strong>Uploaded On:</strong>{" "}
                  {new Date(viewDoc.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setViewDoc(null)}
                  className="px-3 py-2 border rounded-lg hover:bg-gray-100 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Documents Table */}
        <div className="bg-white shadow rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase">
                <tr>
                  <th className="px-4 sm:px-6 py-3">Title</th>
                  <th className="px-4 sm:px-6 py-3">Kind</th>
                  <th className="px-4 sm:px-6 py-3">Employee</th>
                  <th className="px-4 sm:px-6 py-3">Uploaded By</th>
                  <th className="px-4 sm:px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {documents.length > 0 ? (
                  documents.map((doc) => (
                    <tr key={doc._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 sm:px-6 py-3 truncate max-w-[120px] sm:max-w-[200px]">
                        {doc.title}
                      </td>
                      <td className="px-4 sm:px-6 py-3">{doc.kind}</td>
                      <td className="px-4 sm:px-6 py-3">
                        {doc.employee?.firstName} {doc.employee?.lastName}
                      </td>
                      <td className="px-4 sm:px-6 py-3">
                        {doc.uploadedBy?.firstName} {doc.uploadedBy?.lastName}
                      </td>
                      <td className="px-4 sm:px-6 py-3 flex justify-center gap-2 sm:gap-3">
                        <button
                          onClick={() => setViewDoc(doc)}
                          className="p-2 rounded-lg hover:bg-gray-100"
                        >
                          <FiEye className="text-gray-700" />
                        </button>
                        <button
                          onClick={() => handleDownload(doc._id)}
                          className="p-2 rounded-lg hover:bg-blue-100"
                        >
                          <FiDownload className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="p-2 rounded-lg hover:bg-red-100"
                        >
                          <FiTrash2 className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-gray-500 px-4 sm:px-6 py-6"
                    >
                      No Reports Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HRDocuments;

