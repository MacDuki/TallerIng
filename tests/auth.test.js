import {
  validateCredentials,
  createSession,
  getSession,
  isAuthenticated,
  clearSession,
} from "./auth.js";

describe("test auth helpers", () => {
  beforeEach(() => {
    clearSession();
  });

  test("validateCredentials should return true for valid admin credentials", () => {
    const result = validateCredentials("admin@barberia.com", "pass123");
    expect(result).toBe(true);
  });

  test("validateCredentials should return false for invalid credentials", () => {
    const result = validateCredentials("assads@gmail.com", "wrongpass");
    expect(result).toBe(false);
  });

  test("createSession returns a new session", () => {
    const session = createSession("admin@barberia.com", "pass123");
    expect(session.email).toBe("admin@barberia.com");
    expect(session.isAuthenticated).toBe(true);
    expect(session.loginTime).toBeDefined();
  });

  test("createSession should return null for invalid credentials", () => {
    const session = createSession("wrong@email.com", "wrongpass");
    expect(session).toBe(null);
  });

  test("getSession should return null when no session exists", () => {
    clearSession();
    const session = getSession();
    expect(session).toBe(null);
  });

  test("getSession should return session when valid session exists", () => {
    createSession("admin@barberia.com", "pass123");
    const session = getSession();
    expect(session.email).toBe("admin@barberia.com");
    expect(session.isAuthenticated).toBe(true);
  });

  test("isAuthenticated returns false when no session", () => {
    clearSession();
    const result = isAuthenticated();
    expect(result).toBe(false);
  });

  test("isAuthenticated returns true when valid session exists", () => {
    createSession("admin@barberia.com", "pass123");
    const result = isAuthenticated();
    expect(result).toBe(true);
  });

  test("clearSession removes session", () => {
    createSession("admin@barberia.com", "pass123");
    clearSession();
    const session = getSession();
    expect(session).toBe(null);
  });
});
