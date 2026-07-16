import { Menu } from "lucide-react";

const titles = { dashboard: "Traffic overview", map: "Live traffic map", predictions: "Predictions", alerts: "System alerts" };

export default function Header({ currentTab, cities, activeCity, onSelectCity, user, onOpenSidebar }) {
  return <header className="sticky top-0 z-40 min-h-20 px-4 sm:px-8 flex items-center justify-between gap-3 border-b border-outline-variant bg-surface-container-low/90 backdrop-blur-md"><div className="min-w-0 flex items-center gap-3"><button aria-label="Open navigation menu" onClick={onOpenSidebar} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-primary hover:bg-primary/10 md:hidden"><Menu size={22}/></button><div className="min-w-0"><h2 className="truncate text-lg font-bold">{titles[currentTab]}</h2><p className="truncate text-xs text-on-surface-variant">Welcome back, {user?.name ?? "operator"}</p></div></div><select aria-label="Select city" value={activeCity?.id ?? ""} onChange={(event) => onSelectCity(cities.find((city) => city.id === event.target.value))} className="max-w-35 shrink rounded-lg border border-outline-variant bg-white px-3 py-2 text-xs text-on-surface"><option value="" disabled>Select city</option>{cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}</select></header>;
}
