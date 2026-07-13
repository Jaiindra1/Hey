import { AlertTriangle } from "lucide-react";
export default function AlertsView({ city }) {
     return (
      <section className="glass-card rounded-2xl p-6">
        <div className="flex gap-3 items-center">
            <AlertTriangle className="text-tertiary"/>
            <div>
                <h3 className="font-bold">Active alerts</h3>
                <p className="text-sm text-on-surface-variant">Items needing attention in {city.name}</p>
        </div>
        </div>
        <div className="mt-6 divide-y divide-outline-variant">{city.anomalies.map(alert => 
            <article key={alert.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="font-bold">{alert.location}</p><p className="mt-1 text-sm text-on-surface-variant">{alert.actionRequired}
                    </p>
                    </div>
            <div className="flex gap-3 items-center">
                <span className="rounded-full bg-tertiary/10 px-3 py-1 text-xs font-bold text-tertiary">{alert.impact}
                </span>
                <span className="text-xs text-on-surface-variant">{alert.time}</span>
                </div>
                </article>
                )}</div>
                </section>);
 }
