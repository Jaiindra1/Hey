// Creates an explainable, rule-based recommendation from stored traffic data.
export function createRoutingPlan(city) {
  const restrictedZone = city.zones.find((zone) => zone.status === 'busy') ?? city.zones[0];
  const clearZones = city.zones
    .filter((zone) => zone.name !== restrictedZone.name && zone.status === 'flowing')
    .slice(0, 2);
  const highImpact = city.anomalies.find((item) => item.impact === 'High Impact');

  return {
    cityId: city.id,
    status: 'recommended',
    generatedAt: new Date().toISOString(),
    trigger: highImpact
      ? `${highImpact.location}: ${highImpact.actionRequired}`
      : `${restrictedZone.name}: elevated corridor load`,
    restrictedRoute: restrictedZone.name,
    alternatives: clearZones.map((zone, index) => ({
      name: zone.name,
      allocation: index === 0 ? 60 : 40,
      efficiency: zone.efficiency,
    })),
    laneDirection: {
      location: restrictedZone.name,
      action: 'Temporarily make one curbside lane outbound-only',
      durationMinutes: 20,
      condition: 'Activate only after field verification and authorized traffic-controller approval.',
    },
  };
}
