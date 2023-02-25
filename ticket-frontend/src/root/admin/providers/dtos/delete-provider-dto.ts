
export class DeleteProviderResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): DeleteProviderResponseDto | null {
        if (!obj) {
            return null;
        }
        const deleteProviderResponseDto: DeleteProviderResponseDto = new DeleteProviderResponseDto();
        deleteProviderResponseDto.errors = obj.errors;
        return deleteProviderResponseDto;
    }
}