import { Identifier } from "application/security/Identifier";


export class Id {
    private value: string;
    constructor(
      private readonly identifier: Identifier
    ){
      this.value = this.identifier.createId();
    }

    getId(): string{
      return this.value;
    }
}

