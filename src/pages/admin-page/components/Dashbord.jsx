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
        label: 'Quiz',
        icon: <FileProtectOutlined />,

    },

    {
        key: 'sub3',
        label: 'Result',
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