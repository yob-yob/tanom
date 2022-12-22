import { z } from "zod";

export default class RegisterRequest {
  private request;

  constructor(request: Request) {
    this.request = request
  }

  public async getBody() {
    return Object.fromEntries(await this.request.formData())
  }

  public validator() {
    return z.object({
      email: z.string(),
      password: z.string(),
    })
  }

  public async validate() {
    return this.validator().parse(await this.getBody());
  }
}