import { z } from "zod";

export default class CreateProjectRequest {
  private request: Request;
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
      name: z.string(), // When creating this is the same sa the git_provider_project_data['name'] -> be we will give project owners to change name
      access_token: z.string(), // This must be created first before creating the project
      git_provider: z.string(),
      git_provider_project_data: z.object({
        id: z.number(),
        name: z.string(),
        name_with_namespace: z.string(),
        description: z.string(),
        visibility: z.string(),
        default_branch: z.string(),
        ssh_url_to_repo: z.string(),
        http_url_to_repo: z.string(),
        web_url: z.string(),
        readme_url: z.string(),
        owner: z.object({
          id: z.number(),
          name: z.number(),
        }),
        created_at: z.date(),
        last_activity_at: z.date(),
      }),
    })
  }

  public async validate() {
    return CreateProjectRequest.validator().safeParse(await this.getBody());
  }
}