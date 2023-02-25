import { ProviderDto } from '../../../../modules/provider/provider-dto';

export class FetchProviderDetailsResponseDto {
    provider: ProviderDto | null = null;

    static fromObj(obj: any): FetchProviderDetailsResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchProviderDetailsResponseDto: FetchProviderDetailsResponseDto = new FetchProviderDetailsResponseDto();
        fetchProviderDetailsResponseDto.provider = ProviderDto.fromObj(obj.provider);
        return fetchProviderDetailsResponseDto;
    }
}