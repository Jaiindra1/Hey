import { BellRing, LayoutDashboard, LineChart, LogIn, Map, ShieldAlert } from "lucide-react";

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "map", label: "Map", icon: Map },
  { id: "predictions", label: "Predictions", icon: LineChart },
  { id: "alerts", label: "Alerts", icon: BellRing },
];

export default function Sidebar({ currentTab, onChangeTab, emergencyActive, onToggleEmergency, onAdminAccess }) {
  return (<aside className="w-64 h-screen fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex flex-col py-6 px-4 z-50">
    <div className="mb-8 px-2 flex items-center gap-3"><div className="w-10 h-10 bg-primary/10 rounded-lg grid place-items-center text-primary"><ShieldAlert size={20}/></div><div><h1 className="text-lg font-bold tracking-wide">SYNTHETICS</h1><p className="text-[10px] text-on-surface-variant uppercase tracking-widest">AI traffic system</p></div></div>
    <nav className="flex-1 space-y-1">{navigation.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => onChangeTab(id)} className={`w-full flex gap-3 items-center rounded-lg px-3 py-3 text-left text-sm cursor-pointer ${currentTab === id && !emergencyActive ? "bg-primary/10 text-primary font-bold" : "text-on-surface-variant hover:bg-primary/5"}`}><Icon size={18}/><span>{label}</span></button>)}</nav>
    <div className="space-y-3 border-t border-outline-variant pt-4"><button onClick={onAdminAccess} className="w-full flex gap-3 items-center rounded-lg px-3 py-3 text-primary bg-primary/10 text-sm font-bold cursor-pointer"><LogIn size={17}/><span>Admin access</span></button><button onClick={onToggleEmergency} className={`w-full flex gap-2 justify-center items-center rounded-lg px-3 py-3 text-sm font-bold cursor-pointer ${emergencyActive ? "bg-error text-white" : "bg-primary text-white"}`}><ShieldAlert size={16}/>{emergencyActive ? "Emergency active" : "Emergency override"}</button></div>
  </aside>);
}
