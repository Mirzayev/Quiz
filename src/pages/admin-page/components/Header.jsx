import Logo from '../../../assets/images/Logo.jpg';
import { Avatar, Badge, Button, Dropdown, Modal, Space } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useState } from "react";

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const menuItems = [
        {
            key: '1',
            label: 'Change name',
            icon: <UserOutlined />,
        },
        {
            key: '2',
            label: 'Logout',
            icon: <UserOutlined />,
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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
                    <Button className="rounded-full" onClick={showModal}>
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

            <Modal title="Fan nomini kiriting!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <input type="text" placeholder={"Enter add subject!"} className={"outline-none mt-2 py-1  pr-10 pl-1 rounded border"}/>
            </Modal>
        </div>
    );
}
