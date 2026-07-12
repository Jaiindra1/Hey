import { useEffect, useState } from "react";
import { Activity, MapPin, RefreshCw } from "lucide-react";

export default function DashboardView({ city, searchQuery }) {
  const [feed, setFeed] = useState(city.feedItems);
  const [updating, setUpdating] = useState(false);
  useEffect(() => setFeed(city.feedItems), [city]);
  const zones = city.zones.filter(zone => zone.name.toLowerCase().includes(searchQuery.toLowerCase()));
  function addUpdate() { setUpdating(true); setTimeout(() => {
     setFeed(items => [{ id: Date.now(),
       agent: "Control agent",
        time: "Just now",
         message: "Adjusted signal timing to maintain a smoother traffic flow.",
          type: "update" }, ...items]);
           setUpdating(false); }, 400);
           }
  return 
  <div className="space-y-6">
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="glass-card rounded-2xl p-6 lg:col-span-1">
        <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">City flow index</p>
        <div className="mt-7 flex items-end gap-3">
          <strong className="text-6xl font-serif text-primary">
            {city.flowIndex}%
            </strong>
          <span className="mb-2 rounded-full bg-secondary-container px-2 py-1 text-xs font-bold text-secondary">
            {city.flowIndexOptimal}
            </span>
          </div>
          <p className="mt-5 text-sm text-on-surface-variant">
            {city.throughputText}
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Network snapshot</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Metric label="Active zones" value={city.zones.length}/>
                <Metric label="Live agents" value="42"/>
                <Metric label="Coordinates" value={`${city.lat} · ${city.lng}`}/>
                </div>
                </div></section>
                <section className="grid gap-6 lg:grid-cols-5">
                  <div className="glass-card rounded-2xl p-6 lg:col-span-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">Area performance</h3>
                        <p className="mt-1 text-sm text-on-surface-variant">
                          Current traffic efficiency by zone</p>
                          </div>
                          <MapPin className="text-primary"/>
                          </div>
                          <div className="mt-6 space-y-4">{zones.map(zone => 
                            <div key={zone.name}>
                              <div className="flex justify-between text-sm">
                                <span>{zone.name}
                                  </span>
                                  <strong>
                                    {zone.efficiency}%
                                    </strong>
                                    </div>
                                    <div className="mt-2 h-2 rounded-full bg-surface-container">
                                      <div className="h-2 rounded-full bg-primary" style={{width: `${zone.efficiency}%`}}/>
                                      </div>
                                      </div>)}
                                      {zones.length === 0 && <p className="text-sm text-on-surface-variant">No matching areas.</p>}
                                      </div>
                                      </div>
                                      <div className="glass-card rounded-2xl p-6 lg:col-span-2">
                                        <div className="flex justify-between items-center">
                                          <h3 className="font-bold">Control feed</h3>
                                          <button onClick={addUpdate} className="rounded-lg p-2 text-primary hover:bg-primary/10 cursor-pointer" title="Add update">
                                          <RefreshCw size={16} className={updating ? "animate-spin" : ""}/>
                                          </button>
                                          </div>
                                          <div className="mt-4 space-y-4">{feed.slice(0,4).map(item => 
                                            <div key={item.id} className="border-l-2 border-secondary pl-3">
                                              <div className="flex justify-between gap-2 text-xs">
                                                <strong>{item.agent}
                                                  </strong>
                                                  <span className="text-on-surface-variant">
                                                    {item.time}
                                                    </span>
                                                    </div>
                                                    <p className="mt-1 text-xs leading-5 text-on-surface-variant">{item.message}
                                                      </p>
                                                      </div>
                                                      )}
                                                      </div>
                                                      </div>
                                                      </section>
                                                      </div>;
}
function Metric({ label, value }) { 
  return 
  <div className="rounded-xl bg-surface-container-low p-4">
    <p className="text-xs text-on-surface-variant">{label}</p>
    <p className="mt-2 flex gap-2 items-center text-lg font-bold">
      <Activity size={16} className="text-secondary"/>{value}</p>
      </div>; }
