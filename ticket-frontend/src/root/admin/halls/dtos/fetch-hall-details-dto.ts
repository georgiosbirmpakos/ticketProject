import { HallDto } from '../../../../modules/hall/hall-dto';

export class FetchHallDetailsResponseDto {
    hall: HallDto | null = null;

    static fromObj(obj: any): FetchHallDetailsResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchHallDetailsResponseDto: FetchHallDetailsResponseDto = new FetchHallDetailsResponseDto();
        fetchHallDetailsResponseDto.hall = HallDto.fromObj(obj.hall);
        return fetchHallDetailsResponseDto;
    }
}