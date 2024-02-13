import { Identifier } from "application/security/Identifier";


export class Id {
    private value: string;
    constructor(
      private readonly identifier: Identifier,
      id? : string
    ){
      this.value = id ? id : this.identifier.createId();
    }

    getId(): string{
      return this.value;
    }
}

