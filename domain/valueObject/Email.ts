export class Email {
  private value: string;
  constructor(email: string) {
    if (!email) throw new Error("Email is required");
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) throw new Error("Invalid email format: " + email);
    this.value = email;
  }

  getValue(): string {
    return this.value;
  }
}