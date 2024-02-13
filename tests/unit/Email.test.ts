import { Email } from "domain/valueObject/Email";

test("should create email", () => {
  const email = new Email("any@any.com");
  expect(email.getValue()).toBe("any@any.com");
})

test("should throw error when create email", () => {
  expect(() => new Email("any")).toThrow("Invalid email format: any")
})

test("should throw error required email", () => {
  expect(() => new Email("")).toThrow("Email is required")
})