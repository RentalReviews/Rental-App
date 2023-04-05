import { JwtPayload as _ } from "jwt-decode";

interface JwtPayload extends _ {
  readonly id: string;
  readonly email: string;
  readonly displayName: string;
}

export type { JwtPayload };
