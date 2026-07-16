const API_URL = import.meta.env?.VITE_API_URL ?? "https://hey-backend-amk9.onrender.com/api";
async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, { credentials: "include", ...options });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message ?? `Request failed (${response.status})`);
  }
  if (response.status === 204) return null;
  return response.json();
}
const authApi = {
  signUp: (details) => request("/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(details) }),
  signIn: (details) => request("/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(details) }),
  me: () => request("/auth/me"),
  signOut: () => request("/auth/logout", { method: "POST" }),
};
const trafficApi = {
  getCities: () => request("/cities"),
  getEmergencyUnit: (id) => request(`/emergency-units/${id}`),
  getRoutingPlan: (cityId) => request(`/cities/${cityId}/routing-plan`),
  activateRoutingPlan: (cityId) => request(`/cities/${cityId}/routing-plan/activate`, { method: 'POST' })
};
export {
  trafficApi, authApi
};
