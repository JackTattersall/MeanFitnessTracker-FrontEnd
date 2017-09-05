export class User {

  constructor(
    public email: string,
    public password: string,
    public first_name?: string,
    public second_name?: string,
    public is_verified?: boolean
  ) {};
}
