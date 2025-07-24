/**
 * @typedef {Object} AdminSession
 * @property {string} email - The administrator's email address
 * @property {string} loginTime - ISO string timestamp of when the session was created
 * @property {boolean} isAuthenticated - Flag indicating if the user is authenticated
 */

// Hardcoded credentials
const ADMIN_EMAIL = "admin@barberia.com";
const ADMIN_PASSWORD = "pass123";

/**
 * Validates admin credentials
 * @param {string} email - Email to validate
 * @param {string} password - Password to validate
 * @returns {boolean} - True if credentials are valid
 */
function validateCredentials(email, password) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

/**
 * Creates and saves a new admin session
 * @returns {AdminSession} The created session data
 */
function createSession() {
  /** @type {AdminSession} */
  const sessionData = {
    email: ADMIN_EMAIL,
    loginTime: new Date().toISOString(),
    isAuthenticated: true,
  };

  localStorage.setItem("adminSession", JSON.stringify(sessionData));
  return sessionData;
}

/**
 * Gets the current session from localStorage
 * @returns {AdminSession|null} The session data or null if not found/invalid
 */
function getSession() {
  const sessionData = localStorage.getItem("adminSession");

  if (sessionData) {
    try {
      /** @type {AdminSession} */
      const session = JSON.parse(sessionData);
      return session.isAuthenticated ? session : null;
    } catch (error) {
      // Invalid session data, remove it
      localStorage.removeItem("adminSession");
      return null;
    }
  }
  return null;
}

/**
 * Checks if user is currently authenticated
 * @returns {boolean} True if user has valid session
 */
function isAuthenticated() {
  const session = getSession();
  return session !== null && session.isAuthenticated;
}

/**
 * Checks authentication status and handles accordingly
 * @param {string} redirectUrl - URL to redirect to if authenticated (optional)
 */
function checkAuthStatus(redirectUrl = "../dashboard-admin/index.html") {
  const session = getSession();

  if (session && session.isAuthenticated) {
    // Redirect to admin panel for already logged in users
    window.location.href = redirectUrl;
  }
}

/**
 * Clears the current session
 */
function clearSession() {
  localStorage.removeItem("adminSession");
}

/**
 * Logs out the current user by removing session data
 * @param {string} redirectUrl - URL to redirect to after logout (optional)
 */
function logout(redirectUrl = "../login-admin/index.html") {
  clearSession();

  // Redirect to login page after logout
  window.location.href = redirectUrl;
}
