import { ProviderDto } from '../../../../modules/provider/provider-dto';

export class CreateProviderRequestDto {
    provider: ProviderDto | null = null;

    static fromObj(obj: any): CreateProviderRequestDto | null {
        if (!obj) {
            return null;
        }
        const createProviderRequestDto: CreateProviderRequestDto = new CreateProviderRequestDto();
        createProviderRequestDto.provider = ProviderDto.fromObj(obj.provider);
        return createProviderRequestDto;
    }
}

export class CreateProviderResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): CreateProviderResponseDto | null {
        if (!obj) {
            return null;
        }
        const createProviderResponseDto: CreateProviderResponseDto = new CreateProviderResponseDto();
        createProviderResponseDto.errors = obj.errors;
        return createProviderResponseDto;
    }
}