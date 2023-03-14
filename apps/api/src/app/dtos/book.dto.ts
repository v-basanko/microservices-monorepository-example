import { IsNumber, IsString } from "class-validator";

export class BookDto {

  @IsString()
  name: string;

  @IsNumber()
  price: number;
}
