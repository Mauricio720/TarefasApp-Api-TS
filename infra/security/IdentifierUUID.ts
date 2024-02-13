import { Identifier } from "application/security/Identifier";
import { randomUUID } from "crypto";

export class IdentifierUUID implements Identifier {
  createId(): string {
    return randomUUID();
  }
 }