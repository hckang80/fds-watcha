export interface Token {
  token: string;
  user: {
    pk: number,
    email: any,
    username: any,
    nickname: string,
    img_profile: any
    first_name: string,
    last_name: string
    // phone_num: number,
    // signup_type: string,
  };
}
