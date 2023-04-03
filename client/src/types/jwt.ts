import { JwtPayload as _ } from "jwt-decode";
import { Profile } from "./Profile";

interface JwtPayload extends _ {
  readonly id: string;
  readonly email: string;
  readonly displayName: string;
  readonly profile: Profile;
}

export type { JwtPayload };
