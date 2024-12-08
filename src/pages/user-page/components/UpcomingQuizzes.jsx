import React, { useEffect, useState } from "react";

const UpcomingQuizzes = ({ subject, apiUrl }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // API orqali ma'lumotlarni yuklash
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(apiUrl); // Har bir fan uchun alohida API
        const data = await response.json();
        setQuizzes(data); // API'dan kelgan ma'lumotlarni saqlash
      } catch (error) {
        console.error(`${subject} ma'lumotlarini yuklashda xatolik:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [apiUrl, subject]);

  return (
    <div className="w-1/3 h-96 overflow-y-auto border rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-xl font-semibold mb-4">{subject}</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : quizzes.length === 0 ? (
        <p className="text-center text-gray-500">No subjects available.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {quizzes.map((quiz, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
            >
              <h3 className="text-lg font-medium">{quiz.id}</h3>
              <a
                href={`/quiz/${quiz.id}`}
                className="text-blue-500 text-sm font-medium"
              >
                Open →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const QuizContainer = () => {
  const subjects = [
    { name: "Mathematics", apiUrl: "https://jsonplaceholder.typicode.com/posts" },
    { name: "Physics", apiUrl: "https://jsonplaceholder.typicode.com/todos" },
    { name: "Chemistry", apiUrl: "https://jsonplaceholder.typicode.com/albums" },
  ];

  return (
    <div className="p-4 flex flex-wrap gap-4">
      {subjects.map((subject, index) => (
        <UpcomingQuizzes
          key={index}
          subject={subject.name}
          apiUrl={subject.apiUrl}
        />
      ))}
    </div>
  );
};

export default QuizContainer;
