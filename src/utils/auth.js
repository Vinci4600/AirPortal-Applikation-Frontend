/**
 * Safely decode the JWT payload stored in localStorage.
 * On any parse error the token is removed and the user is sent to /login.
 * Returns the payload object or null when no token is present.
 */
export function getTokenPayload() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("Malformed token");
    return JSON.parse(atob(parts[1]));
  } catch {
    localStorage.clear();
    window.location.href = "/login";
    return null;
  }
}

export function getRole() {
  return getTokenPayload()?.role ?? null;
}
