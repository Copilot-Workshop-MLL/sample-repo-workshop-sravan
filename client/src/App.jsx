import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import AttendancePage from './pages/AttendancePage';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
    return localStorage.getItem('token') ? children : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/*"
                    element={
                        <PrivateRoute>
                            <>
                                <Navbar />
                                <Routes>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/employees" element={<Employees />} />
                                    <Route path="/attendance" element={<AttendancePage />} />
                                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                                </Routes>
                            </>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
