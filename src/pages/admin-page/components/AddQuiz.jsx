import { useEffect, useState } from "react";
import { Button, message } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox.js";

export default function AddQuiz() {
    const [testId, setTestId] = useState('1'); // Dinamik quiz ID
    const [subject, setSubject] = useState('');
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([
        { text: '', isCorrect: false }, // A
        { text: '', isCorrect: false }, // B
        { text: '', isCorrect: false }, // C
        { text: '', isCorrect: false }, // D
    ]);

    // Quizni yuklash
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`http://localhost:9090/api-test`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch quiz data");
                }

                const result = await response.json();
                if (result.success) {
                    setSubject(result.subject);
                    message.success("Quiz fetched successfully!");
                } else {
                    message.error("Failed to fetch quiz data.");
                }
            } catch (error) {
                console.error("Error fetching quiz:", error);
                message.error(error.message || "An error occurred while fetching quiz data.");
            }
        };

        fetchQuiz();
    }, []);

    // Javoblarni o'zgartirish
    const handleAnswerChange = (index, field, value) => {
        const updatedAnswers = [...answers];

        if (field === 'isCorrect') {
            // Faqat bitta checkboxni tanlash
            updatedAnswers.forEach((answer, i) => {
                answer.isCorrect = i === index;
            });
        } else {
            updatedAnswers[index][field] = value;
        }

        setAnswers(updatedAnswers);
    };

    // Ma'lumotlarni yuborish
    const handleSubmit = async () => {
        if (!question || answers.some(answer => !answer.text)) {
            message.error("Please fill out all fields before submitting!");
            return;
        }

        const payload = {
            question,
            answers,
        };

        try {
            const response = await fetch(`http://localhost:9090/api-question/${testId}/questions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to submit question data");
            }

            const result = await response.json();
            if (result.success) {
                message.success("Question added successfully!");
                setQuestion('');
                setAnswers([
                    { text: '', isCorrect: false },
                    { text: '', isCorrect: false },
                    { text: '', isCorrect: false },
                    { text: '', isCorrect: false },
                ]);
            } else {
                message.error("Failed to submit question data.");
            }
        } catch (error) {
            console.error("Error submitting question:", error);
            message.error(error.message || "An error occurred while submitting question data.");
        }
    };

    return (
        <div className={"bg-white"}>
            {subject && <p>Current subject: {subject}</p>}
            <h1 className={"px-3 py-5 mt-10 rounded-lg shadow-lg text-lg font-semibold mx-10 border flex justify-center"}>
                Add Quiz
            </h1>

            <div className={"mt-10 border mx-10 rounded-lg bg-slate-100 shadow-lg"}>
                <div className={"px-3 py-5"}>
                    <p className={"bg-transparent font-medium px-1"}>Savol</p>
                    <input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder={"Enter your question"}
                        type="text"
                        className={"bg-transparent border-[1px] py-2 px-2 w-full border-slate-500 rounded"}
                    />

                    <div className={"px-3 py-5"}>
                        <p className={"font-medium"}>Javoblar</p>

                        <div className={"grid grid-cols-2 gap-3"}>
                            {answers.map((answer, index) => (
                                <div key={index} className={"flex items-center gap-2"}>
                                    <p>{String.fromCharCode(65 + index)})</p>
                                    <div
                                        className={
                                            "flex justify-between items-center border-[1px] border-black py-1 px-2 w-full rounded"
                                        }
                                    >
                                        <input
                                            value={answer.text}
                                            onChange={(e) => handleAnswerChange(index, 'text', e.target.value)}
                                            placeholder={"Enter your answer"}
                                            type="text"
                                            className={"bg-transparent outline-none w-full"}
                                        />
                                        <Checkbox
                                            checked={answer.isCorrect}
                                            onChange={() => handleAnswerChange(index, 'isCorrect', true)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={"flex items-center justify-end mx-10 mt-5"}>
                        <Button onClick={handleSubmit} className={"bg-green-400 text-white py-1 px-5 h-full"}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
