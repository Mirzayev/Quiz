import React, { useEffect, useState } from "react";
import Logo from "../../../assets/images/Logo.jpg";

// QuizTitle komponenti
const QuizTitle = ({ title }) => {
  if (!title) {
    return <span className="text-gray-500">No title available</span>;
  }

  return (
    <div className="relative group">
      <h3 className="text-[13px] font-medium">
        <span className="group-hover:hidden">
          {title.length > 30 ? `${title.slice(0, 30)}...` : title}
        </span>
        <span className="hidden group-hover:inline">{title}</span>
      </h3>
    </div>
  );
};

// UpcomingQuizzes komponenti
const UpcomingQuizzes = ({ subject, apiUrl }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Data not found");
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error(`${subject} ma'lumotlarini yuklashda xatolik:`, error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [apiUrl, subject]);

  return (
    <div className="w-[420px] h-[300px] overflow-hidden border rounded-lg shadow-md p-4 bg-white mx-auto my-[10px]">
      {error ? (
        <div className="text-gray-500 text-xl font-semibold">
          Empty page
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">{subject}</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : quizzes.length === 0 ? (
            <p className="text-center text-gray-500">No quizzes available.</p>
          ) : (
            <div className="h-[200px] overflow-y-auto flex flex-col gap-2">
              {quizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="p-2 border rounded-lg shadow-sm flex justify-around items-center hover:bg-[#999]"
                >
                  <div className="w-[35px] h-[35px]">
                    <img className="w-[100%] h-[100%]" src={Logo} alt="Logo" />
                  </div>
                  <div className="flex flex-col">
                    <div className="w-[200px] flex flex-col">
                      <h3 className="text-[13px] font-medium">{quiz.id}</h3>
                      <QuizTitle title={quiz.title} />
                    </div>
                    <a
                      href={`/quiz/${quiz.id}`}
                      className="text-blue-500 text-[13px] font-medium flex justify-end p-[10px]"
                    >
                      Open →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// QuizContainer komponenti
const QuizContainer = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("YOUR_BACKEND_API_URL"); // Backenddan fanlar ma'lumotini olish
        if (!response.ok) {
          throw new Error("Subjects not found");
        }
        const data = await response.json();
        setSubjects(data); // Backenddan olingan fanlarni o'rnatish
      } catch (error) {
        console.error("Fanlar ma'lumotlarini yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 64px)" }}>
      {/* Header */}
      <header className="w-full h-[60px] bg-gray-800 text-white flex items-center justify-center shadow-md">
        <h1 className="text-2xl font-bold">Quiz Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full md:w-[250px] bg-gray-100 p-4 shadow-md">
          <ul className="space-y-2">
            {loading ? (
              <li className="p-2 text-center text-gray-500">Loading subjects...</li>
            ) : subjects.length === 0 ? (
              <li className="p-2 text-center text-gray-500">No subjects available.</li>
            ) : (
              subjects.map((subject, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-200 rounded-md text-center hover:bg-gray-300"
                >
                  {subject.name}
                </li>
              ))
            )}
          </ul>
        </aside>

        {/* Upcoming Quizzes */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="flex flex-wrap gap-4 justify-center">
            {loading ? (
              <p className="text-center text-gray-500">Loading quizzes...</p>
            ) : subjects.length === 0 ? (
              <p className="text-center text-gray-500">No subjects available.</p>
            ) : (
              subjects.map((subject, index) => (
                <UpcomingQuizzes
                  key={index}
                  subject={subject.name}
                  apiUrl={subject.apiUrl} // har bir subject uchun apiUrl kerak
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuizContainer;
