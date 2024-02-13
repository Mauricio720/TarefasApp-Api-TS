import { Identifier } from "application/security/Identifier";
import { Id } from "domain/valueObject/Identifier";

const identifier: Identifier = {
  createId: jest.fn().mockReturnValue("any_id_uuid"),
};

test("should create id", () => {
  const id = new Id(identifier);
  expect(id.getId()).toBe("any_id_uuid");
})

