import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
    Home, InforList, NotFound
} from './Pages';
import LayoutMenu from "./Pages/Layout";

export default function PagesRoutes() {
    return (
        <Router>
            <LayoutMenu>
                <Routes>
                    <Route element={(<Home />)} path={"/"} />
                    <Route element={(<InforList />)} path={"/infor-list"} />
                    <Route element={(<NotFound />)} path={'/not-found'} />
                </Routes>
            </LayoutMenu>
        </Router>
    )
}