import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardView from "./components/DashboardView";
import MapView from "./components/MapView";
import PredictionsView from "./components/PredictionsView";
import AlertsView from "./components/AlertsView";
import EmergencyView from "./components/EmergencyView";
import AdminAuth from "./components/AdminAuth";
import { authApi, trafficApi } from "./api";

export default function App() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [cities, setCities] = useState([]);
  const [activeCity, setActiveCity] = useState(null);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { authApi.me().then(({ user: currentUser }) => setUser(currentUser)).catch(() => {}).finally(() => setReady(true)); }, []);
  useEffect(() => {
    if (!user) return;
    trafficApi.getCities().then((cityList) => { setCities(cityList); setActiveCity(cityList[0] ?? null); }).catch((loadError) => setError(loadError.message));
  }, [user]);

  async function signOut() {
    await authApi.signOut().catch(() => {});
    setUser(null); setCities([]); setActiveCity(null); setEmergencyActive(false);
  }

  if (!ready) return <main className="min-h-screen grid place-items-center text-on-surface-variant">Checking secure session…</main>;
  if (!user) return <AdminAuth onAuthenticated={setUser} />;

  let content = <p className="glass-card rounded-xl p-6">Loading traffic data…</p>;
  if (error) content = <p className="rounded-xl border border-error/30 bg-error/10 p-6 text-error">{error}</p>;
  if (activeCity && emergencyActive) content = <EmergencyView city={activeCity} />;
  if (activeCity && !emergencyActive) {
    const views = { dashboard: <DashboardView city={activeCity} user={user} />, map: <MapView city={activeCity} />, predictions: <PredictionsView city={activeCity} />, alerts: <AlertsView city={activeCity} /> };
    content = views[currentTab];
  }
  return <div className="min-h-screen bg-background text-on-background flex app-shell"><Sidebar currentTab={currentTab} onChangeTab={setCurrentTab} emergencyActive={emergencyActive} onToggleEmergency={() => setEmergencyActive(!emergencyActive)} onSignOut={signOut} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /><div className="flex-1 ml-64 min-h-screen"><Header currentTab={currentTab} cities={cities} activeCity={activeCity} onSelectCity={setActiveCity} user={user} onOpenSidebar={() => setSidebarOpen(true)} /><main className="p-4 sm:p-8 max-w-7xl w-full mx-auto">{content}</main></div></div>;
}
