import React, { useEffect, useState } from "react";
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
                <div  >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold ">{subject}</h2>
                        <i className={"fa-solid fa-pen text-[13px]"}></i>
                    </div>
                    {loading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : quizzes.length === 0 ? (
                        <p className="text-center text-gray-500">No quizzes available.</p>
                    ) : (
                        <div className="h-[200px] overflow-y-auto flex flex-col gap-2">
                            {quizzes.map((quiz, index) => (
                                <div
                                    key={index}
                                    className="p-2 border rounded-lg shadow-sm flex justify-around items-center hover:bg-[#E1F2EB] duration-100 cursor-pointer"
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
        { name: "Biology", apiUrl: "https://jsonplaceholder.typicode.com/photos" },
        { name: "History", apiUrl: "https://jsonplaceholder.typicode.com/users" },
    ];

    return (
        <div className="flex flex-col"
             style={{ height: "calc(100vh - 64px)",scrollbarWidth: 'none' }}
        >
            <header className="w-full h-[60px] bg-gray-800 text-white flex items-center justify-center shadow-md">
                <h1 className="text-2xl font-bold">Quiz Dashboard</h1>
            </header>

            <div   className="flex-1 flex flex-col md:flex-row overflow-hidden">

                <main  className="flex-1 w-full overflow-y-auto  bg-gray-50">
                    <div className=" gap-4 ">
                        {subjects.map((subject, index) => (
                            <UpcomingQuizzes
                                key={index}
                                subject={subject.name}
                                apiUrl={subject.apiUrl}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default QuizContainer;
