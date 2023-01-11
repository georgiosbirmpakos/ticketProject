import { TypeUtils } from '../../../../modules/core/type-utils';

export class UpdateMovieRequestDto {
    name: string = '';
    description: string | null = null;
    image: string = '';

    static fromObj(obj: any): UpdateMovieRequestDto | null  {
        if (!obj) {
            return null;
        }
        const updateMovieRequestDto: UpdateMovieRequestDto = new UpdateMovieRequestDto();
        updateMovieRequestDto.name = obj.name;
        updateMovieRequestDto.description = obj.description;
        updateMovieRequestDto.image = obj.image;
        return updateMovieRequestDto;
    }

    static listFromObjList(objs: any[]): UpdateMovieRequestDto[] | null  {
        if (!objs) {
            return null;
        }
        return objs.map(UpdateMovieRequestDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}

export class UpdateMovieResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): UpdateMovieResponseDto | null  {
        if (!obj) {
            return null;
        }
        const updateMovieResponseDto: UpdateMovieResponseDto = new UpdateMovieResponseDto();
        updateMovieResponseDto.errors = obj.errors;
        return updateMovieResponseDto;
    }
}
