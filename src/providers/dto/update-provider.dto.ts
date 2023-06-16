import { PartialType } from '@nestjs/mapped-types';
import { CreateProviderDto } from './create-provider.dto';

//Extend to CreateProviderDto the data type input but your properties are optional
export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
