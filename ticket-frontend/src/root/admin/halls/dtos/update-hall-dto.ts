import { HallDto } from '../../../../modules/hall/hall-dto';

export class UpdateHallRequestDto {
    hall: HallDto | null = null;

    static fromObj(obj: any): UpdateHallRequestDto | null {
        if (!obj) {
            return null;
        }
        const updateHallRequestDto: UpdateHallRequestDto = new UpdateHallRequestDto();
        updateHallRequestDto.hall = HallDto.fromObj(obj.hall);
        return updateHallRequestDto;
    }
}

export class UpdateHallResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): UpdateHallResponseDto | null {
        if (!obj) {
            return null;
        }
        const updateHallResponseDto: UpdateHallResponseDto = new UpdateHallResponseDto();
        updateHallResponseDto.errors = obj.errors;
        return updateHallResponseDto;
    }
}