import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardView from "./components/DashboardView";
import MapView from "./components/MapView";
import PredictionsView from "./components/PredictionsView";
import AlertsView from "./components/AlertsView";
import EmergencyView from "./components/EmergencyView";
import AdminAuth from "./components/AdminAuth";
import { trafficApi } from "./api";

export default function App() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [cities, setCities] = useState([]);
  const [activeCity, setActiveCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCities() {
      try {
        const cityList = await trafficApi.getCities();
        setCities(cityList);
        setActiveCity(cityList[0] || null);
      } catch {
        setError("Unable to reach the traffic data server. Start it with npm run server.");
      }
    }
    loadCities();
  }, []);

  if (showAdminAuth) return <AdminAuth onBack={() => setShowAdminAuth(false)} />;

  let content = <p className="glass-card rounded-xl p-6">Loading traffic data…</p>;
  if (error) content = <p className="rounded-xl border border-error/30 bg-error/10 p-6 text-error">{error}</p>;
  if (activeCity && emergencyActive) content = <EmergencyView city={activeCity} />;
  if (activeCity && !emergencyActive) {
    const views = {
      dashboard: <DashboardView city={activeCity} searchQuery={searchQuery} />,
      map: <MapView city={activeCity} searchQuery={searchQuery} />,
      predictions: <PredictionsView city={activeCity} />,
      alerts: <AlertsView city={activeCity} />,
    };
    content = views[currentTab];
  }

  return <div className="min-h-screen bg-background text-on-background flex app-shell">
    <Sidebar currentTab={currentTab} onChangeTab={setCurrentTab} emergencyActive={emergencyActive} onToggleEmergency={() => setEmergencyActive(!emergencyActive)} onAdminAccess={() => setShowAdminAuth(true)} />
    <div className="flex-1 ml-64 min-h-screen">
      <Header currentTab={currentTab} cities={cities} activeCity={activeCity} onSelectCity={setActiveCity} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onAdminAccess={() => setShowAdminAuth(true)} />
      <main className="p-8 max-w-7xl w-full mx-auto">{content}</main>
    </div>
  </div>;
}
