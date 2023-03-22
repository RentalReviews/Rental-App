export interface RefreshToken {
  id: string;
  jti: string;
  name: string;
  exp: number;
  iat: number;
  email: string;
}
