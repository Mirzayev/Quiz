import React, { useEffect, useState } from "react";
import { Modal, Input, Button, message, Select } from "antd";
import Logo from "../../../assets/images/Logo.jpg";
import {NavLink} from "react-router-dom";

const { Option } = Select;

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

const UpcomingQuizzes = ({ subject, allTests }) => {
    return (
        <div className="flex flex-col border rounded-lg shadow-md p-4 bg-white mx-auto w-full max-w-[400px]">
            <div className="flex w-full justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">{subject}</h2>
            </div>
            {allTests.length === 0 ? (
                <p className="text-center text-gray-500">No quizzes available.</p>
            ) : (
                <NavLink to={"/admin-dashboard/quiz/add"} className="max-h-[200px] overflow-y-auto flex flex-col gap-2">
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
                                    <h3 className="text-[13px] font-medium">{quiz.id}</h3>
                                    <QuizTitle title={quiz.name} />
                                </div>
                                <a
                                    href={`/admin-dashboard/quiz/${quiz.id}`}
                                    className="text-blue-500 text-[13px] font-medium flex justify-end p-[10px]"
                                >
                                    Open →
                                </a>
                            </div>
                        </div>
                    ))}
                </NavLink>
            )}
        </div>
    );
};

const QuizContainer = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [quizData, setQuizData] = useState({ name: "", description: "", subjectId: null });


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
                        id: subject.id,
                        name: subject.name,
                        allTests: subject.allTests,
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

    const handleModalOpen = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setQuizData({ name: "", description: "", subjectId: null });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuizData({ ...quizData, [name]: value });
    };

    const handleSubjectChange = (value) => {
        setQuizData({ ...quizData, subjectId: value });
    };

    const handleSubmit = async () => {
        if (!quizData.subjectId) {
            message.error("Please select a subject.");
            return;
        }

        try {
            const response = await fetch("http://localhost:9090/api-test/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(quizData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit quiz data");
            }

            const result = await response.json();

            if (result.success) {
                message.success("Quiz added successfully!");
                handleModalClose();
            } else {
                throw new Error("API returned an error");
            }
        } catch (error) {
            console.error("Error submitting quiz data:", error);
            message.error("Failed to add quiz. Please try again.");
        }
    };

    return (
        <div className="flex flex-col" style={{ height: "calc(100vh - 64px)" }}>
            <header className="w-full h-[60px] bg-gray-800 text-white flex items-center justify-center shadow-md">
                <div className="flex justify-between px-10 w-full">
                    <h1 className="text-2xl font-bold">Quiz Dashboard</h1>
                    <Button
                        onClick={handleModalOpen}
                        className={"bg-[#05DBF2] text-slate-700"}
                    >
                        + Add Quiz
                    </Button>
                </div>
            </header>


            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {loading ? (
                            <p className="text-center text-gray-500">Loading...</p>
                        ) : error ? (
                            <p className="text-center text-gray-500">Failed to load quizzes.</p>
                        ) : (
                            subjects.map((subject) => (
                                <UpcomingQuizzes
                                    key={subject.id}
                                    subject={subject.name}
                                    allTests={subject.allTests}
                                />
                            ))
                        )}
                    </div>
                </main>
            </div>

            <Modal
                title="Quiz qo'shish"
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleModalClose}
                okText="Submit"
                cancelText="Cancel"
            >
                <Select
                    placeholder="Select Subject"
                    onChange={handleSubjectChange}
                    className="mb-3 w-full"
                    value={quizData.subjectId}
                >
                    {subjects.map((subject) => (
                        <Option key={subject.id} value={subject.id}>
                            {subject.name}
                        </Option>
                    ))}
                </Select>
                <Input
                    placeholder="Quiz Name"
                    name="name"
                    value={quizData.name}
                    onChange={handleInputChange}
                    className="mb-3"
                />
                <Input
                    placeholder="Quiz Description"
                    name="description"
                    value={quizData.description}
                    onChange={handleInputChange}
                />
            </Modal>
        </div>
    );
};

export default QuizContainer;
