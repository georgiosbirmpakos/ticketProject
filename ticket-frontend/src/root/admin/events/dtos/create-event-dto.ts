import { EventDto } from '../../../../modules/event/dtos/event-dto';

export class CreateEventRequestDto {
    event: EventDto | null = null;

    static fromObj(obj: any): CreateEventRequestDto | null {
        if (!obj) {
            return null;
        }
        const createEventRequestDto: CreateEventRequestDto = new CreateEventRequestDto();
        createEventRequestDto.event = EventDto.fromObj(obj.event);
        return createEventRequestDto;
    }
}

export class CreateEventResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): CreateEventResponseDto | null {
        if (!obj) {
            return null;
        }
        const createEventResponseDto: CreateEventResponseDto = new CreateEventResponseDto();
        createEventResponseDto.errors = obj.errors;
        return createEventResponseDto;
    }
}