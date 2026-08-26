import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
    @IsInt()
    hotelId: number;

    @IsInt()
    clientId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;
}
