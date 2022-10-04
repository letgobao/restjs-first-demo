import { IsNotEmpty } from 'class-validator';
export class UpdateInfo {
  firstname: string;
  lastname: string;
  password: string;
}

export class AuthInfo {
  @IsNotEmpty() username: string;
  @IsNotEmpty() password: string;
}
