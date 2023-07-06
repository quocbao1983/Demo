import { PartialType } from '@nestjs/mapped-types';
import { CreateTransDto } from './create-trans.dto';


export class UpdateTransDto extends PartialType(CreateTransDto) {}
