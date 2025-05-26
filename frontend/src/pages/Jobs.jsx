import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
  API.get('/jobs').then(res => setJobs(res.data)).catch(err => console.error(err));
}, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
      {jobs.map((job) => (
        <div key={job._id} className="border p-4 mb-2 rounded">
          <h3 className="text-xl font-bold">{job.title}</h3>
          <p>{job.description}</p>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
        </div>
      ))}
    </div>
  );
}
export default Jobs;

