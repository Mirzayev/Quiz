import Logo from '../../../assets/images/Logo.jpg';
import { Avatar, Badge, Button, Dropdown, Modal, Space, Input, message, Spin } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import {NavLink} from "react-router-dom";

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState(''); // Input ma’lumotlarini saqlash
    const [loading, setLoading] = useState(false); // Spinnerni boshqarish uchun



    const menuItems = [
        {
            key: '1',
            label: <NavLink to={""}>Change password</NavLink>,
            icon: <UserOutlined />,
        },
        {
            key: '2',
            label: <NavLink to={"/Login"}>Logout</NavLink>,
            icon: <UserOutlined />,
        },
    ];

    const validateInput = () => {
        // Input validatsiyasi (uzunligi kamida 3 bo‘lishi shart)
        if (!data.trim()) {
            message.error("Subject nomi bo‘sh bo‘lishi mumkin emas!");
            return false;
        }
        if (data.trim().length < 3) {
            message.error("Subject nomi kamida 3 ta belgi bo‘lishi kerak!");
            return false;
        }
        return true;
    };

    const handleAddSubject = async () => {
        if (!validateInput()) return;

        setLoading(true); // Spinnerni yoqish
        try {
            const response = await fetch('http://localhost:9090/api-subject/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: data.trim() }),
            });

            if (response.ok) {
                message.success('Subject muvaffaqiyatli qo‘shildi!');
                setData(''); // Inputni tozalash
                setIsModalOpen(false); // Modalni yopish
            } else {
                const errorData = await response.json();
                message.error(`Xatolik: ${errorData.message || 'Noma’lum xatolik yuz berdi'}`);
            }
        } catch (error) {
            message.error("Serverga ulanishda xatolik yuz berdi!");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setData(''); // Inputni tozalash
    };

    return (
        <div className="flex flex-col md:flex-row bg-[#041025] py-1 px-5 h-[64px]">
            {/* Left Section */}
            <div className="md:basis-1/6 text-white flex gap-2 items-center justify-center md:justify-start p-2">
                <img className="max-h-10" src={Logo} alt="Logo" />
                <p className="text-sm md:text-base">Resolve</p>
            </div>

            {/* Right Section */}
            <div className="md:basis-5/6 p-2 flex items-center justify-around">
                <div className="text-center md:text-left text-white w-1/3 flex justify-between pt-2">
                    <p>Dashboard</p>
                    <Button className="rounded-full" onClick={() => setIsModalOpen(true)}>
                        <i className="fa-solid fa-clock"></i>
                        <p>New Subject</p>
                    </Button>
                </div>
                <div className="text-center md:text-left text-white w-1/2 flex justify-end gap-14 items-center">
                    <Badge count={5} offset={[2, 4]} style={{ width: '10px', height: '20px' }} className="cursor-pointer">
                        <i className="fa-regular fa-envelope text-white text-2xl hover:text-slate-400 transition-all"></i>
                    </Badge>
                    <Badge count={5} offset={[2, 4]} style={{ width: '10px', height: '20px' }} className="cursor-pointer">
                        <i className="fa-solid fa-bell text-white text-2xl hover:text-slate-400 transition-all"></i>
                    </Badge>
                    <Dropdown menu={{ items: menuItems }} trigger={['click']} className="w-10 h-10 rounded-full">
                        <Button>
                            <UserOutlined className="text-xl" />
                        </Button>
                    </Dropdown>
                </div>
            </div>

            <Modal
                title="Fan nomini kiriting!"
                open={isModalOpen}
                onOk={handleAddSubject}
                onCancel={handleCancel}
                confirmLoading={loading} // Spinner tugmada
            >
                <Input
                    placeholder="Enter subject name"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            </Modal>
        </div>
    );
}
