import { HallDto } from '../../../../modules/hall/hall-dto';

export class CreateHallRequestDto {
    hall: HallDto | null = null;

    static fromObj(obj: any): CreateHallRequestDto | null {
        if (!obj) {
            return null;
        }
        const createHallRequestDto: CreateHallRequestDto = new CreateHallRequestDto();
        createHallRequestDto.hall = HallDto.fromObj(obj.hall);
        return createHallRequestDto;
    }
}

export class CreateHallResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): CreateHallResponseDto | null {
        if (!obj) {
            return null;
        }
        const createHallResponseDto: CreateHallResponseDto = new CreateHallResponseDto();
        createHallResponseDto.errors = obj.errors;
        return createHallResponseDto;
    }
}