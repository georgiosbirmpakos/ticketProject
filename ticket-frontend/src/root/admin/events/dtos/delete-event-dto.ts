export class DeleteEventResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): DeleteEventResponseDto | null {
        if (!obj) {
            return null;
        }
        const deleteEventResponseDto: DeleteEventResponseDto = new DeleteEventResponseDto();
        deleteEventResponseDto.errors = obj.errors;
        return deleteEventResponseDto;
    }
}