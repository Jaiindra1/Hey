import { Siren } from "lucide-react";
export default function EmergencyView({ city }) {
     return
     (<section className="rounded-2xl border border-error/25 bg-white p-8 shadow-sm">
        <div className="flex gap-4 items-center">
            <div className="rounded-full bg-error/10 p-4 text-error">
            <Siren size={30}/></div>
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-error">
                    Emergency routing enabled</p>
                    <h2 className="mt-1 text-2xl font-bold">Priority corridor for {city.name}</h2></div>
                    </div>
                    <p className="mt-7 max-w-2xl text-on-surface-variant">Traffic signals and rerouting recommendations are prioritised for emergency vehicles. Monitor the map and coordinate with responders before disabling this mode.</p>
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl bg-surface-container-low p-4">
                            <p className="text-xs text-on-surface-variant">Priority status</p>
                            <strong className="mt-2 block text-error">ACTIVE</strong></div>
                            <div className="rounded-xl bg-surface-container-low p-4">
                                <p className="text-xs text-on-surface-variant">City flow</p>
                                <strong className="mt-2 block">{city.flowIndex}%</strong>
                                </div><div className="rounded-xl bg-surface-container-low p-4">
                                    <p className="text-xs text-on-surface-variant">Reroutes in progress</p>
                                    <strong className="mt-2 block">{city.activeReroutingCount}
                                        </strong>
                                        </div>
                                        </div>
                </section>); 
}
