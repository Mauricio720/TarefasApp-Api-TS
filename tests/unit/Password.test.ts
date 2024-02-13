import { Encrypt } from "application/security/Encrypt";
import { Password } from "domain/valueObject/Password";

const encryptPass: Encrypt = {
  encrypt: jest.fn().mockReturnValue("any_password"),
  check: jest.fn().mockReturnValue(true),
}

test("should create password", () => {
  const password = new Password("any",encryptPass);
  expect(password.getValue()).toBe("any_password");
})

test("should throw error required password", () => {
  expect(() => new Password("",encryptPass)).toThrow("Password is required")
})