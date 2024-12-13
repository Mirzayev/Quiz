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
                const response = await fetch("http://localhost:9090/api-history/by{userId}");

                if (!response.ok) {
                    throw new Error(`Server xatolik: ${response.status}`);
                }

                const result = await response.json();
                setData(result); // Ma'lumotni state ichiga joylashtirish
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
                <Button className={"rounded-full px-4 py-2 h-full shadow-lg"}>
                    <p>Student directory</p>
                    <i className={"fa-solid fa-arrow-right text-orange-400"}></i>
                </Button>
            </div>

            <div className="row flex items-center px-5 py-[15px] gap-[15px]">
                <Button className={"px-6 py-1 bg-slate-100 rounded-full shadow-lg"}>Group1</Button>
                <Button className={"px-6 py-1 bg-slate-100 rounded-full shadow-lg"}>Group2</Button>
                <Button className={"px-6 py-1 bg-slate-100 rounded-full shadow-lg"}>Group3</Button>
            </div>

            <div className="px-5 py-3">
                {loading && <p>Loading data...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {data && (
                    <div>
                        <p><strong>User Name:</strong> {data.userName}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
