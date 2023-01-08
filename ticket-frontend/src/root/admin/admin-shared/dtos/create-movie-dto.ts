import { TypeUtils } from '../../../../modules/core/type-utils';

export class CreateMovieRequestDto {
    movieId: number = 0;
    name: string = '';
    description: string | null = null;
    image: File | null = null;

    static fromObj(obj: any): CreateMovieRequestDto | null  {
        if (!obj) {
            return null;
        }
        const createMovieRequestDto: CreateMovieRequestDto = new CreateMovieRequestDto();
        createMovieRequestDto.movieId = obj.movieId;
        createMovieRequestDto.name = obj.name;
        createMovieRequestDto.description = obj.description;
        createMovieRequestDto.image = obj.image;
        return createMovieRequestDto;
    }

    static listFromObjList(objs: any[]): CreateMovieRequestDto[] | null  {
        if (!objs) {
            return null;
        }
        return objs.map(CreateMovieRequestDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}

export class CreateMovieResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): CreateMovieResponseDto | null  {
        if (!obj) {
            return null;
        }
        const createMovieResponseDto: CreateMovieResponseDto = new CreateMovieResponseDto();
        createMovieResponseDto.errors = obj.errors;
        return createMovieResponseDto;
    }
}
