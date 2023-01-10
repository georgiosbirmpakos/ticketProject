import { ProviderDto } from '../../../../modules/provider/provider-dto';
import { ProviderListItemDto } from '../../../../modules/provider/provider-list-item-dto';

export class FetchProviderDetailsResponseDto {
    provider: ProviderDto | null = null;

    static fromObj(obj: any): FetchProviderDetailsResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchProviderDetailsResponseDto: FetchProviderDetailsResponseDto = new FetchProviderDetailsResponseDto();
        fetchProviderDetailsResponseDto.provider = obj.provider;
        return fetchProviderDetailsResponseDto;
    }
}