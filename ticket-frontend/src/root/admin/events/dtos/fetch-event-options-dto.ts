import { EventOptionsDto } from '../../../../modules/event/dtos/event-options-dto';

export class FetchEventOptionsResponseDto {
    options: EventOptionsDto | null = null;

    static fromObj(obj: any): FetchEventOptionsResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchEventOptionsResponseDto: FetchEventOptionsResponseDto = new FetchEventOptionsResponseDto();
        fetchEventOptionsResponseDto.options = EventOptionsDto.fromObj(obj.options);
        return fetchEventOptionsResponseDto;
    }
}