import { ProviderListItemDto } from '../../../../modules/provider/provider-list-item-dto';

export class FetchProvidersListResponseDto {
    providers: ProviderListItemDto[] = [];

    static fromObj(obj: any): FetchProvidersListResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchProvidersListResponseDto: FetchProvidersListResponseDto = new FetchProvidersListResponseDto();
        fetchProvidersListResponseDto.providers = ProviderListItemDto.listFromObjList(obj.providers);
        return fetchProvidersListResponseDto;
    }
}