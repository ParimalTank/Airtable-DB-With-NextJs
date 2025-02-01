"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [records, setRecords] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const response = await fetch("/api/airtable");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch");
        }

        setRecords(result.data);
      } catch (err: unknown) {
        console.error("Error fetching records:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchRecords();
  }, []);

  return (
    <div>
      <h1>Jobs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <ul>
          {records.map((job) => (
            <li key={job.id}>{job.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
