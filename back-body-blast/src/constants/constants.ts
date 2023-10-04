import Static from '../static/Static';
export enum UserRole {
  Client = 'client',
  Influencer = 'influencer',
  Admin = 'admin',
}

export class Constants {
  public static UserRoleList = new Static(
    UserRole.Client,
    UserRole.Influencer,
    UserRole.Admin,
  );
}
