import { ProviderDto } from '../../../modules/provider/provider-dto';

export class FetchProvidersListResponseDto {
    providers: ProviderDto[] = [];

    static fromObj(obj: any): FetchProvidersListResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchProvidersListResponseDto: FetchProvidersListResponseDto = new FetchProvidersListResponseDto();
        fetchProvidersListResponseDto.providers = ProviderDto.listFromObjList(obj.providers);
        return fetchProvidersListResponseDto;
    }
}
