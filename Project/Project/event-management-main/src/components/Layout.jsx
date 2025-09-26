import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar1"; // ensure correct path

export default function Layout() {
  return (
    <>
      {/* Title above navbar */}
      <header className="bg-white shadow-sm py-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          Employee Management
        </h1>
        <p className="text-sm text-gray-500">
          {/* Simple dashboard to view and manage employees */}
        </p>
      </header>

      {/* Navbar below title */}
      <div className="mt-2">
        <Navbar />
      </div>

      {/* Page content */}
      <div className="container mx-auto px-4 py-6">
        <Outlet />
      </div>
    </>
  );
}
