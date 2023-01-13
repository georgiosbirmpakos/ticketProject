import { HallListItemDto } from '../../../../modules/hall/hall-list-item-dto';

export class FetchHallsListResponseDto {
    halls: HallListItemDto[] = [];

    static fromObj(obj: any): FetchHallsListResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchHallsListResponseDto: FetchHallsListResponseDto = new FetchHallsListResponseDto();
        fetchHallsListResponseDto.halls = HallListItemDto.listFromObjList(obj.halls);
        return fetchHallsListResponseDto;
    }
}