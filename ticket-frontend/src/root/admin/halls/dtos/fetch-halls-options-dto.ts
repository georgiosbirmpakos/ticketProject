import { HallOptionsDto } from '../../../../modules/hall/hall-options-dto';

export class FetchHallsOptionsResponseDto {
    options: HallOptionsDto | null = null;

    static fromObj(obj: any): FetchHallsOptionsResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchHallsListResponseDto: FetchHallsOptionsResponseDto = new FetchHallsOptionsResponseDto();
        fetchHallsListResponseDto.options = HallOptionsDto.fromObj(obj.options);
        return fetchHallsListResponseDto;
    }
}