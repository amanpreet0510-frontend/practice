import { Suspense } from "react";
import Notifications from "./Notifications";
import SalesChart from "./SalesChart";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <h1>Dashboard</h1>

        <Suspense fallback={<p>Loading notifications…</p>}>
          <Notifications />
        </Suspense>

        <Suspense fallback={<p>Loading sales chart…</p>}>
          <SalesChart />
        </Suspense>
      </div>
    </div>
  );
}
