import { IsString, MinLength } from "class-validator";

export class CreateProviderDto {
    @IsString()
    @MinLength(3)
    name: string;
}
