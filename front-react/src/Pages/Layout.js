import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FormOutlined, 
  BarsOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function LayoutMenu({children}) {
  const navigate = useNavigate();
  const { Header, Sider, Content, Footer } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onSelect={e=>navigate(e.item.props.route)}
          items={[
            {
              key: '1',
              icon: <FormOutlined />,
              label: 'Inscreva-se',
              route: "/"
            },
            {
              key: '2',
              icon: <BarsOutlined />,
              label: 'Lista de Inscritos',
              route: "/infor-list"
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
         {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}> WiseTech ©2023 Created by Nayane Maria</Footer>
      </Layout>
    </Layout>
  );
};