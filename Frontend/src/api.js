const API_URL = import.meta.env?.VITE_API_URL ?? "http://localhost:3001/api";
async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, options);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}
const trafficApi = {
  getCities: () => request("/cities"),
  getEmergencyUnit: (id) => request(`/emergency-units/${id}`),
  getRoutingPlan: (cityId) => request(`/cities/${cityId}/routing-plan`),
  activateRoutingPlan: (cityId) => request(`/cities/${cityId}/routing-plan/activate`, { method: 'POST' })
};
export {
  trafficApi
};
