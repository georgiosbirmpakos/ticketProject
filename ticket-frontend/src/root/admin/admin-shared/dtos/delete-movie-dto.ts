export class DeleteMovieResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): DeleteMovieResponseDto | null  {
        if (!obj) {
            return null;
        }
        const deleteMovieResponseDto: DeleteMovieResponseDto = new DeleteMovieResponseDto();
        deleteMovieResponseDto.errors = obj.errors;
        return deleteMovieResponseDto;
    }
}
