export namespace UserProfiles {
  interface UserProfile {
    id: number;
    name: string;
  }
  export interface Response {
    data: Array<UserProfile>;
  }
}
