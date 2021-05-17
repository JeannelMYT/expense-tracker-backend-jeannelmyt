import { IsNotEmpty } from 'class-validator';

export class AuthValidateDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  password: string;
}
