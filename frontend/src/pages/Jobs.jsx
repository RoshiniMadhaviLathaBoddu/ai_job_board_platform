import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
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

