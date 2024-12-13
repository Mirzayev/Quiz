import React, { useState } from 'react';
import { DashboardOutlined, FileProtectOutlined, BarChartOutlined,LoginOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
const items = [
    {
        key: 'sub1',
        label: <NavLink to={"/user-dashboard"}>Dashbord</NavLink>,
        icon: <DashboardOutlined />,

    },
    {
        key: 'sub2',
        label: <NavLink to={"/user-dashboard/result"}> Result</NavLink>,
        icon: <BarChartOutlined />,

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