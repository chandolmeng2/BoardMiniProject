import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout({ children }) {
  return (
    <>
      <Sidebar />
      <Topbar />
      <div style={{ marginLeft: 220, marginTop: 70, padding: 30, background: "#f4f6fa", minHeight: "100vh" }}>
        {children}
      </div>
    </>
  );
}

export default MainLayout;
