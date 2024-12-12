import { useState, useEffect } from "react";
import { Button, Radio, Progress } from "antd";
import axios from "axios";

const QuizStart = ({ testId, testTime, testAmount }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(testTime * 60);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0);

 
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
        //   `http://localhost:9090/api-test/${testId}/start?userId=${userId}`
          `http://localhost:9090/api-test/${testId}/start?userId=1`
        );
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      }
    };
    fetchQuestions();
  }, [testId]);

  // Vaqtni boshqarish
  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  const Restart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft(testTime * 60);
    setSubmitted(false);
    setScore(0);
    setKey((prevKey) => prevKey + 1);
  };

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < testAmount - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setSubmitted(true);
  };

  return (
    <div
      className="shadow-md px-4 lg:px-10 pb-[100px] border rounded-lg"
      style={{ maxWidth: "600px", margin: "0 auto" }}
    >
      <h2 className={"flex justify-center font-bold text-xl my-4"}>Test Solver</h2>
      <Progress percent={(100 * timeLeft) / (testTime * 60)} showInfo={false} />
      <p style={{ fontWeight: "bold", fontSize: "18px" }}>
        Time Left: {timeLeft} seconds
      </p>

      {!submitted ? (
        <>
          <div
            className="mt-5 shadow"
            style={{
              marginBottom: "20px",
              minHeight: "200px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <h3>
              {questions[currentQuestionIndex]?.question || "Savollar yuklanmoqda..."}
            </h3>
            <Radio.Group
              onChange={(e) =>
                handleAnswerChange(
                  questions[currentQuestionIndex]?.id,
                  e.target.value
                )
              }
              value={selectedAnswers[questions[currentQuestionIndex]?.id]}
            >
              {questions[currentQuestionIndex]?.options?.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              type="primary"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Prev
            </Button>
            {currentQuestionIndex < testAmount - 1 ? (
              <Button type="primary" onClick={handleNextQuestion}>
                Next
              </Button>
            ) : (
              <Button type="primary" onClick={handleSubmit}>
                Finish
              </Button>
            )}
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h3 className={"font-semibold text-lg my-2"}>Test Yakunlandi!</h3>
          <h4 className="font-bold">
            {score}/{testAmount}
          </h4>
          <p className={"font-semibold text-lg "}>
            Sizning natijangiz: {(score / testAmount) * 100}%
          </p>
          <Button className="mt-4" onClick={Restart}>
            Testni qayta ishlash
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizStart;
