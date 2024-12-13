import { Button } from "antd";
import { useEffect, useState } from "react";

export default function StudentList() {
    const [data, setData] = useState(null); // Yangi state hook, dastlab null qiymat
    const [loading, setLoading] = useState(true); // Yuklash holati uchun state
    const [error, setError] = useState(null); // Xatolik holati uchun state

    // Ma'lumotni yuklash uchun useEffect ishlatamiz
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:9090/api-user/allUsers");

                if (!response.ok) {
                    throw new Error(`Server xatolik: ${response.status}`);
                }

                const result = await response.json();

                if (result && result.data && Array.isArray(result.data)) {
                    setData(result.data); // Ma'lumotni state ichiga joylashtirish
                } else {
                    setError("Foydalanuvchilar ro'yxati bo'sh yoki noto'g'ri format");
                }
            } catch (err) {
                setError(err.message); // Xatolik holatini o'rnatish
            } finally {
                setLoading(false); // Yuklash holatini tugatish
            }
        };

        fetchData();
    }, []); // Faqat komponent yuklanganda ishlaydi

    // Komponentni render qilish
    return (
        <div>
            <div className="row flex w-full justify-between px-5 my-[40px]">
                <h4 className={"text-xl font-semibold"}>Students list</h4>
                <Button className={"rounded-full px-4 py-2 h-full shadow-lg flex items-center gap-2"}>
                    <p>Student directory</p>
                    <i className={"fa-solid fa-arrow-right text-orange-400"}></i>
                </Button>
            </div>

            <div className="px-5 py-3">
                {loading && <p>Loading data...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {data && (
                    <div>
                        {data.map((user, index) => (
                            <div key={index} className="py-2 px-5 border-b border-gray-200 my-4 bg-slate-200  rounded-md shadow-lg flex justify-between items-center">
                               <div className={"bg-slate-300 w-10 h-10 rounded-full flex items-center justify-center"}>
                                   <i className={"fa-solid fa-user"}></i>
                               </div>
                                <div>
                                    <p className=" my-3"> Name: {user.name || "No Name Available"}</p>
                                    <p className=" my-3">Surname: {user.surname || "No Name Available"}</p>
                                </div>
                                <div>
                                    <p className=" my-3"> Username: {user.username || "No Name Available"}</p>
                                    <p className=" my-3">Email: {user.email || "No Name Available"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
