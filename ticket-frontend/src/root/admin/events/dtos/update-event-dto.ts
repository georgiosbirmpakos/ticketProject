import { EventDto } from '../../../../modules/event/dtos/event-dto';

export class UpdateEventRequestDto {
    event: EventDto | null = null;

    static fromObj(obj: any): UpdateEventRequestDto | null {
        if (!obj) {
            return null;
        }
        const updateEventRequestDto: UpdateEventRequestDto = new UpdateEventRequestDto();
        updateEventRequestDto.event = EventDto.fromObj(obj.event);
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