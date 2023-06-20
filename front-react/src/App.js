import React from "react";
import PagesRoutes from "./routes.js";
import { ConfigProvider } from "antd";
import locale from 'antd/es/locale/pt_BR';

export default function App() {
  return (
    <>
      <ConfigProvider locale={locale}>
        <PagesRoutes />
      </ConfigProvider>
    </>
  );
}

