import React, { useState, useEffect } from "react";

function Result() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const result = await response.json();
        setData(result);
        const addressData = result.map(user => user.address);
        setAddresses(addressData);
      } catch (error) {
        console.error("API dan ma'lumot olishda xato:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md border-spacing-2 border-collapse separate">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Group Name</th>
              <th className="py-3 px-4 text-left">No. of Persons in Group</th>
              <th className="py-3 px-4 text-left">Participants</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className="py-3 px-4 text-center text-gray-500">
                Empty table
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center mx-auto w-full">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md border-spacing-2 border-collapse separate">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Group Name</th>
                <th className="py-3 px-4 text-left">No. of Persons in Group</th>
                <th className="py-3 px-4 text-left">Participants</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="py-3 px-4 text-center text-gray-500">
                  Empty table
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const combinedData = data.map((item, index) => ({
    ...item,
    address: addresses[index]
  }));

  return (
    <div className="py-[50px] px-[40px] m-4 border-[1px] border-[#999] rounded-xl shadow-5xl max-h-[620px] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
      <table className="bg-white border border-gray-200 rounded-lg shadow-md border-spacing-2 border-collapse separate w-full">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Group Name</th>
            <th className="py-3 px-4 text-left">No. of Persons in Group</th>
            <th className="py-3 px-4 text-left">Participants</th>
            <th className="py-3 px-4 text-left">Action</th>
            <th className="py-3 px-4 text-left">suite</th>
            <th className="py-3 px-4 text-left">View</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map((item, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 rounded-lg`}
            >
              <td className="py-3 px-4">{item.id}</td>
              <td className="py-3 px-4">{item.name}</td>
              <td className="py-3 px-4">{item.username}</td>
              <td className="py-3 px-4">{item.address.street}</td>
              <td className="py-3 px-4">{item.address.suite}</td>
              <td className="py-3 px-4">{item.address.city}</td>
              <td className="py-3 px-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Result;
