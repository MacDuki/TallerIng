import { validateCredentials } from "./auth.js";

describe("Auth Helper", () => {
  test("validateCredentials should return true for valid admin credentials", () => {
    const result = validateCredentials("admin@barberia.com", "pass123");
    expect(result).toBe(true);
  });
});
