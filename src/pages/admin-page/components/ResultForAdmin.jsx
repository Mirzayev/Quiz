import React, { useState, useEffect } from "react";

function ResultForAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllHistories = async () => {
      try {
        // API'dan barcha user history ma'lumotlarini olish
        const response = await fetch("http://localhost:9090/api-history/all");
        if (!response.ok) {
          throw new Error(`API xatosi: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          console.error("Ma'lumot olishda xato:", result.message || "Noma'lum xato");
        }
      } catch (error) {
        console.error("API'dan ma'lumot olishda xato:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllHistories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <p className="text-xl font-semibold text-gray-700">No quiz history available.</p>
        <p className="text-gray-500">No user quiz records have been found yet.</p>
      </div>
    );
  }
  return (
    <div className="py-[50px] px-[40px] m-4 border-[1px] border-[#999] rounded-xl shadow-5xl max-h-[620px] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
      <table className="bg-white border border-gray-200 rounded-lg shadow-md border-spacing-2 border-collapse separate w-full">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Full Name</th>
            <th className="py-3 px-4 text-left">Test Name</th>
            <th className="py-3 px-4 text-left">Subject</th>
            <th className="py-3 px-4 text-left">Total Score</th>
            <th className="py-3 px-4 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 rounded-lg`}
            >
              <td className="py-3 px-4">{item.username}</td>
              <td className="py-3 px-4">{item.testName}</td>
              <td className="py-3 px-4">{item.subjectName}</td>
              <td className="py-3 px-4">{item.totalScore}</td>
              <td className="py-3 px-4">{new Date(item.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultForAdmin;
