import React from "react";
import { useParams } from "react-router-dom";

const QuizPage = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Details</h1>
      <p className="text-lg">This is the Quiz Page for Quiz ID: {id}</p>
    </div>
  );
};

export default QuizPage;
