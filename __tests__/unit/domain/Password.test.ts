import { EncryptPassword } from "application/security/Encrypt";
import { Password } from "domain/valueObject/Password";

const encryptPass: EncryptPassword = {
  encrypt: jest.fn().mockReturnValue("any_password")
}

test("should create password", () => {
  const password = new Password("any",encryptPass);
  expect(password.getValue()).toBe("any_password");
})

test("should get password", () => {
  const password = new Password("any1234");
  expect(password.getValue()).toBe("any1234");
})

test("should throw error required password", () => {
  expect(() => new Password("",encryptPass)).toThrow("Password is required")
})