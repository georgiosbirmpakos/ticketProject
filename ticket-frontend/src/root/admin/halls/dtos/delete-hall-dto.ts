export class DeleteHallResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): DeleteHallResponseDto | null {
        if (!obj) {
            return null;
        }
        const deleteHallResponseDto: DeleteHallResponseDto = new DeleteHallResponseDto();
        deleteHallResponseDto.errors = obj.errors;
        return deleteHallResponseDto;
    }
}