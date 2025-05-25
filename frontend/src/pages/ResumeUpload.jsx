import { useState, useEffect } from "react";
import API from "../services/api";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    API.get('/resumes')
      .then((res) => setResumes(res.data))
      .catch(console.error);
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', file);
    try {
      await API.post('/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Resume uploaded successfully');
    } catch (err) {
      alert(err.response?.data?.error || 'Upload failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Upload Your Resume</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
      </form>
      <h3 className="text-xl font-bold mt-6">Your Resumes</h3>
      {resumes.map((r) => (
        <div key={r._id} className="border p-2 my-2">
          <p>File: {r.filePath}</p>
          <p>Extracted Data: {JSON.stringify(r.extractedData)}</p>
        </div>
      ))}
    </div>
  );
}
export default ResumeUpload;

