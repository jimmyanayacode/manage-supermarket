import { IsString, MinLength } from "class-validator";

//Define the data type input required
export class CreateProviderDto {
    @IsString()
    @MinLength(3)
    name: string;
}
