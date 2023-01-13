import { ProviderDto } from '../../../../modules/provider/provider-dto';

export class UpdateProviderRequestDto {
    provider: ProviderDto | null = null;

    static fromObj(obj: any): UpdateProviderRequestDto | null {
        if (!obj) {
            return null;
        }
        const updateProviderRequestDto: UpdateProviderRequestDto = new UpdateProviderRequestDto();
        updateProviderRequestDto.provider = ProviderDto.fromObj(obj.provider);
        return updateProviderRequestDto;
    }
}

export class UpdateProviderResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): UpdateProviderResponseDto | null {
        if (!obj) {
            return null;
        }
        const updateProviderResponseDto: UpdateProviderResponseDto = new UpdateProviderResponseDto();
        updateProviderResponseDto.errors = obj.errors;
        return updateProviderResponseDto;
    }
}