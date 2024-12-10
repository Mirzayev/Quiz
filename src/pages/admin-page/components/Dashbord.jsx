import React, { useState } from 'react';
import { DashboardOutlined, FileProtectOutlined, BarChartOutlined,LoginOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {NavLink} from "react-router-dom";

const items = [
    {
        key: 'sub1',
        label: <NavLink to="">Dashbord</NavLink>,
        icon: <DashboardOutlined />,

    },
    {
        key: 'sub2',
        label: <NavLink to={"/quiz"}>Quiz</NavLink>,
        icon: <FileProtectOutlined />,

    },

    {
        key: 'sub3',
        label: <NavLink to={"/result"}>Result</NavLink>,
        icon: <BarChartOutlined />,

    },
    {
        key: 'sub4',
        label: 'Logout',
        icon: <LoginOutlined />,

    },
];
const Dashbord = () => {
    const [theme, setTheme] = useState('dark');
    const [current, setCurrent] = useState('1');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <>

            <br />
            <br />
            <Menu
                theme={theme}
                onClick={onClick}
                style={{
                    width: 256,
                }}
                defaultOpenKeys={['sub1']}
                selectedKeys={[current]}
                mode="inline"
                items={items}
            />
        </>
    );
};
export default Dashbord;