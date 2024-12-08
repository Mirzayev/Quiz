import React, { useState } from 'react';
import { DashboardOutlined, FileProtectOutlined, BarChartOutlined,LoginOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
    {
        key: 'sub1',
        label: 'Dashbord',
        icon: <DashboardOutlined />,

    },
    {
        key: 'sub2',
        label: 'Quizes',
        icon: <BarChartOutlined />,

    },
    {
        key: 'sub3',
        label: 'Students',
        icon: <FileProtectOutlined />,

    },
    {
        key: 'sub4',
        label: 'Admin',
        icon: <BarChartOutlined />,

    },
    {
        key: 'sub5',
        label: 'Result',
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