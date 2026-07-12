const API_URL = import.meta.env?.VITE_API_URL ?? "https://hey-backend-amk9.onrender.com/api";
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
