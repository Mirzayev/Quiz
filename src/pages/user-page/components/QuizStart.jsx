import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizStart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  if (!state || !state.testId || !state.userId) {
    return <p className="text-center text-red-500">Error: Missing test or user information.</p>;
  }

  const { testId, userId } = state;
  const [questions, setQuestions] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem("quizAnswers") || "{}")); // Javoblarni localStorage'dan yuklash
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizSummary, setQuizSummary] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [earnedScore, setEarnedScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post(
          `http://localhost:9090/api-test/${testId}/start?userId=${userId}`
        );
        if (response.data.success) {
          const randomizedQuestions = response.data.data.questions.map((q) => ({
            ...q,
            choices: shuffleArray(q.choices),
          }));
          setQuestions(response.data.data.questions);
          setShuffledQuestions(randomizedQuestions);
        } else {
          console.error("Failed to fetch questions:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [testId, userId]);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleAnswerChange = (choiceId, score) => {
    const updatedAnswers = { ...answers, [currentQuestion]: choiceId };
    setAnswers(updatedAnswers);
    localStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers)); // Javoblarni saqlash

    setTotalScore((prevScore) => prevScore + (score || 0));
    if (shuffledQuestions[currentQuestion].choices.find(choice => choice.id === choiceId)?.correct) {
      setEarnedScore((prevEarnedScore) => prevEarnedScore + score);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const finalizeQuiz = async () => {
    try {
      const responses = shuffledQuestions.map((q, index) => ({
        id: index + 1,
        text: q.choices.find((choice) => choice.id === answers[index])?.text || "",
        questionId: q.id,
        correct: shuffledQuestions[index].choices.find(choice => choice.id === answers[index])?.correct,
      }));

      const totalQuizScore = shuffledQuestions.reduce((total, question) => total + question.score, 0);
      const correctAnswersCount = responses.filter(response => response.correct).length;
      const percentage = totalQuizScore > 0 ? (earnedScore / totalQuizScore) * 100 : 0;

      setQuizSummary({
        totalScore: totalQuizScore,
        correctAnswers: correctAnswersCount,
        totalQuestions: shuffledQuestions.length,
        percentage: percentage.toFixed(2),
      });

      const response = await axios.post(
        `http://localhost:9090/api-test/${testId}/finish?userId=${userId}`,
        responses
      );

      if (response.data.success) {
        setQuizComplete(true);

        // LocalStorage tozalash
        localStorage.removeItem("quizAnswers");
      } else {
        console.error("Quiz submission failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const handleModalOk = () => {
    finalizeQuiz();
    setShowFinishModal(false);
  };

  const handleModalCancel = () => {
    setShowFinishModal(false);
  };

  const handleClickOutside = (e) => {
    if (e.target.closest(".quiz-container") || e.target.closest(".modal-content")) return;
    setShowFinishModal(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (quizComplete) {
    return (
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold mb-4">The test is over!</h2>
        <p className="text-lg">Number of questions: {quizSummary?.totalQuestions}</p>
        <p className="text-lg text-green-600">Correct answers: {quizSummary?.correctAnswers}</p>
        <p className="text-lg">Total score (all questions): {quizSummary?.totalScore}</p>
        <p className="text-lg">Score (earned): {earnedScore}</p>
        <p className="text-lg text-blue-600">Percent: {quizSummary?.percentage}%</p>
        <button
          onClick={() => navigate("/user-dashboard")}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Finish
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 relative shadow-lg quiz-container">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowFinishModal(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Finish
        </button>
      </div>
      <h2 className="text-2xl font-bold text-center mb-4">Quiz Start</h2>
      <div className="flex justify-center mb-4">
        {shuffledQuestions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestion(index)}
            className={`w-8 h-8 rounded-full text-sm mx-1 ${
              currentQuestion === index
                ? "bg-blue-500 text-white"
                : answers[index]
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {showFinishModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg modal-content">
            <h3 className="text-lg font-bold mb-4">Are you sure you want to finish the test?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleModalCancel}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleModalOk}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {shuffledQuestions.length > 0 && (
        <div>
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold mr-4">
              {shuffledQuestions[currentQuestion].text}
            </h3>
            <div className="text-black bg-gray-100 p-2 mx-2 rounded">
              Score: {shuffledQuestions[currentQuestion].score} {/* Ballni ko'rsatish */}
            </div>
          </div>
          {shuffledQuestions[currentQuestion].choices.map((choice) => (
            <div key={choice.id} className="flex items-center">
              <input
                type="radio"
                name="answer"
                value={choice.id}
                checked={answers[currentQuestion] === choice.id}
                onChange={() => handleAnswerChange(choice.id, shuffledQuestions[currentQuestion].score)}
              />
              <label className="ml-2">{choice.text}</label>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevQuestion}
              className={`px-4 py-2 rounded ${
                currentQuestion === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={currentQuestion === 0}
            >
              Prev
            </button>
            <button
              onClick={handleNextQuestion}
              className={`px-4 py-2 rounded ${
                currentQuestion === shuffledQuestions.length - 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
              disabled={currentQuestion === shuffledQuestions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizStart;
