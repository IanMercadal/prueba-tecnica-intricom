import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\+?[0-9]+$/, { message: 'phone solo puede contener números y un "+" inicial' })
    phone: string;
}
