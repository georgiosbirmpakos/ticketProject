import { HallDto } from '../../../../modules/hall/hall-dto';

export class UpdateEventRequestDto {
    event: HallDto | null = null;

    static fromObj(obj: any): UpdateEventRequestDto | null {
        if (!obj) {
            return null;
        }
        const updateEventRequestDto: UpdateEventRequestDto = new UpdateEventRequestDto();
        updateEventRequestDto.event = HallDto.fromObj(obj.event);
        return updateEventRequestDto;
    }
}

export class UpdateEventResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): UpdateEventResponseDto | null {
        if (!obj) {
            return null;
        }
        const updateEventResponseDto: UpdateEventResponseDto = new UpdateEventResponseDto();
        updateEventResponseDto.errors = obj.errors;
        return updateEventResponseDto;
    }
}