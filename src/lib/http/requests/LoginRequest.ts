import { z } from "zod";

export default class LoginRequest {
  private request;
  private body: {
      [k: string]: FormDataEntryValue;
  };

  constructor(request: Request) {
    this.request = request
    this.body = {}
  }

  public async getBody() {
    if (Object.keys(this.body).length === 0) {
      this.body = Object.fromEntries(await this.request.formData());
    }

    return this.body
  }

  public static validator() {
    return z.object({
      email: z.string().email(),
      password: z.string(),
    })
  }

  public async validate() {
    return LoginRequest.validator().safeParse(await this.getBody());
  }
}