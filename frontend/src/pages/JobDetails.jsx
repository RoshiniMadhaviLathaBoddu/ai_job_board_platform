import { useParams, useEffect, useState } from "react";
import API from "../services/api";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    API.get(`/jobs/${id}`).then(res => setJob(res.data)).catch(console.error);
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p>{job.description}</p>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Posted By:</strong> {job.createdBy?.name || 'N/A'}</p>
    </div>
  );
}
export default JobDetails;

