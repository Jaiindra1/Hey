import { BellRing, LayoutDashboard, LineChart, LogOut, Map, ShieldAlert, X } from "lucide-react";

const navigation = [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }, { id: "map", label: "Map", icon: Map }, { id: "predictions", label: "Predictions", icon: LineChart }, { id: "alerts", label: "Alerts", icon: BellRing }];

export default function Sidebar({ currentTab, onChangeTab, emergencyActive, onToggleEmergency, onSignOut, isOpen, onClose }) {
  function selectTab(id) { onChangeTab(id); onClose(); }
  function handleEmergency() { onToggleEmergency(); onClose(); }
  function handleSignOut() { onClose(); onSignOut(); }

  return <>
    {isOpen && <button aria-label="Close navigation menu" className="fixed inset-0 z-[45] bg-slate-950/35 backdrop-blur-[1px] md:hidden" onClick={onClose} />}
    <aside aria-label="Main navigation" className={`w-64 h-dvh fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex flex-col py-5 px-4 z-50 shadow-xl transition-transform duration-300 ease-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="mb-7 px-2 flex items-center gap-3">
        <div className="w-10 h-10 shrink-0 bg-primary/10 rounded-lg grid place-items-center text-primary"><ShieldAlert size={20}/></div>
        <div className="min-w-0 flex-1"><h1 className="text-lg font-bold tracking-wide">SYNTHETICS</h1><p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Traffic system</p></div>
        <button aria-label="Close navigation menu" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-on-surface-variant hover:bg-primary/10 hover:text-primary md:hidden"><X size={20}/></button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">{navigation.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => selectTab(id)} className={`w-full flex gap-3 items-center rounded-lg px-3 py-3 text-left text-sm cursor-pointer ${currentTab === id && !emergencyActive ? "bg-primary/10 text-primary font-bold" : "text-on-surface-variant hover:bg-primary/5"}`}><Icon size={18}/><span>{label}</span></button>)}</nav>
      <div className="space-y-3 border-t border-outline-variant pt-4"><button onClick={handleSignOut} className="w-full flex gap-3 items-center rounded-lg px-3 py-3 text-primary bg-primary/10 text-sm font-bold cursor-pointer"><LogOut size={17}/><span>Sign out</span></button><button onClick={handleEmergency} className={`w-full flex gap-2 justify-center items-center rounded-lg px-3 py-3 text-sm font-bold cursor-pointer ${emergencyActive ? "bg-error text-white" : "bg-primary text-white"}`}><ShieldAlert size={16}/>{emergencyActive ? "Emergency active" : "Emergency override"}</button></div>
    </aside>
  </>;
}
