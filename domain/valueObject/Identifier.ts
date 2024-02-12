import { randomUUID } from "crypto";

export interface IdentifierAdapter {
  createId(): string
}

export class IdentifierUUID implements IdentifierAdapter {
  createId(): string {
    return randomUUID();
  }
 }

export class Identifier {
    constructor(
      private readonly identifier: IdentifierAdapter
    ){}

    getIdentifier(): string{
      return this.identifier.createId()
    }
}

