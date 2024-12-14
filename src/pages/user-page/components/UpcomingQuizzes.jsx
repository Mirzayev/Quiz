import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../../assets/images/Logo.jpg";

const QuizTitle = ({ title }) => {
  if (!title) {
    return <span className="text-gray-500">No title available</span>;
  }

  return (
    <div className="relative group">
      <h3 className="text-[13px] font-medium">
        <span className="group-hover:hidden">
          {title.length > 30 ? `${title.slice(0, 40)}...` : title}
        </span>
        <span className="hidden group-hover:inline">{title}</span>
      </h3>
    </div>
  );
};

const UpcomingQuizzes = ({ subject, allTests = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const navigate = useNavigate();

  const showModal = (quiz) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (selectedQuiz) {
      try {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const testId = selectedQuiz.id;
        const response = await axios.post(
          `http://localhost:9090/api-test/${testId}/start?userId=${userId}`,
          { testId, userId }
        );

        if (response.data.success) {
          navigate("/user-dashboard/quizstart", {
            state: {
              testId,
              userId,
              questions: selectedQuiz.questions || [],
            },
          });
        } else {
          console.error("Failed to start quiz:", response.data.message);
        }
      } catch (error) {
        console.error("Error starting quiz:", error);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col border rounded-lg shadow-md p-4 bg-white mx-auto w-full max-w-[400px]">
      <h2 className="text-xl font-semibold mb-4">{subject}</h2>
      {allTests.length === 0 ? (
        <p className="text-center text-gray-500">No quizzes available.</p>
      ) : (
        <div className="max-h-[200px] overflow-y-auto flex flex-col gap-2">
          {allTests.map((quiz, index) => (
            <div
              key={index}
              className="p-2 border rounded-lg shadow-sm flex justify-around items-center hover:bg-[#E1F2EB] duration-100 cursor-pointer"
            >
              <div className="w-[35px] h-[35px]">
                <img className="w-full h-full" src={Logo} alt="Logo" />
              </div>
              <div className="flex flex-col">
                <div className="w-full flex flex-col">
                  <h3 className="text-[13px] uppercase font-bold">{quiz.name}</h3>
                  <QuizTitle title={quiz.description} />
                </div>
                <button
                  onClick={() => showModal(quiz)}
                  className="text-blue-500 text-[13px] font-medium flex justify-end p-[10px]"
                >
                  Open →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal
        title="Start quiz"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedQuiz && (
          <div>
            <h3 className="font-bold uppercase text-xl">{selectedQuiz.name}</h3>
            <p className="text-gray-500 mt-2">{selectedQuiz.description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

const QuizContainer = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:9090/api-subject");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.success) {
          const formattedSubjects = data.data.map((subject) => ({
            name: subject.name,
            allTests: subject.allTests || [],
          }));
          setSubjects(formattedSubjects);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 64px)" }}>
      <header className="w-full h-[60px] bg-gray-800 text-white flex items-center justify-center shadow-md">
        <h1 className="text-2xl font-bold">Quiz Dashboard</h1>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-[250px] bg-gray-100 p-4 shadow-md">
          <div className="p-[20px] m-[10px]">
            <h1 className="text-center font-bold text-[20px]">Name of Science</h1>
          </div>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-gray-500">Failed to load subjects.</p>
          ) : (
            <ul className="space-y-2">
              {subjects.map((subject, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-200 rounded-md text-center hover:bg-gray-300"
                >
                  {subject.name}
                </li>
              ))}
            </ul>
          )}
        </aside>

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="flex flex-wrap gap-4 justify-center">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-gray-500">Failed to load quizzes.</p>
            ) : (
              subjects.map((subject, index) => (
                <UpcomingQuizzes
                  key={index}
                  subject={subject.name}
                  allTests={subject.allTests}
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
